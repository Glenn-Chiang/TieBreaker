import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import GameBanner from "../components/GameBanner";
import ResultAlert from "../components/ResultAlert";
import { StartButton } from "../components/StartButton";
import { GAMES } from "../data/games";

type GameState = "pre-game" | "in-game" | "post-game";

export default function ClickTest() {
  const gameData = GAMES.find((data) => data.id === "click-test")!;

  const [gameState, setGameState] = useState<GameState>("pre-game");

  // Players have to click as many times as they can within this time (in seconds)
  const TEST_DURATION = 10;

  const [scores, setScores] = useState([0, 0]);

  // Increment the player's score by 1
  const addScore = (playerId: number) => {
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[playerId - 1] += 1;
      return newScores;
    });
  };

  const startGame = () => {
    setScores([0, 0]); // reset scores
    setGameState("in-game");

    setTimeout(() => {
      setGameState("post-game");
    }, TEST_DURATION * 1000);
  };

  // Determine winner
  const winnerId = scores[0] > scores[1] ? 1 : scores[0] < scores[1] ? 2 : null;

  console.log("Scores outer", scores);

  return (
    <>
      <GameBanner gameData={gameData} />
      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        {gameState === "in-game" ? (
          <Stack spacing={1} width={"100%"}>
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
          <Stack spacing={1}>
            {gameState === "post-game" && <ResultAlert winnerId={winnerId} />}
            <StartButton handleClick={startGame} />
          </Stack>
        )}
      </Box>
    </>
  );
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
