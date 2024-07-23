import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useRegist } from "@/hooks/use-regist";

export function RegisterForm() {
  const { register, handleSubmit, onSubmit, errors } = useRegist();
  console.log(errors);
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="fullName">Fullname</Label>
            <Input
              type="text"
              placeholder="Amanda Smith"
              {...register("fullName")}
              required
            />
            <p className="text-xs text-destructive">
              {errors.fullName?.message}
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">username</Label>
            <Input
              type="text"
              placeholder="@amandasmith"
              {...register("username")}
              required
            />
            <p className="text-xs text-destructive">
              {errors.username?.message}
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="text"
              placeholder="082xxxxxxx"
              {...register("phone")}
              required
            />
            <p className="text-xs text-destructive">{errors.phone?.message}</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="m@example.com"
              {...register("email")}
              required
            />
            <p className="text-xs text-destructive">{errors.email?.message}</p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              type="password"
              placeholder="********"
              {...register("password")}
              required
            />
            <p className="text-xs text-destructive">
              {errors.password?.message}
            </p>
          </div>
          <Button type="submit" className="w-full" variant="lakoePrimary">
            Create account
          </Button>
          {/* <Button variant="outline" className="w-full" type="submit">
            <FcGoogle className="mr-2" />
            Login with Google
          </Button> */}
        </form>
      </div>
      <div className="mt-4 text-center text-sm">
        have an account?{" "}
        <Link to="/auth/login" className="underline">
          Sign in
        </Link>
      </div>
    </>
  );
}
