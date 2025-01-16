export interface Game {
  id: string;
  name: string;
  description: string;
}

export const GAMES: Game[] = [
  { id: "coin-toss", name: "Coin Toss", description: "description" },
  { id: "dice-roll", name: "Dice Roll", description: "description" },
  { id: "spin-the-wheel", name: "Spin the Wheel", description: "description" },
  {
    id: "reaction-test",
    name: "Reaction Test",
    description: "When the blue box turns red, click as fast as you can",
  },
  { id: "stat-challenge", name: "Stat Challenge", description: "description" },
];
