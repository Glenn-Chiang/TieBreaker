import { Card, CardContent, CardMedia, Icon, Stack, Typography } from "@mui/material";
import { Game } from "../data/games";
import { Face } from "@mui/icons-material";

// Banner displayed at the top of each game's page, displaying the title and description of the game
export default function GameBanner({ gameData }: { gameData: Game }) {
  const playerCountText =
    gameData.maxPlayers === 2
      ? "2 players"
      : gameData.maxPlayers === null
      ? `2 or more players`
      : `2 - ${gameData.maxPlayers} players`;

  return (
    <Card sx={{ textAlign: "center" }}>
      <CardContent>
        <Stack gap={2}>
          <Typography variant="h4">{gameData.name}</Typography>
          <Stack justifyContent={"center"} direction={"row"} spacing={1}>
            <Icon>
              <Face />
            </Icon>
            <Typography>{playerCountText}</Typography>
          </Stack>
          <Typography variant="body1" color="textSecondary">
            {gameData.description}
          </Typography>
        </Stack>
      </CardContent>
      <CardMedia
        component={"img"}
        image={gameData.icon}
        height={200}
        sx={{ objectFit: "contain" }}
      />
    </Card>
  );
}
