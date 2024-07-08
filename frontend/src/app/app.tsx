import { Outlet } from "react-router-dom";
import AppProvider from "./app-providers";

export default function App() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}
