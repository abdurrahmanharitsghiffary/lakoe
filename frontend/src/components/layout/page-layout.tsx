import React from "react";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return <div className="m-4">{children}</div>;
}
