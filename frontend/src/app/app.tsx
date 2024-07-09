import { Outlet } from "react-router-dom";
import AppProvider from "./app-providers";
import RootLayout from "@/components/layout/root-layout";

export default function App() {
  return (
    <AppProvider>
      <RootLayout>
        <Outlet />
      </RootLayout>
    </AppProvider>
  );
}
