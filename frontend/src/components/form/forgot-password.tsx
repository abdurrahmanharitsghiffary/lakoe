import { useForgot } from "@/hooks/use-forgot";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function ForgotForm() {
  const { register, handleSubmit, onSubmit, errors } = useForgot();
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Forgot Password?</h1>
        <p className="text-balance text-muted-foreground">
          No worries! Enter your email below to reset your password
        </p>
      </div>
      <div className="grid gap-4">
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="mt-3">
            <Button
              type="submit"
              className="w-full mb-2"
              variant="lakoePrimary"
            >
              Submit
            </Button>
            <Button variant="outline" className="w-full">
              Back to login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
