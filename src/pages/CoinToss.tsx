import { Box, Button } from "@mui/material";
import { useRef, useState } from "react";
import headVideo from "../assets/heads_flip.mp4";
import tailVideo from "../assets/tails_flip.mp4";

export default function CoinToss() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [video, setVideo] = useState(headVideo);

  const onFlip = () => {
    if (Math.random() > 0.5) {
      setVideo(tailVideo);
    } else {
      setVideo(headVideo);
    }

    if (videoRef.current) {
      videoRef.current.pause(); // Pause the current video
      videoRef.current.src = video; // Update the video source directly
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  return (
    <Box>
      <Button onClick={onFlip}>Flip</Button>
      <video
        ref={videoRef}
        style={{
          width: "100vw",
          transform: "rotate(-90deg)",
        }}
      >
        <source src={video} />
      </video>
    </Box>
  );
}
