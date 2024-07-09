import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

const InputFileHidden = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    divProps?: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
  }
>(({ children, divProps, ...props }, ref) => {
  const { className, ...divP } = divProps || {};

  return (
    <div {...divP} className={cn("relative", className)}>
      <input
        {...props}
        ref={ref}
        className=" opacity-0 inset-0 absolute"
        type="file"
      />
      {children}
    </div>
  );
});

InputFileHidden.displayName = "InputFileHidden";

export default InputFileHidden;
