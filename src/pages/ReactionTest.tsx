import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import GameBanner from "../components/GameBanner";
import ResultAlert from "../components/ResultAlert";
import { StartButton } from "../components/StartButton";
import { GAMES } from "../data/games";
import { useConfetti } from "../components/ConfettiProvider";

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
    const activationTime = Math.floor(Math.random() * 5) + 1;

    setTimeout(() => {
      setButtonActive(true);
    }, activationTime * 1000);
  };

  const confetti = useConfetti()

  const handleClick = (playerId: number) => {
    setGameState("post-game");
    setButtonActive(false);

    if (buttonActive) {
      setWinnerId(playerId);
    } else {
      // If player clicks before buttons are active, they lose and the other player wins
      setWinnerId(playerId === 1 ? 2 : 1);
    }

    confetti.activate()
  };

  return (
    <>
      <GameBanner gameData={gameData} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          gap: 1
        }}
      >
        {gameState === "in-game" ? (
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
          <StartButton handleClick={startGame} />
        )}
        {gameState === "post-game" && <ResultAlert winnerId={winnerId} />}
      </Box>
    </>
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
