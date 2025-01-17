import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { Game } from "../data/games";

// Banner displayed at the top of each game's page, displaying the title and description of the game
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
      <CardMedia component={"img"} image={gameData.image} height={200} sx={{objectFit: "contain"}}/>
    </Card>
  );
}
