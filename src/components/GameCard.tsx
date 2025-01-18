import { Card, CardHeader, CardMedia, Icon, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { Game } from "../data/games";
import { Face } from "@mui/icons-material";

export function GameCard({ gameData }: { gameData: Game }) {
  const playerCountText =
    gameData.maxPlayers === 2
      ? "2 players"
      : gameData.maxPlayers === null
      ? `2 or more players`
      : `2 - ${gameData.maxPlayers} players`;

  return (
    <Link to={`/games/${gameData.id}`} component={RouterLink} underline="none">
      <Card sx={{ height: "100%" }}>
        <CardHeader
          title={gameData.name}
          subheader={
            <Stack direction={"row"} spacing={1}>
              <Icon>
                <Face/>
              </Icon>
              <Typography>{playerCountText}</Typography>
            </Stack>
          }
        />
        <CardMedia
          component={"img"}
          image={gameData.icon}
          height={200}
          sx={{ objectFit: "contain" }}
        />
      </Card>
    </Link>
  );
}
