import boltIcon from "../assets/bolt_icon.webp"

export interface Game {
  id: string;
  name: string;
  description: string;
  image?: string; // Path to local image asset
}

export const GAMES: Game[] = [
  { id: "coin-toss", name: "Coin Toss", description: "description" },
  { id: "dice-roll", name: "Dice Roll", description: "description" },
  { id: "spin-the-wheel", name: "Spin the Wheel", description: "description" },
  {
    id: "reaction-test",
    name: "Reaction Test",
    image: boltIcon,
    description: "When the blue buttons turns green, click as fast as you can. If you click early, you lose immediately.",
  },
  { id: "stat-challenge", name: "Stat Challenge", description: "description" },
];
