import { PageLayout } from "@/components/layout/page-layout";
import { RootLayout } from "@/components/layout/root-layout";
import { Outlet } from "react-router-dom";

export function SellerLayout() {
  return (
    <RootLayout>
      <PageLayout>
        <Outlet />
      </PageLayout>
    </RootLayout>
  );
}
