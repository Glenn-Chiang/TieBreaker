import { Gamepad } from "@mui/icons-material";
import {
  Card,
  CardHeader,
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
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        <Icon>
          <Gamepad />
        </Icon>
        <Typography variant="h5">Select Game</Typography>
      </Stack>
      <Grid container spacing={1}>
        {GAMES.map((game) => (
          <Grid size={{ xs: 12, sm: 6 }} height={200} key={game.name}>
            <GameItem game={game} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function GameItem({ game }: { game: Game }) {
  return (
    <Link to={`/games/${game.id}`} component={RouterLink} underline="none">
      <Card sx={{ height: "100%" }}>
        <CardHeader title={game.name} subheader={game.description} />
      </Card>
    </Link>
  );
}
