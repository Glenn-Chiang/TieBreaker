import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router";
import { BackButton } from "../components/BackButton";
import { ConfettiProvider } from "../components/ConfettiProvider";
import { GAMES } from "../data/games";
import GameBanner from "../components/GameBanner";

export default function GamePageLayout() {
  const location = useLocation()
  const gameId = location.pathname.split("/")[2]
  const gameData = GAMES.find((data) => data.id === gameId)!;

  return (
    <ConfettiProvider>
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"start"}
        gap={1}
      >
        <BackButton />
        <GameBanner gameData={gameData}/>
        <Outlet />
      </Box>
    </ConfettiProvider>
  );
}
