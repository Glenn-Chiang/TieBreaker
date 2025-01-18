import { BrowserRouter, Route, Routes } from "react-router";
import BaseLayout from "./pages/BaseLayout";
import ClickTest from "./pages/ClickTest";
import CoinToss from "./pages/CoinToss";
import DiceRoll from "./pages/DiceRoll";
import GamePageLayout from "./pages/GamePageLayout";
import GamesPage from "./pages/GamesPage";
import ReactionTest from "./pages/ReactionTest";
import SpinTheWheel from "./pages/SpinTheWheel";
import StatChallenge from "./pages/StatChallenge";
import BalloonPop from "./pages/BalloonPop";
import Pen14 from "./pages/Pen14";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<GamesPage />} />

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
              <Route path="pen14" element={<Pen14 />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
