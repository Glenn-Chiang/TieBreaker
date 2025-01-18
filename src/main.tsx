import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./AppRouter.tsx";
import { GlobalStyles } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyles styles={{ body: { margin: 0 } }} />
    <AppRouter />

  </StrictMode>
);
