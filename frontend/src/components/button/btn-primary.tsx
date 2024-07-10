import { forwardRef } from "react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

const ButtonPrimary = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        className={cn(
          props?.className,
          "bg-lakoe-primary hover:bg-lakoe-secondary"
        )}
      />
    );
  }
);

ButtonPrimary.displayName = "ButtonPrimary";

export { ButtonPrimary };
