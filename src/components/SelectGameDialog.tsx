import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Game } from "../data/games";
import { GameCard } from "./GameCard";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  game: Game;
  handleConfirm: () => void;
}

export function SelectGameDialog({ game, open, handleClose, handleConfirm }: DialogProps) {
  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle textAlign={"center"}>Selected game:</DialogTitle>
      <DialogContent>
        <GameCard gameData={game} />
      </DialogContent>
      <DialogActions>
        <Button fullWidth variant="contained" onClick={handleConfirm}>
          Go
        </Button>
      </DialogActions>
    </Dialog>
  );
}
