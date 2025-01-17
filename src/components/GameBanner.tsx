import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Game } from "../data/games";

export default function GameBanner({game}: {game: Game}) {
  return (
    <Card sx={{ textAlign: "center" }}>
      <CardContent>
        <Stack gap={2}>
        <Typography variant="h4">{game.name}</Typography>
        <Typography variant="body1" color="textSecondary">{game.description}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}