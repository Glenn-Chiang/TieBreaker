import { Box } from "@mui/material";
import GameBanner from "../components/GameBanner";
import { GAMES } from "../data/games";

export default function StatChallenge() {
   const gameData = GAMES.find((data) => data.id === "coin-toss")!;

   return (
     <>
       <GameBanner gameData={gameData} />
       <Box></Box>
     </>
   );
  }