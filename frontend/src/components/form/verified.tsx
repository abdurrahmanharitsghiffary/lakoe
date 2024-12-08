import checked from "../../../public/assets/animations/checked.json";
import Lottie from "lottie-react";
import { buttonVariants } from "../ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
export function VerifiedAccount() {
  return (
    <>
      <div className="grid gap-2 text-center">
        <div>
          <Lottie animationData={checked} loop={false} />
        </div>
        <h1 className="text-3xl font-bold">Your Account is Verified</h1>
        <p className="text-balance text-muted-foreground">
          Thank you for verifying your account
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
            Buat Toko Impianmu
          </Link>
        </div>
      </div>
    </>
  );
}
