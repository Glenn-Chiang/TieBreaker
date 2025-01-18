import { Shuffle } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid2 as Grid
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { GameCard } from "../components/GameCard";
import { SelectGameDialog } from "../components/SelectGameDialog";
import { Game, GAMES } from "../data/games";

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

  const navigate = useNavigate();

  // When user confirms the selected game, redirect to the game's page
  const handleConfirmSelected = () => {
    navigate(`/games/${selectedGame?.id}`);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedGame(null);
  };

  return (
    <>
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
    <Button
      variant="contained"
      fullWidth
      onClick={handleClick}
      startIcon={<Shuffle />}
    >
      Select Random
    </Button>
  );
}
