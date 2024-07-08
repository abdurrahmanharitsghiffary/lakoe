import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import React from "react";
import { typographyVariants } from "../variants/typography";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, variant, affects, ...props }, ref) => {
    const Comp = variant || "p";
    return (
      <Comp
        className={cn(typographyVariants({ variant, affects, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Typography.displayName = "H1";

export default Typography;
