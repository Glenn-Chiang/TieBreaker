import { Box, Button, LinearProgress, Stack } from "@mui/material";
import { useRef, useState } from "react";
import { useConfetti } from "../components/ConfettiProvider";
import ResultAlert from "../components/ResultAlert";
import { StartButton } from "../components/StartButton";

type GameState = "pre-game" | "in-game" | "post-game";

export default function ClickTest() {
  const [gameState, setGameState] = useState<GameState>("pre-game");

  // Players have to click as many times as they can within this time (in seconds)
  const TEST_DURATION = 10;

  // Remaining time
  const [timer, setTimer] = useState(TEST_DURATION);
  const [scores, setScores] = useState([0, 0]);

  // Increment the player's score by 1
  const addScore = (playerId: number) => {
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[playerId - 1] += 1;
      return newScores;
    });
  };

  const confetti = useConfetti();

  const intervalRef = useRef<number | null>(null);

  const startGame = () => {
    setGameState("in-game");
    setTimer(TEST_DURATION); // reset timer
    setScores([0, 0]); // reset scores
    confetti.deactivate(); // stop previous confetti if any

    // End game when timer runs out
    setTimeout(() => {
      endGame();
    }, TEST_DURATION * 1000);

    // Update timer
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev - 0.1);
    }, 100);
  };

  const endGame = () => {
    setGameState("post-game");

    // Stop timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Activate confetti effect if there is a winner
    if (winnerId) {
      confetti.activate();
    }
  };

  // Determine winner
  const winnerId = scores[0] > scores[1] ? 1 : scores[0] < scores[1] ? 2 : null;

  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
      {gameState === "in-game" ? (
        <Stack spacing={1} width={"100%"}>
          <TimerBar timer={timer} maxTimer={TEST_DURATION} />
          <ClickTestButton
            playerId={1}
            handleClick={() => addScore(1)}
            score={scores[0]}
          />
          <ClickTestButton
            playerId={2}
            handleClick={() => addScore(2)}
            score={scores[1]}
          />
        </Stack>
      ) : (
        <StartButton handleClick={startGame} />
      )}
      {gameState === "post-game" && <ResultAlert winnerId={winnerId} />}
    </Box>
  );
}

interface TimerBarProps {
  timer: number;
  maxTimer: number;
}

function TimerBar({ timer, maxTimer }: TimerBarProps) {
  const normalizedValue = Math.floor((timer / maxTimer) * 100);
  return <LinearProgress variant="determinate" value={normalizedValue} />;
}

interface ClickTestButtonProps {
  playerId: number;
  handleClick: (playerId: number) => void;
  score: number;
}

function ClickTestButton({
  playerId,
  score,
  handleClick,
}: ClickTestButtonProps) {
  return (
    <Button
      onClick={() => handleClick(playerId)}
      variant="contained"
      sx={{ height: 200 }}
    >
      Player {playerId}: {score}
    </Button>
  );
}
