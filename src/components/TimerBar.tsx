import { LinearProgress } from "@mui/material";

interface TimerBarProps {
  timer: number;
  maxTimer: number;
}

export function TimerBar({ timer, maxTimer }: TimerBarProps) {
  const normalizedValue = Math.floor((timer / maxTimer) * 100);
  return <LinearProgress variant="determinate" value={normalizedValue} />;
}
