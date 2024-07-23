import { SubmitHandler, useForm } from "react-hook-form";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axios } from "@/lib/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

const resetSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password min length is 8 characters")
      .max(30),
    confirmPassword: z.string(),
  })
  .refine((arg) => arg.newPassword === arg.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type Reset = z.infer<typeof resetSchema>;
export function ResetForm() {
  const navigate = useNavigate();
  const { token } = useParams();
  const { register, handleSubmit } = useForm<Reset>({
    mode: "onChange",
    resolver: zodResolver(resetSchema),
  });

  const onSubmit: SubmitHandler<Reset> = async (data) => {
    try {
      const response = await axios.post(`auth/reset-password/${token}`, data);
      console.log("reset success", response.data);

      if (!response || !response.data) {
        throw new Error("Something went wrong");
      }

      navigate("/auth/reset-success");
    } catch (error) {
      console.error("reset error", error);
    }
  };

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Reset Password?</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              type="password"
              placeholder="Enter your new password..."
              {...register("newPassword")}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              placeholder="Enter again your password..."
              {...register("confirmPassword")}
              required
            />
          </div>

          <div className="mt-3">
            <Button
              type="submit"
              className="w-full mb-2"
              variant="lakoePrimary"
            >
              Submit
            </Button>
            <Link
              to={"/auth/login"}
              className={cn(
                "w-full mb-2",
                buttonVariants({ variant: "secondary" })
              )}
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
