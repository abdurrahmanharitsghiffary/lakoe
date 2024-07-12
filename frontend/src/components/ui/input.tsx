import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  icon?: React.ReactNode;
  classNames?: {
    input: string;
  };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      classNames,
      type,
      label,
      helperText,
      startAdornment,
      endAdornment,
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label className="mb-1 text-sm  text-gray-700">{label}</label>
        )}
        <div
          className={cn(
            "flex items-center h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          {startAdornment && (
            <span className="p-3 text-sm text-muted-foreground bg-gray-100 rounded-l-lg">
              {startAdornment}
            </span>
          )}
          {icon && (
            <span className="px-1 text-sm text-muted-foreground">{icon}</span>
          )}
          <input
            type={type}
            className={cn(
              "flex-1 pe-12 ps-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50",
              classNames?.input
            )}
            ref={ref}
            {...props}
          />
          {endAdornment && (
            <span className="p-3 text-sm text-muted-foreground bg-gray-100 rounded-r-lg">
              {endAdornment}
            </span>
          )}
        </div>
        {helperText && (
          <span className="mt-1 text-xs text-muted-foreground">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
