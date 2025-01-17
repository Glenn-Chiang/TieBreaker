import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Game } from "../data/games";

export default function GameBanner({ gameData}: { gameData: Game }) {
  return (
    <Card sx={{ textAlign: "center" }}>
      <CardContent>
        <Stack gap={2}>
          <Typography variant="h4">{gameData.name}</Typography>
          <Typography variant="body1" color="textSecondary">
            {gameData.description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
