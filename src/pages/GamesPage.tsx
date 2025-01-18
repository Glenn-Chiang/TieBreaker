import { Gamepad, Shuffle } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid2 as Grid,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import { Game, GAMES } from "../data/games";
import { GameCard } from "../components/GameCard";
import { useState } from "react";
import { SelectGameDialog } from "../components/SelectGameDialog";
import { useNavigate } from "react-router";

export default function GamesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null); // id of selected game

  // What happens when the user clicks the Select Random button
  const handleClickRandom = () => {
    // Randomly pick a game from the list
    const game = GAMES[Math.floor(Math.random() * GAMES.length)];
    setSelectedGame(game);
    setDialogOpen(true);
  };

  const navigate = useNavigate()

  // What happens when the user confirms the selected game
  const handleConfirmSelected = () => {
    navigate(`/games/${selectedGame?.id}`)
  }

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedGame(null);
  };

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

      <Box padding={1}>
        <RandomGameButton handleClick={handleClickRandom} />
      </Box>

      {dialogOpen && (
        <SelectGameDialog
          open={dialogOpen}
          handleClose={handleClose}
          game={selectedGame!}
          handleConfirm={handleConfirmSelected}
        />
      )}

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

interface RandomGameButtonProps {
  handleClick: () => void;
}

function RandomGameButton({ handleClick }: RandomGameButtonProps) {
  return (
    <Button variant="contained" fullWidth onClick={handleClick} startIcon={<Shuffle/>}>
      Select Random
    </Button>
  );
}
