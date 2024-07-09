import Navigation from "@/components/navigation/navigation";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-[100dvh] min-h-[100dvh]">
      <div className="w-full h-16 border-2 border-gray-100 fixed top-0 inset-x-0 bg-white"></div>
      <div className="flex flex-row h-screen pt-16">
        <div className="basis-1/5 h-full">
          <Navigation />
        </div>
        <div className="basis-3/5 bg-zinc-200 overflow-y-auto">{children}</div>
        <div className="basis-1/5 h-full"></div>
      </div>
    </div>
  );
}
export default RootLayout;
