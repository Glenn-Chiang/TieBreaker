import React, { useState } from "react";
import "./Statgame.css"; // Importing a separate CSS file for styling

function Statgame() {
  // Define the questions array (only questions without answers)
  const questions = [
    "Highest body count?",
    "Highest GPA?",
    "Highest bench/deadlift?",
    "Most number of SUs?",
    "Tallest?",
    // Add more questions here
  ];

  // State to hold the list of remaining questions and the current question
  const [remainingQuestions, setRemainingQuestions] = useState(questions);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null); // Initially no question
  const [feedback, setFeedback] = useState("");

  // Function to get a random question and remove it from the remaining questions list
  function getRandomQuestion() {
    if (remainingQuestions.length === 0) {
      setFeedback("All questions have been asked! Restarting the game...");
      // Reset the game by repopulating the remaining questions
      setRemainingQuestions(questions);
      return "";
    }
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const selectedQuestion = remainingQuestions[randomIndex];
    const newRemainingQuestions = remainingQuestions.filter(
      (question) => question !== selectedQuestion
    );
    setRemainingQuestions(newRemainingQuestions);
    return selectedQuestion;
  }

  // Function to handle "Generate Question" button click
  function generateQuestion() {
    const newQuestion = getRandomQuestion();
    setFeedback(""); // Clear feedback
    setCurrentQuestion(newQuestion);
  }

  return (
    <div className="statgame-container">
      <h1 className="game-title">StatBattle</h1>
      <p className="game-tagline">When in doubt, let the stats decide!</p>
      <h4 className="warning">Warning! Friendships may be broken!</h4>
      
      {currentQuestion && <h2 className="current-question">{currentQuestion}</h2>} {/* Display the question */}
      
      <div className="button-container">
        <button className="generate-button" onClick={generateQuestion}>
          Generate Question
        </button>
      </div>

      {feedback && <p className="feedback-message">{feedback}</p>}
    </div>
  );
}

export default Statgame;
