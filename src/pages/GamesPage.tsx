import { Gamepad } from "@mui/icons-material";
import { Card, CardHeader, Icon, Stack, Typography } from "@mui/material";
import { Game } from "../data/models";

const games: Game[] = [
  { id: 1, name: "Game 1", description: "description 1" },
  { id: 2, name: "Game 2", description: "description 2" },
];

export default function GamesPage() {
  return (
    <>
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        <Icon>
          <Gamepad />
        </Icon>
        <Typography variant="h6">Select Game</Typography>
      </Stack>
      <Stack gap={2}>
        {games.map((game) => (
          <GameItem key={game.name} game={game} />
        ))}
      </Stack>
    </>
  );
}

function GameItem({ game }: { game: Game }) {
  return (
    <Card>
      <CardHeader title={game.name} subheader={game.description} />
    </Card>
  );
}
