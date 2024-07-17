import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/use-login";
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

export const iframeHeight = "800px";

export const containerClassName = "w-full h-full p-4 lg:p-0";

export function LoginForm() {
  const { register, handleSubmit, onSubmit, errors } = useLogin();
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-[100dvh]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Link
                to={import.meta.env.VITE_BASE_API_URL + "/api/v1/oauth/google"}
                className={cn("w-full", buttonVariants({ variant: "outline" }))}
              >
                <FcGoogle className="mr-2" />
                Continue with Google
              </Link>
            </form>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="underline">
              Sign up
            </Link>
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
