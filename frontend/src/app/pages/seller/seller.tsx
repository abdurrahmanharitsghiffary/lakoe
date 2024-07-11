import { PageLayout } from "@/components/layout/page-layout";
import RootLayout from "@/components/layout/root-layout";
import React from "react";
import { Outlet } from "react-router-dom";

export function Seller() {
  return (
    <RootLayout>
      <PageLayout>
        <Outlet />
      </PageLayout>
    </RootLayout>
  );
}
