import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useConfetti } from "../components/ConfettiProvider";
import ResultAlert from "../components/ResultAlert";
import { StartButton } from "../components/StartButton";

type GameState = "pre-game" | "in-game" | "post-game";

export default function ReactionTest() {
  const [gameState, setGameState] = useState<GameState>("pre-game");
  const [winnerId, setWinnerId] = useState<null | number>(null);

  // When buttonActive is true, the buttons turn green and players can start clicking
  const [buttonActive, setButtonActive] = useState(false);

  const confetti = useConfetti();

  const startGame = () => {
    setGameState("in-game");
    confetti.deactivate();

    // Randomly determine the time at which the buttons will activate
    const activationTime = Math.floor(Math.random() * 5) + 1;

    setTimeout(() => {
      setButtonActive(true);
    }, activationTime * 1000);
  };

  const handleClick = (playerId: number) => {
    setGameState("post-game");
    setButtonActive(false);

    if (buttonActive) {
      setWinnerId(playerId);
    } else {
      // If player clicks before buttons are active, they lose and the other player wins
      setWinnerId(playerId === 1 ? 2 : 1);
    }

    confetti.activate();
  };

  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
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
