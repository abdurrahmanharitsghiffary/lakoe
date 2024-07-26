import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-[100dvh]">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="flex flex-col gap-2 justify-center items-center mb-2">
          <img src="/assets/lakoe.png" className="w-16" alt="Lakoe Logo" />
          {/* <Typography className="text-4xl">Lakoe</Typography> */}
        </div>
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
