import { Button, buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-center gap-4 max-w-md">
      <Helmet>
        <title>403 - Forbidden resource!</title>
      </Helmet>
      <Typography>403</Typography>
      <Typography variant="p" className="font-semibold">
        Oops! Cannot access this route!
      </Typography>
      <div className="flex justify-center gap-4">
        <Button
          variant="secondary"
          className="rounded-full"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>
        <Link
          to={"/"}
          className={cn(buttonVariants({ variant: "default" }), "rounded-full")}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
