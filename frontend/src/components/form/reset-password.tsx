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
    <div className="w-full lg:grid lg:grid-cols-2 min-h-[100dvh]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password?</h1>
          </div>
          <div className="grid gap-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register("newPassword")}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  required
                />
              </div>

              <div className="mt-3">
                <Button type="submit" className="w-full mb-2">
                  Submit
                </Button>
                <Link
                  to={"/auth/login"}
                  className={cn(
                    "w-full mb-2",
                    buttonVariants({ variant: "lakoePrimary" })
                  )}
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/assets/placeholder.png"
          alt="Image"
          width="1920"
          className="h-full w-full object-cover dark:brightness-[0.2] object-right dark:grayscale"
        />
      </div>
    </div>
  );
}
