import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-[100dvh]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Outlet />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/assets/placeholder.png"
          alt="Image"
          width="1920"
          className="h-full w-full object-cover dark:brightness-[0.2] object-right dark:grayscale"
        />
      </div>
    </div>
  );
}
