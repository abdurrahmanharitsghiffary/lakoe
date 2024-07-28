import { ForbiddenPage } from "@/app/pages/fallback/forbidden";
import { useGetMe } from "@/features/me/api/me-api";
import { Navigate, Outlet } from "react-router-dom";

type AuthorizeProps = {
  roles?: ("ADMIN" | "USER")[];
  children?: React.ReactNode;
};

export function Authorize({ roles, children }: AuthorizeProps) {
  const { error, isError, data, isSuccess } = useGetMe({
    queryConfig: { retry: false },
  });

  const isNotAuthored =
    isError && (error as any)?.response?.data?.statusCode === 403;

  if (data?.data?.role && roles && !roles.includes(data?.data?.role)) {
    return <ForbiddenPage />;
  }

  if (isNotAuthored) {
    return <Navigate to={"/auth/login"} />;
  }

  if (!data?.data?.isVerified && isSuccess) {
    return <Navigate to={"/auth/verify-account"} />;
  }

  if (children) return children;

  return <Outlet />;
}

export function Authored() {
  const { error, isError, isSuccess } = useGetMe({
    queryConfig: { retry: false },
  });

  const isNotAuthored =
    isError && (error as any)?.response?.data?.statusCode === 403;

  if (isSuccess) {
    return <Navigate to={"/seller/dashboard"} />;
  }

  if (isNotAuthored) {
    return <Outlet />;
  }
  return <Outlet />;
}
