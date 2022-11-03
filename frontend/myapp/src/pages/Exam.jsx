import React from "react";
import questions from "../ExamData";
import "../styles/Quiz.css"
import { useState } from "react";
import ExamResult from "../components/ExamResult";

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [clicked, setClicked] = useState(0);
  const handleAnswerOption = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 10);
      setCorrectAns(correctAns + 1);
    }
    setClicked(true);
  };
  const handleNext = () => {
    setClicked(false)
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };
  const handleReset = () => {
    setScore(0);
    setCorrectAns(0);
    setShowResult(false);
  };
  return (
    <div className="main">
      {showResult ? (
        <ExamResult
          score={score}
          correctAns={correctAns}
          handleReset={handleReset}
        />
      ) : (
        <>
          <div className="question-section">
            <h5>Score:{score}</h5>
            <div className="question-count">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((ans, i) => {
              return (
                <button
                  className={`button ${clicked && ans.isCorrect?"correct":"button"}`}
                  disabled={clicked}
                  key={i}
                  onClick={() => handleAnswerOption(ans.isCorrect)}
                >
                  {ans.answerText}
                </button>
              );
            })}

            <div className="actions">
              <button onClick={handleReset}>Quit</button>
              <button disabled={!clicked} onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Exam;