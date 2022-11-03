const express = require('express');
const Quizzes = require('../models/Quiz');
const checkAuth = require('../middleware/check-auth');
const Users = require('../models/Users');
const Score = require('../models/Scores');

const router = express.Router();

router.post('/create', checkAuth, (req, res) => {
    let quiz = new Quizzes({
        ...req.body.quiz,
        createdBy: req.body.createdBy,
        questions: req.body.quiz.questions.map(ques => {
            return {
                ...ques,
                answers: ques.answers.map(ans => {
                    return {
                        name: ans,
                        selected: false
                    }
                })
            }
        })
    });
    quiz.save().then(result => {
        res.status(200).json({success: true});
    })
});

router.get("/my-quizzes/:id", checkAuth, (req, res) => {

    Quizzes.find({ createdBy: req.params.id })
        .then(result => {
            res.status(200).json(result);
        })
});

router.get('/all-quizzes', checkAuth, (req, res) => {
    Quizzes.find()
        .then(result => {
            res.status(200).json(result);
        })
})

router.get('/get-quiz/:id', checkAuth, (req, res) => {
    Quizzes.findOne({ _id: req.params.id }).then(quiz => {
        res.status(200).json({quiz});
    }).catch(er => {
        res.status(500).send(er);
    })
})





module.exports = router;