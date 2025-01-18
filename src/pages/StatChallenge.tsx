import { useState } from "react";
import { Button, Typography, Container, keyframes, useTheme } from "@mui/material";
import GameBanner from "../components/GameBanner";
import { GAMES } from "../data/games";

// Generate question button flicker animation
const flickerAnimation = keyframes`
  0% {
    box-shadow: 0 0 8px rgba(255, 87, 34, 0.6), 0 0 16px rgba(255, 152, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 12px rgba(255, 152, 0, 0.8), 0 0 24px rgba(255, 87, 34, 0.7);
  }
  100% {
    box-shadow: 0 0 16px rgba(255, 87, 34, 0.9), 0 0 32px rgba(255, 152, 0, 1);
  }
`;

function StatChallenge() {
  const gameData = GAMES.find((data) => data.id === "stat-challenge")!;
  const theme = useTheme(); // Access the MUI theme
  const questions = [
    "Highest body count?",
    "Fastest 2.4km timing?",
    "Highest GPA?",
    "Highest max bench/deadlift?",
    "Most number of SUs used?",
    "Tallest?",
    "Most cooked in life/studies?",
    "Stays nearest to campus?",
  ];

  const [remainingQuestions, setRemainingQuestions] = useState(questions);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false); // Track if all questions have been asked

  function getRandomQuestion() {
    if (remainingQuestions.length === 0) {
      setGameOver(true); // All questions have been asked
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

  function generateQuestion() {
    if (gameOver) {
      // Reset the game when it's over
      setRemainingQuestions(questions);
      setGameOver(false);
      setCurrentQuestion(null);
    } else {
      const newQuestion = getRandomQuestion();
      setCurrentQuestion(newQuestion);
    }
  }

  return (
    <>
      <GameBanner gameData={gameData} />
      <Container
        maxWidth="sm"
        sx={{
          padding: "40px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: theme.shadows[4], // Use theme shadow
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: "20px",
            marginBottom: "10px",
          }}
        >
          Who decides? Let your stats do the work!
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.error.main,
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: "20px",
          }}
        >
          ⚠️ Warning: May ruin friendships!
        </Typography>

        {currentQuestion && (
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {currentQuestion}
          </Typography>
        )}

        <Button
          variant="contained"
          size="large"
          onClick={generateQuestion}
          sx={{
            padding: "12px 40px",
            fontSize: "18px",
            textTransform: "none",
            borderRadius: "12px",
            background: theme.palette.error.main,
            color: "white",
            transition: "all 0.3s ease",
            overflow: "hidden",
            ":hover": {
              background: theme.palette.error.dark,
              animation: `${flickerAnimation} 0.15s infinite alternate`,
              transform: "scale(1.05)",
            },
            ":active": {
              transform: "scale(0.95)",
            },
          }}
        >
          {gameOver ? "Restart" : currentQuestion ? "Next Question" : "Generate Question"}
        </Button>
      </Container>
    </>
  );
}

export default StatChallenge;
