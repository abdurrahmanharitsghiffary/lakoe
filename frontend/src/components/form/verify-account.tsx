import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { axios } from "@/lib/axios";
import { z } from "zod";

const verifySchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

type Verify = z.infer<typeof verifySchema>;

export function VerifyForm() {
  const { handleSubmit } = useForm<Verify>();

  const onSubmit: SubmitHandler<Verify> = async (data) => {
    try {
      const response = await axios.post("/auth/verify-email");
      console.log("verify: ", response.data);
    } catch (error) {
      console.error("verify error: ", error);
    }
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
            <Button type="submit" className="w-full mb-2">
              Verify Account
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
