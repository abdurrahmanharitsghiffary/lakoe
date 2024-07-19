import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import checked from "../../../public/assets/animations/checked.json";

export function ResetSuccess() {
  return (
    <>
      <div className="grid gap-2 text-center">
        <div>
          <Lottie animationData={checked} loop={false} />
        </div>
        <h1 className="text-3xl font-bold">Reset Password Success</h1>
        <p className="text-balance text-muted-foreground">
          Congratulations your password has been reset
        </p>
      </div>
      <div className="grid gap-4">
        <div className="mt-3">
          <Link
            to={"/seller/dashboard"}
            className={cn(
              "w-full mb-2",
              buttonVariants({ variant: "lakoePrimary" })
            )}
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}
