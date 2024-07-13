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
        {label && <label className="mb-1 text-sm text-gray-700">{label}</label>}
        <div
          className={cn(
            "flex items-center h-10 w-full border border-input bg-background rounded-md text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 has-[:focus]:outline-none has-[:focus]:ring-2 has-[:focus]:ring-primary has-[:focus]:ring-offset-2 has-[:focus]:rounded-md overflow-hidden",
            className
          )}
        >
          {startAdornment && (
            <span className="p-2 px-3 h-full text-sm text-muted-foreground bg-gray-100 rounded-l-md">
              {startAdornment}
            </span>
          )}
          {icon && (
            <span className="px-3 text-sm text-muted-foreground">{icon}</span>
          )}
          <input
            type={type}
            className={cn(
              "flex-1 px-3 py-2 placeholder:text-muted-foreground disabled:opacity-50 focus:outline-none",
              classNames?.input
            )}
            ref={ref}
            {...props}
          />
          {endAdornment && (
            <span className="p-2 px-3 h-full text-sm text-muted-foreground bg-gray-100 rounded-r-md">
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
