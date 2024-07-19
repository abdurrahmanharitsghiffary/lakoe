import { Outlet } from "react-router-dom";
import { AppProvider } from "./app-providers";

export function App() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}
