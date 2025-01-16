import { Box } from "@mui/material";
import GameBanner from "../components/GameBanner";
import { GAMES } from "../data/games";

export default function ReactionTest() {
  const gameData = GAMES.find((data) => data.id === "reaction-test")!;

  return (
    <Box>
      <GameBanner game={gameData} />
      
    </Box>
  );
}
