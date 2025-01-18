import { Add, Remove } from "@mui/icons-material";
import { Box, Button, Icon, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import GameBanner from "../components/GameBanner";
import ResultAlert from "../components/ResultAlert";
import { GAMES } from "../data/games";

type GameState = "pre-game" | "in-game" | "post-game";

export default function SpinTheWheel() {
  const gameData = GAMES.find((data) => data.id === "spin-the-wheel")!;
  const [gameState, setGameState] = useState<GameState>("pre-game");
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const [numPlayers, setNumPlayers] = useState<number>(2);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);

  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const radius = canvas.width / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const anglePerSegment = (2 * Math.PI) / numPlayers;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numPlayers; i++) {
      const startAngle = angle + i * anglePerSegment;
      const endAngle = startAngle + anglePerSegment;

      // Draw segment with unique color
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fillStyle = `hsl(${(360 / numPlayers) * i}, 70%, 70%)`; // Unique color for each segment
      ctx.fill();
      ctx.stroke();

      // Label wheel segments with player id
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2); // Rotate to the middle of the segment
      ctx.textAlign = "center";
      ctx.fillStyle = "#000"; // Text color
      ctx.font = "16px Arial";
      ctx.fillText(`P${i + 1}`, radius / 1.5, 0); // Position text towards the outer edge
      ctx.restore();
    }
  };

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setGameState("in-game");

    const targetAngle =
      currentAngle + Math.random() * Math.PI * 4 + Math.PI * 8; // Random spin
    const spinDuration = 3000; // in ms
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      if (elapsed < spinDuration) {
        const easeOutQuad = (t: number) => t * (2 - t);
        const progress = easeOutQuad(elapsed / spinDuration);
        const newAngle = progress * targetAngle;
        setCurrentAngle(newAngle);
        drawWheel(newAngle);
        requestAnimationFrame(animate);
      } else {
        const finalAngle = targetAngle % (2 * Math.PI);
        setCurrentAngle(finalAngle);
        setSpinning(false);
        drawWheel(finalAngle);

        determineWinner(finalAngle);
      }
    };

    animate();
  };

  useEffect(() => drawWheel(0), [numPlayers]);

  const determineWinner = (angle: number) => {
    setGameState("post-game");

    const anglePerSegment = (2 * Math.PI) / numPlayers;
    const correctedAngle = (angle + Math.PI / 2) % (2 * Math.PI);
    const landedIndex =
      numPlayers - Math.floor(correctedAngle / anglePerSegment); // Segment where the wheel landed

    setWinnerId(landedIndex);
  };

  return (
    <>
      <GameBanner gameData={gameData} />
      <Box
        padding={2}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
      >
        {gameState === "post-game" && <ResultAlert winnerId={winnerId} />}

        <Box position={"relative"} sx={{ objectFit: "contain" }}>
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            style={{ border: "2px solid #000", borderRadius: "50%" }}
          />
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent", // Left side transparent
              borderRight: "10px solid transparent", // Right side transparent
              borderTop: "20px solid black", // Bottom visible to form the triangle
              position: "absolute",
              top: 0,
              left: 195,
            }}
          />
        </Box>

        <Button variant="contained" onClick={spinWheel}>
          Spin
        </Button>

        <Stack direction={"row"}>
          <Button
            onClick={() => setNumPlayers(numPlayers + 1)}
            disabled={numPlayers > 5}
          >
            <Icon>
              <Add />
            </Icon>
          </Button>
          <Button
            onClick={() => setNumPlayers(numPlayers - 1)}
            disabled={numPlayers < 3}
          >
            <Icon>
              <Remove />
            </Icon>
          </Button>
        </Stack>
      </Box>
    </>
  );
}
