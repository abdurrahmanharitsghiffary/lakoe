import { cn } from "@/lib/utils";
import React from "react";

export type ListProps<T> = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  data: T[] | undefined;
  isLoading?: boolean;
  noItemsContent?: React.ReactNode;
  loader?: React.ReactNode;
};

export function List<T>({
  data = [],
  isLoading,
  loader,
  noItemsContent,
  children,
  ...props
}: ListProps<T>) {
  if (noItemsContent && data.length < 1 && !isLoading) return noItemsContent;

  return (
    <div {...props} className={cn(props.className, "grid grid-cols-1 gap-2")}>
      {isLoading ? loader : children}
    </div>
  );
}
