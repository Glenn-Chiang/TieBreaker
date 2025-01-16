import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router";
import BaseLayout from "./pages/BaseLayout";
import HomePage from "./pages/HomePage";
import PlayersPage from "./pages/PlayersPage";
import GamesPage from "./pages/GamesPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="players" element={<PlayersPage/>}/>
          <Route path="games" element={<GamesPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
