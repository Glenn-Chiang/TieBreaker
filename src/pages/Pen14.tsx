import { useState, useEffect } from "react";
import { Box, Typography, LinearProgress, Button, Alert } from "@mui/material";

export default function Pen14() {
  const [gameState, setGameState] = useState("start");
  const [threshold, setThreshold] = useState<number>(30);
  const [volume, setVolume] = useState<number>(0);
  const [countDown, setCount] = useState<number>(10);
  const [timerId, setTimerId] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let microphone: MediaStreamAudioSourceNode | null = null;
    let dataArray: Uint8Array | null = null;

    const getMicrophone = async () => {
      try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        // Create AudioContext and setup analyser
        audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; // Determines data resolution
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        // Connect microphone input to analyser
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        // Analyze audio levels
        const detectVolume = () => {
          if (analyser && dataArray) {
            analyser.getByteFrequencyData(dataArray);
            const avgVolume =
              dataArray.reduce((a, b) => a + b) / dataArray.length; // Average volume
            setVolume(avgVolume);
          }
          requestAnimationFrame(detectVolume);
        };

        detectVolume();
      } catch (err) {
        console.error("Microphone access denied:", err);
      }
    };

    getMicrophone();

    return () => {
      // Cleanup
      if (audioContext) audioContext.close();
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      if (countDown <= 0) {
        if (gameState === "play") {
          handleLose();
        } else if (gameState === "pause") {
          setGameState("play");
          setCount(10);
        } else {
          return;
        }
      }
      console.log(isRunning);
      console.log(gameState);

      const timer = setInterval(() => {
        setCount((prevTime) => prevTime - 1);
      }, 1000);

      setTimerId(timer);

      return () => clearInterval(timer); // Cleanup interval on unmount}
    }
  }, [countDown]);

  useEffect(() => {
    if (volume > threshold && gameState === "play") {
      setThreshold(threshold + 3);
      setGameState("pause");
      setCount(3);
    }
  }, [volume]);

  const handleStart = () => {
    setIsRunning(true);
    setGameState("play");
  };

  const handleLose = () => {
    console.log("lose");
    setIsRunning(false);
    clearInterval(timerId);
    setCount(10);
    setGameState("lose");
  };

  return (
    <>
      {gameState === "pause" && (
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
          <Typography variant="h6">Pass</Typography>
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          bgcolor: "background.default",
          padding: 3,
        }}
      >
        {gameState === "start" ? (
          <Button onClick={handleStart}>Start</Button>
        ) : gameState === "play" ? (
          <>
            <Typography variant="h4" gutterBottom>
              {"Time left"} :{countDown} s
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Volume Level: {volume.toFixed(2)}
            </Typography>
            <Box
              sx={{
                width: "80%",
                maxWidth: 500,
                marginTop: 2,
              }}
            >
              <LinearProgress
                variant="determinate"
                value={(volume / threshold) * 100} // Scale to percentage
                sx={{
                  height: 10,
                  borderRadius: 5,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "green",
                  },
                }}
              />
            </Box>
          </>
        ) : gameState === "pause" ? (
          <Typography variant="h4" gutterBottom>
            {"Next Player in"}: {countDown}s
          </Typography>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Player loses
            </Typography>
            <Button onClick={() => setGameState("start")}>Restart</Button>
          </>
        )}
      </Box>
    </>
  );
}
