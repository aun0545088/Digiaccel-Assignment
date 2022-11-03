import React from "react";
import "../styles/Quiz.css";
import questions from "../ExamData"

const ExamResult = ({score,correctAns,handleReset}) => {
  return (
    <div className="score-section">
      <h2>Completed</h2>
      <h4>Total score {score}/{questions.length*10}</h4>
      <h4>Your Correct Question {correctAns} out of {questions.length}</h4>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default ExamResult;