import { Box } from "@mui/material";
import GameBanner from "../components/GameBanner";
import { GAMES } from "../data/games";
import headVideo from "../assets/heads_flip.mp4";
import tailVideo from "../assets/tails_flip.mp4";

export default function CoinToss() {
  const gameData = GAMES.find((data) => data.id === "coin-toss")!;

  return (
    <>
      <GameBanner gameData={gameData} />
      <Box></Box>
    </>
  );
}
