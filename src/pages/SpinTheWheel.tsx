import { useState, useRef, useEffect } from "react";
import { Button, Box } from "@mui/material";

export default function SpinTheWheel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [numElements, setNumElements] = useState<number>(2);
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
    const anglePerSegment = (2 * Math.PI) / numElements;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numElements; i++) {
      const startAngle = angle + i * anglePerSegment;
      const endAngle = startAngle + anglePerSegment;

      // Draw segment with unique color
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fillStyle = `hsl(${(360 / numElements) * i}, 70%, 70%)`; // Unique color for each segment
      ctx.fill();
      ctx.stroke();
    }
  };

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);

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
      }
    };

    animate();
  };

  useEffect(() => drawWheel(0), [numElements]);

  return (
    <>
      <Box>
        <Box sx={{ position: "absolute" }}>
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            style={{ border: "2px solid #000", borderRadius: "50%" }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "200px", // Centered overlap
            left: "200px",
            zIndex: 1,
          }}
        >
          <Button variant="contained" onClick={spinWheel}>
            Spin
          </Button>
        </Box>

        <Button
          onClick={() => setNumElements(numElements + 1)}
          disabled={numElements > 5}
        >
          +
        </Button>
        <Button
          onClick={() => setNumElements(numElements - 1)}
          disabled={numElements < 3}
        >
          -
        </Button>
      </Box>
    </>
  );
}
