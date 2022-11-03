const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  mustBeSignedIn: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: Object,
      contains: {
        answers: { type: Array },
        correctAnswer: String,
        questionName: String,
      },
    },
  ],
});

module.exports = User = mongoose.model("Quizzes", QuizSchema);
