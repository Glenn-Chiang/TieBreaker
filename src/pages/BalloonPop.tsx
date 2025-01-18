import { Box, Button } from "@mui/material";
import { useState } from "react";
import balloon1 from "../assets/balloon_1.jpg";
import balloon2 from "../assets/balloon_2.jpg";
import balloon3 from "../assets/balloon_3.jpg";
import explosion from "../assets/explosion.mp4";

export default function BalloonPop() {
  const [chance, setChance] = useState<number>(0);
  const [gameState, setGameState] = useState<string>("start");
  const [animPlaying, setPlay] = useState<boolean>(false);
  const [balloonImage, setImage] = useState<string>(balloon1);

  const onPump = () => {
    if (chance < 0.9) {
      setChance(chance + 0.02);
    }

    if (chance < 0.1) {
      setImage(balloon1);
    } else if (chance < 0.15) {
      setImage(balloon2);
    } else {
      setImage(balloon3);
    }

    if (Math.random() < chance) {
      setGameState("lose");
      playAnim();
    }
  };

  const playAnim = () => {
    setPlay(true);
    setTimeout(() => {
      setPlay(false);
    }, 3000);
  };

  const handleClick = () => {
    switch (gameState) {
      case "start":
        setGameState("play");
        break;
      case "play":
        onPump();
        break;
      default:
        setGameState("start");
        setChance(0);
    }
  };

  const getButtonText = () => {
    switch (gameState) {
      case "start":
        return "Start";
      case "play":
        return "Pump";
      default:
        return "Restart";
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          aspectRatio: "9 / 16",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {gameState !== "lose" ? (
          <Box
            component="img"
            src={balloonImage}
            alt="Expandable"
            sx={{
              width: 100 * (chance + 0.1) + "vw", // Expand width
              transition: "all 0.5s ease", // Smooth animation
            }}
          />
        ) : (
          <Box
            component="video"
            autoPlay
            src={explosion}
            sx={{ width: 100 * (chance + 0.1) + "vw" }}
          />
        )}
      </Box>

      {!animPlaying && <Button fullWidth variant="contained" onClick={handleClick}>{getButtonText()}</Button>}
    </>
  );
}
