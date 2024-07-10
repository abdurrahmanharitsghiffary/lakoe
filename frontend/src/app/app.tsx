import { Outlet } from "react-router-dom";
import AppProvider from "./app-providers";
import RootLayout from "@/components/layout/root-layout";
import { PageLayout } from "@/components/layout/page-layout";

export default function App() {
  return (
    <AppProvider>
      <RootLayout>
        <PageLayout>
          <Outlet />
        </PageLayout>
      </RootLayout>
    </AppProvider>
  );
}
