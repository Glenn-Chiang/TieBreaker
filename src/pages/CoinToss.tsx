import { Box, Button } from "@mui/material";
import { useRef, useState } from "react";

export default function CoinToss() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [video, setVideo] = useState("/assets/heads_flip.mp4");

  const onFlip = () => {
    if (Math.random() > 0.5) {
      setVideo("/assets/tails_flip.mp4");
    } else {
      setVideo("/assets/heads_flip.mp4");
    }

    if (videoRef.current) {
      videoRef.current.pause(); // Pause the current video
      videoRef.current.src = video; // Update the video source directly
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
      <Button variant="contained" onClick={onFlip}>Flip</Button>
      <video
        ref={videoRef}
        style={{
          width: "100%",
          transform: "rotate(-90deg)",
        }}
      >
        <source src={video} />
      </video>
    </Box>
  );
}
