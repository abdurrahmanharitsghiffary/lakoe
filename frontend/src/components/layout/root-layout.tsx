import Navigation from "@/components/navigation/navigation";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-[100dvh] overflow-hidden">
      <div className="w-full h-16 border-2 border-gray-100"></div>
      <div className="flex flex-row h-full">
        <div className="basis-1/5 h-full">
          <Navigation />
        </div>
        <div className="basis-3/5 bg-zinc-200 overflow-y-auto h-screen">
          {children}
        </div>
        <div className="basis-1/5 h-full"></div>
      </div>
    </div>
  );
}
export default RootLayout;
