import { useGetMe } from "@/features/me/api/me-api";
import { Navigate } from "react-router-dom";

type AuthorizeNavProps = {
  redirectUrl: string;
  children?: React.ReactNode;
  whenVerified?: boolean;
};

export function AuthorizeNav({
  redirectUrl,
  children,
  whenVerified = false,
}: AuthorizeNavProps) {
  const { data, isSuccess } = useGetMe();

  if (
    (!data?.data.isVerified && !whenVerified && isSuccess) ||
    (data?.data.isVerified && whenVerified && isSuccess)
  )
    return <Navigate to={redirectUrl} />;
  return children;
}
