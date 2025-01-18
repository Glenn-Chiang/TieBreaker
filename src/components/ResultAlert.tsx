import { Alert } from "@mui/material";

interface ResultAlertProps {
  winnerId: number | null;
}

export default function ResultAlert({ winnerId }: ResultAlertProps) {
  return (
    <Alert sx={{width: '100%', textAlign: 'center'}} icon={false} color={"success"} >
      Player {winnerId} wins!
    </Alert>
  );
}
