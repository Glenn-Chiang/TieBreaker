import { Outlet } from "react-router";
import { ConfettiProvider } from "../components/ConfettiProvider";

export default function GamePageLayout() {
  return (
    <ConfettiProvider>
      <Outlet />
    </ConfettiProvider>
  );
}
