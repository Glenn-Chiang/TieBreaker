import { Button } from "@mui/material";

interface StartButtonProps {
  handleClick: () => void;
}

export function StartButton({ handleClick }: StartButtonProps) {
  return (
    <Button onClick={handleClick} variant="contained">
      Start
    </Button>
  );
}
