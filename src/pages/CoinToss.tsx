import { Box } from "@mui/material";
import GameBanner from "../components/GameBanner";
import { GAMES } from "../data/games";

export default function CoinToss() {
  const gameData = GAMES.find(data => data.id === "coin-toss")!

  return (
    <>
      <GameBanner gameData={gameData}/>
      <Box>

      </Box>

    </>
  )
}
