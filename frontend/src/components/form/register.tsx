import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

export function RegisterForm() {
  return (
    <>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Register</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Fullname</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Amanda Smith"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="@amandasmith"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="082xxxxxxx"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Create account
              </Button>
              <Button variant="outline" className="w-full">
                <FcGoogle className="mr-2" />
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              have an account?{" "}
              <Link to="/auth/login" className="underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="/assets/placeholder.png"
            alt="Image"
            width="1920"
            className="h-full w-full object-cover dark:brightness-[0.2] object-left dark:grayscale"
          />
        </div>
      </div>
    </>
  );
}
