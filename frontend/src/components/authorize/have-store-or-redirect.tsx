import React from "react";
import { useSession } from "@/hooks/use-session";
import { Navigate } from "react-router-dom";

type MustHaveStoreOrRedirectProps = {
  redirectTo?: string;
  children?: React.ReactNode;
};

export function MustHaveStoreOrRedirect({
  redirectTo = "/stores/create",
  children,
}: MustHaveStoreOrRedirectProps) {
  const { user } = useSession();
  console.log(user?.storeId, "USERE");
  if (user && !user?.storeId) return <Navigate to={redirectTo} />;

  return children;
}

export function HaveStoreAndRedirect({
  redirectTo = "/seller/settings/store",
  children,
}: MustHaveStoreOrRedirectProps) {
  const { user } = useSession();
  if (user && user?.storeId) return <Navigate to={redirectTo} />;

  return children;
}
