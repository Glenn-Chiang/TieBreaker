import { Alert, Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import GameBanner from "../components/GameBanner";
import { GAMES } from "../data/games";

type GameState = "pre-game" | "in-game" | "post-game";

export default function ReactionTest() {
  const gameData = GAMES.find((data) => data.id === "reaction-test")!;

  const [gameState, setGameState] = useState<GameState>("pre-game");
  const [winnerId, setWinnerId] = useState<null | number>(null);

  // When buttonActive is true, the buttons turn green and players can start clicking
  const [buttonActive, setButtonActive] = useState(false);


  const startGame = () => {
    setGameState("in-game");

    // Randomly determine the time at which the buttons will activate
    const activationTime = getRandomTimer()

    setTimeout(() => {
      setButtonActive(true)
    }, activationTime * 1000)
  };

  const handleClick = (playerId: number) => {
    setGameState("post-game");
    setButtonActive(false)

    if (buttonActive) {
      setWinnerId(playerId);
    } else {
      // If player clicks before buttons are active, they lose and the other player wins
      setWinnerId(playerId === 1 ? 2 : 1);
    }
  };

  return (
    <>
      <GameBanner gameData={gameData} />
      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        {gameState === "pre-game" ? (
          <StartButton handleClick={startGame} />
        ) : gameState === "in-game" ? (
          <Stack spacing={1} width={"100%"}>
            <ReactionButton
              playerId={1}
              isActive={buttonActive}
              handleClick={handleClick}
            />
            <ReactionButton
              playerId={2}
              isActive={buttonActive}
              handleClick={handleClick}
            />
          </Stack>
        ) : (
          <Stack spacing={1}>
            <Alert color="success">Player {winnerId} wins!</Alert>
            <StartButton handleClick={startGame} />
          </Stack>
        )}
      </Box>
    </>
  );
}

// Randomly determine the time at which the buttons will activate. Between 1 and 5 seconds.
function getRandomTimer() {
  return Math.floor(Math.random() * 5) + 1;
}

interface StartButtonProps {
  handleClick: () => void;
}

function StartButton({ handleClick }: StartButtonProps) {
  return (
    <Button onClick={handleClick} variant="contained">
      Start
    </Button>
  );
}

interface ReactionButtonProps {
  playerId: number;
  isActive: boolean;
  handleClick: (playerId: number) => void;
}

function ReactionButton({
  playerId,
  isActive,
  handleClick,
}: ReactionButtonProps) {
  return (
    <Button
      onClick={() => handleClick(playerId)}
      variant="contained"
      color={isActive ? "success" : "primary"}
      sx={{ height: 200 }}
    >
      Player {playerId}
    </Button>
  );
}
