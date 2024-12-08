import { Outlet } from "react-router-dom";
import { Header } from "@/features/home/header";

export function BuyerLayout() {
  return (
    <>
      <Header />
      <main className="overflow-y-auto min-h-[100dvh]">
        <Outlet />
      </main>
    </>
  );
}
