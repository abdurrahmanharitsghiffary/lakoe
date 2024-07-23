import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { axios } from "@/lib/axios";
import { z } from "zod";
import { toast } from "react-toastify";
import { getAxiosErrMessage } from "@/utils/get-axios-err-message";
import { ApiResponse } from "@/types/api-response";

const verifySchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

type Verify = z.infer<typeof verifySchema>;

export function VerifyForm() {
  const { handleSubmit } = useForm<Verify>();

  const onSubmit: SubmitHandler<Verify> = async (data) => {
    toast.promise(
      axios
        .post<ApiResponse<any>>("/auth/verify-email")
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
      {
        error: {
          render({ data }) {
            return getAxiosErrMessage(data);
          },
        },
        pending: "Sending request to verify your email",
        success: {
          render({ data }) {
            return data?.data?.message;
          },
        },
      }
    );
  };
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Verify Your Account</h1>
        <p className="text-balance text-muted-foreground">
          Please verify your email by clicking the button below
        </p>
      </div>
      <div className="grid gap-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3">
            <Button
              type="submit"
              className="w-full mb-2"
              variant="lakoePrimary"
            >
              Verify Account
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
