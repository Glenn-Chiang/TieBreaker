import React, { createContext, useContext, useState } from "react";
import ReactConfetti from "react-confetti";

// Handle activation of confetti when winner is determined

interface ConfettiManager {
  activate: () => void;
}

const ConfettiContext = createContext<ConfettiManager | undefined>(undefined);

export function ConfettiProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);

  // Number of seconds confetti will display
  const activeDuration = 30;

  const activate = () => {
    setIsActive(true);

    setTimeout(() => {
      setIsActive(false);
    }, activeDuration * 1000);
  };

  const confettiManager: ConfettiManager = { activate };

  return (
    <ConfettiContext.Provider value={confettiManager}>
      {isActive && <ReactConfetti />}
      {children}
    </ConfettiContext.Provider>
  );
}

export const useConfetti = (): ConfettiManager => {
  const confettiManager = useContext(ConfettiContext)!;
  return confettiManager;
};
