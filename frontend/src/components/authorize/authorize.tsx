import { ForbiddenPage } from "@/app/pages/fallback/forbidden";
import { useGetMe } from "@/features/me/api/me-api";
import { Navigate, Outlet } from "react-router-dom";

type AuthorizeProps = {
  roles?: ("ADMIN" | "USER")[];
};

export function Authorize({ roles }: AuthorizeProps) {
  const { error, isError, data, isSuccess } = useGetMe();
  console.log("data: ", data);
  console.log("isError: ", isError);

  if (data?.data?.role && roles && roles.includes(data?.data?.role)) {
    return <ForbiddenPage />;
  }

  if (isError && (error as any)?.response?.data?.statusCode === 403) {
    return <Navigate to={"/auth/login"} />;
  }

  if (!data?.data?.isVerified && isSuccess) {
    return <Navigate to={"/auth/verify-account"} />;
  }

  return <Outlet />;
}
