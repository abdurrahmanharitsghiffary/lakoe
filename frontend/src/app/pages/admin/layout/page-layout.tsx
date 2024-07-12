import React from "react";

type AdminPageLayoutProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { title?: string };

export default function PageLayout({
  children,
  title,
  ...props
}: AdminPageLayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4" {...props}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
}
