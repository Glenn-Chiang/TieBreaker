import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router";
import BaseLayout from "./pages/BaseLayout";
import HomePage from "./pages/HomePage";
import PlayersPage from "./pages/PlayersPage";
import GamesPage from "./pages/GamesPage";
import CoinToss from "./pages/CoinToss";
import DiceRoll from "./pages/DiceRoll";
import SpinTheWheel from "./pages/SpinTheWheel";
import ReactionTest from "./pages/ReactionTest";
import StatChallenge from "./pages/StatChallenge";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="players" element={<PlayersPage />} />

          <Route path="games">
            <Route index element={<GamesPage />}/>
            <Route path="coin-toss" element={<CoinToss/>}/>
            <Route path="dice-roll" element={<DiceRoll/>}/>
            <Route path="spin-the-wheel" element={<SpinTheWheel/>}/>
            <Route path="reaction-test" element={<ReactionTest/>}/>
            <Route path="stat-challenge" element={<StatChallenge/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
