import React from "react";
import { useSession } from "@/hooks/use-session";
import { Navigate } from "react-router-dom";
import { useGetMe } from "@/features/me/api/me-api";

type MustHaveStoreOrRedirectProps = {
  redirectTo?: string;
  children?: React.ReactNode;
};

export function MustHaveStoreOrRedirect({
  redirectTo = "/seller/stores/create",
  children,
}: MustHaveStoreOrRedirectProps) {
  const { data, isSuccess } = useGetMe();

  const isNotHaveStore = !data?.data?.hasStore && isSuccess;

  if (isNotHaveStore) return <Navigate to={redirectTo} />;

  return children;
}

export function HaveStoreAndRedirect({
  redirectTo = "/seller/settings/store",
  children,
}: MustHaveStoreOrRedirectProps) {
  const { data, isSuccess } = useGetMe();

  const isHaveStore = data?.data?.hasStore && isSuccess;

  if (isHaveStore) return <Navigate to={redirectTo} />;

  return children;
}
