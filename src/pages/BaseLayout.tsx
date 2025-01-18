import { Box } from "@mui/material";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

export default function BaseLayout() {
  return (
    <>
      <NavBar />
      <Box padding={1} paddingBottom={4}>
        <Outlet />
      </Box>
    </>
  );
}
