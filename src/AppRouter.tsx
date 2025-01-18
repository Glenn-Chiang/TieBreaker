import { BrowserRouter, Route, Routes } from "react-router";
import BaseLayout from "./pages/BaseLayout";
import CoinToss from "./pages/CoinToss";
import DiceRoll from "./pages/DiceRoll";
import GamesPage from "./pages/GamesPage";
import PlayersPage from "./pages/PlayersPage";
import ReactionTest from "./pages/ReactionTest";
import SpinTheWheel from "./pages/SpinTheWheel";
import StatChallenge from "./pages/StatChallenge";
import ClickTest from "./pages/ClickTest";
import GamePageLayout from "./pages/GamePageLayout";
import BalloonPop from "./pages/BalloonPop";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<GamesPage />} />
          <Route path="players" element={<PlayersPage />} />

          <Route path="games">
            <Route index element={<GamesPage />} />

            <Route element={<GamePageLayout />}>
              <Route path="coin-toss" element={<CoinToss />} />
              <Route path="dice-roll" element={<DiceRoll />} />
              <Route path="spin-the-wheel" element={<SpinTheWheel />} />
              <Route path="reaction-test" element={<ReactionTest />} />
              <Route path="click-test" element={<ClickTest />} />
              <Route path="stat-challenge" element={<StatChallenge />} />
              <Route path="balloon-pop" element={<BalloonPop />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
