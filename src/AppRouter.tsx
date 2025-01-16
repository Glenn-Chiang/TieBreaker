import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router";
import BaseLayout from "./pages/BaseLayout";
import { Home } from "@mui/icons-material";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
