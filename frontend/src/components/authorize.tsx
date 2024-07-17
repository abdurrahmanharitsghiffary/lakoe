import { useGetMe } from "@/features/me/api/me-api";
import { Navigate, Outlet } from "react-router-dom";

export function Authorize() {
  const { error, isError } = useGetMe();
  console.log("data: ", error);
  console.log("isError: ", isError);

  if (isError && error?.response?.data?.statusCode === 403) {
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
