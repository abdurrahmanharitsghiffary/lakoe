import { useToast } from "@/components/ui/use-toast";
import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { getAxiosErrMessage } from "@/utils/get-axios-err-message";
import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const code = searchParams.get("code");
  console.log(code, "CODE");
  const verifyCode = useCallback(async () => {
    try {
      console.log(code, "CODE IN VERIFY");

      const response = await axios.post<ApiResponse<{ token: string }>>(
        "/oauth/verify-code?code=" + code
      );
      const data = response.data;
      if (data?.data?.token) {
        localStorage.setItem("token", data.data.token);
        return navigate("/seller/dashboard");
      } else {
        return navigate("/auth/login");
      }
    } catch (err: any) {
      console.error(err, "ERROR");
      toast({ title: getAxiosErrMessage(err) });
      navigate("/auth/login");
    }
  }, [code, navigate, toast]);

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
