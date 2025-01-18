import { Alert, Typography } from "@mui/material";

interface ResultAlertProps {
  winnerId: number | null;
}

export default function ResultAlert({ winnerId }: ResultAlertProps) {
  return (
    <Alert
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
      icon={false}
      color={"success"}
    >
      <Typography variant="h6">{winnerId ? `Player ${winnerId} wins!` : "Tie!"}</Typography>
    </Alert>
  );
}
