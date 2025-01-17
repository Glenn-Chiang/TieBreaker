import { Gamepad } from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  Grid2 as Grid,
  Icon,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Game, GAMES } from "../data/games";
import { Link as RouterLink } from "react-router";

export default function GamesPage() {
  return (
    <>
      <Box
        padding={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        color={"white"}
        sx={{ backgroundColor: "#2196f3"}}
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

function GameCard({ gameData }: { gameData: Game }) {
  return (
    <Link to={`/games/${gameData.id}`} component={RouterLink} underline="none">
      <Card sx={{ height: "100%" }}>
        <CardHeader title={gameData.name} subheader={gameData.description} />
        <CardMedia
          component={"img"}
          image={gameData.image}
          height={200}
          sx={{ objectFit: "contain" }}
        />
      </Card>
    </Link>
  );
}
