import { Gamepad } from "@mui/icons-material";
import {
  Box,
  Grid2 as Grid,
  Icon,
  Stack,
  Typography
} from "@mui/material";
import { GAMES } from "../data/games";
import { GameCard } from "../components/GameCard";

export default function GamesPage() {
  return (
    <>
      <Box
        padding={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        color={"white"}
        sx={{ backgroundColor: "#2196f3" }}
      >
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Icon>
            <Gamepad />
          </Icon>
          <Typography variant="h4">Select Game</Typography>
        </Stack>
      </Box>
      <Grid padding={1} container spacing={1}>
        {GAMES.map((game) => (
          <Grid size={{ xs: 12, sm: 6 }} key={game.name}>
            <GameCard gameData={game} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
