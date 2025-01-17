import boltIcon from "../assets/bolt_icon.webp";
import cursorIcon from "../assets/cursor_icon.webp";
import coinIcon from "../assets/coin_icon.png";
import diceIcon from "../assets/dice_icon.png";
import wheelIcon from "../assets/wheel_icon.png";
import statsIcon from "../assets/stats_icon.png";

export interface Game {
  id: string;
  name: string;
  description: string;
  icon?: string; // Path to local image asset
}

export const GAMES: Game[] = [
  {
    id: "coin-toss",
    name: "Coin Toss",
    description: "description",
    icon: coinIcon,
  },
  {
    id: "dice-roll",
    name: "Dice Roll",
    description: "description",
    icon: diceIcon,
  },
  {
    id: "spin-the-wheel",
    name: "Spin the Wheel",
    description: "description",
    icon: wheelIcon,
  },
  {
    id: "reaction-test",
    name: "Reaction Test",
    icon: boltIcon,
    description:
      "When the blue buttons turns green, click as fast as you can. If you click early, you lose immediately.",
  },
  {
    id: "click-test",
    name: "Clicking Test",
    icon: cursorIcon,
    description:
      "Click the button as many times as you can before the timer runs out",
  },
  {
    id: "stat-challenge",
    name: "Stat Challenge",
    description: "description",
    icon: statsIcon,
  },
];
