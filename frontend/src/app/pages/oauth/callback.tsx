import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { getAxiosErrMessage } from "@/utils/get-axios-err-message";
import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSessionActions } from "@/hooks/use-session";

export function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useSessionActions();

  const code = searchParams.get("code");
  console.log(code, "CODE");
  const verifyCode = useCallback(() => {
    toast.promise(
      axios
        .post<ApiResponse<{ token: string }>>("/oauth/verify-code?code=" + code)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
      {
        pending: "Verifying login",
        success: {
          render({ data }) {
            console.log(data, "DATA");
            login(data?.data?.token);
            if (data?.data?.token) {
              navigate("/", { replace: true });
            } else {
              navigate("/auth/login", { replace: true });
            }
            return "Login success";
          },
        },
        error: {
          render: ({ data }) => {
            navigate("/auth/login", { replace: true });
            return getAxiosErrMessage(data);
          },
        },
      }
    );
  }, [code, login, navigate]);

  useEffect(() => {
    let isIgnore = false;
    console.log("Running useEffect");
    if (!isIgnore) verifyCode();

    return () => {
      isIgnore = true;
    };
  }, [verifyCode]);

  return null;
}
