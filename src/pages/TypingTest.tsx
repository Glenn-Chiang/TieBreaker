import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useConfetti } from "../components/ConfettiProvider";
import ResultAlert from "../components/ResultAlert";
import { StartButton } from "../components/StartButton";
import { TimerBar } from "../components/TimerBar";

type GameState = "pre-game" | "test-active" | "inter-test" | "post-game";

export default function TypingTest() {
  const [gameState, setGameState] = useState<GameState>("pre-game");

  // Allow user to set the duration of the test
  const DURATION_OPTIONS = [10, 30, 60];
  const [duration, setDuration] = useState(10);

  // List of words used in test
  const [words, setWords] = useState<string[]>([]);

  const [timer, setTimer] = useState(duration); // Remaining time
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");
  const [currentPlayerId, setCurrentPlayerId] = useState<number>(-1);
  const [scores, setScores] = useState<number[]>([]);

  // Load the txt file containing word list
  useEffect(() => {
    const loadFile = async () => {
      try {
        const res = await fetch("/src/assets/word_list.txt");
        const text = await res.text();
        const wordList = text.split("\n").map((word) => word.trim());
        setWords(wordList);
      } catch (err) {
        console.log("Error loading word list:", err);
      }
    };
    loadFile();
  }, []);

  // Randomly select a word from the list
  const getWord = (): string => {
    return words[Math.floor(Math.random() * words.length)];
  };

  // Current player's score
  const currentScore = scores[currentPlayerId] || 0;

  const intervalRef = useRef<number | null>(null);

  const startGame = () => {
    // Reset
    setInput("");
    setCurrentPlayerId(-1);
    setScores([]);
    setTimer(duration);
    confetti.deactivate();

    startTest();
  };

  const startTest = () => {
    setGameState("test-active");

    // Reset timer
    setTimer(duration);

    // Move to next player
    setCurrentPlayerId((prev) => prev + 1);

    // Reset input
    setInput("");

    setCurrentWord(getWord());

    setTimeout(() => {
      endTest();
    }, duration * 1000);

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
    confetti.activate();
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
  };

  const winnerId = determineWinner();

  const confetti = useConfetti();

  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
      {(gameState === "pre-game" || gameState === "post-game") && (
        <Stack spacing={1}>
          <Dropdown
            value={duration}
            setValue={setDuration}
            options={DURATION_OPTIONS}
          />
          <StartButton handleClick={startGame} />
        </Stack>
      )}

      {gameState === "test-active" && (
        <Stack spacing={1}>
          <Typography variant="h6">
            P{currentPlayerId + 1} Score: {currentScore}
          </Typography>
          <TimerBar timer={timer} maxTimer={duration} />

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
          <ScoresList scores={scores} />
        </Stack>
      )}

      {gameState === "post-game" && (
        <Stack spacing={1}>
          {<ResultAlert winnerId={winnerId} />}
          <ScoresList scores={scores} />
        </Stack>
      )}
    </Box>
  );
}

interface ScoresListProps {
  scores: number[];
}

function ScoresList({ scores }: ScoresListProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Scores</Typography>
        <Stack spacing={1}>
          {scores.map((score, index) => (
            <Typography>
              P{index + 1} Score: {score || 0}
            </Typography>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

interface DropdownProps {
  value: number;
  setValue: (value: number) => void;
  options: number[];
}

function Dropdown({ value, setValue, options }: DropdownProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(Number(event.target.value));
  };

  return (
    <FormControl>
      <Select value={value.toString()} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}s
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
