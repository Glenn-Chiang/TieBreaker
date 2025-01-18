import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { BackButton } from "../components/BackButton";
import { ConfettiProvider } from "../components/ConfettiProvider";

export default function GamePageLayout() {
  return (
    <ConfettiProvider>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"start"}
      >
        <BackButton />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </ConfettiProvider>
  );
}
