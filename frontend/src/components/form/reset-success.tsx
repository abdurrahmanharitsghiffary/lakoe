import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import checked from "../../../public/assets/animations/checked.json";

export function ResetSuccess() {
  return (
    <>
      <div className="w-full lg:grid lg:grid-cols-2 min-h-[100dvh]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
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
    </>
  );
}
