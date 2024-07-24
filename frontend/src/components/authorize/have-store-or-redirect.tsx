import React from "react";
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
  const { data, isSuccess } = useGetMe({ queryConfig: { retry: false } });

  const isNotHaveStore = !data?.data?.hasStore && isSuccess;

  if (isNotHaveStore) return <Navigate to={redirectTo} />;

  return children;
}

export function HaveStoreAndRedirect({
  redirectTo = "/seller/settings/store",
  children,
}: MustHaveStoreOrRedirectProps) {
  const { data, isSuccess } = useGetMe({ queryConfig: { retry: false } });

  const isHaveStore = data?.data?.hasStore && isSuccess;

  if (isHaveStore) return <Navigate to={redirectTo} />;

  return children;
}
