import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { StartButton } from "../components/StartButton";
import { TimerBar } from "../components/TimerBar";
import ResultAlert from "../components/ResultAlert";
import { useConfetti } from "../components/ConfettiProvider";

const words = ["hello", "world", "good", "bye"];

const getWord = (): string => {
  return words[Math.floor(Math.random() * words.length)];
};

type GameState = "pre-game" | "test-active" | "inter-test" | "post-game";

export default function TypingTest() {
  const [gameState, setGameState] = useState<GameState>("pre-game");
  const TEST_DURATION = 10;

  const [timer, setTimer] = useState(TEST_DURATION); // Remaining time
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");

  const [currentPlayerId, setCurrentPlayerId] = useState<number>(-1);
  const [scores, setScores] = useState<number[]>([]);

  // Current player's score
  const currentScore = scores[currentPlayerId];

  const intervalRef = useRef<number | null>(null);

  const startGame = () => {
    // Reset
    setInput("");
    setCurrentPlayerId(-1);
    setScores([]);
    setTimer(TEST_DURATION);
    confetti.deactivate()

    startTest();
  };

  const startTest = () => {
    setGameState("test-active");

    // Reset timer
    setTimer(TEST_DURATION);

    // Move to next player
    setCurrentPlayerId((prev) => prev + 1);

    // Reset input
    setInput("");

    setCurrentWord(getWord());

    setTimeout(() => {
      endTest();
    }, TEST_DURATION * 1000);

    // Update timer
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev - 0.1);
    }, 100);
  };

  // End the test for the current player
  const endTest = () => {
    setGameState("inter-test");

    // Stop timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // End the game for all players
  const endGame = () => {
    setGameState("post-game");
    confetti.activate()
  };

  // Handle typing
  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInput(event.target.value);
  };

  // Listen for enter key
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key !== "Enter") return;

    // Check if input is correct word
    if (input === currentWord) {
      // Get next word
      setCurrentWord(getWord());
      // Increment the current player's score by 1
      updateScores(currentPlayerId);
      // Clear input
      setInput("");
    } else {
      console.log("wrong");
    }
  };

  // Add new player's score to scores array
  const updateScores = (playerId: number) => {
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[playerId] = (newScores[playerId] || 0) + 1;
      return newScores;
    });
  };

  // Determine id of winner
  const determineWinner = (): number => {
    return scores.indexOf(Math.max(...scores)) + 1;
  }

  const winnerId = determineWinner();

  const confetti = useConfetti()

  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
      {(gameState === "pre-game" || gameState === "post-game") && (
        <StartButton handleClick={startGame} />
      )}

      {gameState === "test-active" && (
        <Stack spacing={1}>
          <Typography variant="h6">
            P{currentPlayerId + 1} Score: {currentScore}
          </Typography>
          <TimerBar timer={timer} maxTimer={TEST_DURATION} />

          <Card>
            <CardHeader title={currentWord} sx={{ textAlign: "center" }} />
          </Card>
          <TextField
            fullWidth
            variant="outlined"
            autoFocus
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
        </Stack>
      )}

      {gameState === "inter-test" && (
        <Stack spacing={1}>
          <Alert icon={false}>
            <Typography variant="h6">
              P{currentPlayerId + 1} Score: {currentScore}
            </Typography>
          </Alert>
          <Button variant="contained" onClick={startTest}>
            Next: Player {currentPlayerId + 2}
          </Button>
          <Button variant="contained" onClick={endGame}>
            End Game
          </Button>
        </Stack>
      )}

      {gameState === "post-game" && (
        <Stack spacing={1}>
          {<ResultAlert winnerId={winnerId} />}
          <Card>
            <CardContent>
              <Typography variant="h6">Scores</Typography>
              <Stack spacing={1}>
                {scores.map((score, index) => (
                  <Typography>
                    P{index + 1} Score: {score}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}
    </Box>
  );
}
