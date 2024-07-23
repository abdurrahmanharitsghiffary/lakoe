import { Button } from "@/components/ui/button";
import { Menubar, MenubarTrigger, MenubarMenu } from "@/components/ui/menubar";
import { Link } from "react-router-dom";

type NavbarProps = {
  scrollToRef: (ref: React.RefObject<HTMLElement>) => void;
  featureRef: React.RefObject<HTMLElement>;
  pricRef: React.RefObject<HTMLElement>;
  testyRef: React.RefObject<HTMLElement>;
  faqRef: React.RefObject<HTMLElement>;
};

export function Navbar({
  scrollToRef,
  featureRef,
  pricRef,
  testyRef,
  faqRef,
}: NavbarProps) {
  return (
    <div
      className="w-full bg-white shadow-md fixed py-3"
      style={{ zIndex: 1000 }}
    >
      <Menubar className="max-w-7xl mx-auto py-4 flex items-center border-none">
        <div className="flex-1 gap-2 flex items-center font-bold text-2xl">
          <img src="/assets/lakoe.png" className="w-8" alt="Lakoe Logo" />
          <span>Lakoe</span>
        </div>
        <div className="flex-1 flex justify-center items-center space-x-6">
          <MenubarMenu>
            <MenubarTrigger
              className="hover:text-blue-600 transition-colors"
              onClick={() => scrollToRef(featureRef)}
            >
              Home
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              className="hover:text-blue-600 transition-colors"
              onClick={() => scrollToRef(testyRef)}
            >
              Shop
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              className="hover:text-blue-600 transition-colors"
              onClick={() => scrollToRef(pricRef)}
            >
              FAQ
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              className="hover:text-blue-600 transition-colors"
              onClick={() => scrollToRef(faqRef)}
            >
              About Us
            </MenubarTrigger>
          </MenubarMenu>
        </div>
        <Link to="/auth/login">
          <Button variant={"outline"} className="">
            Masuk
          </Button>
        </Link>
        <Link to="/auth/register">
          <Button variant={"lakoePrimary"}>Daftar</Button>
        </Link>
      </Menubar>
    </div>
  );
}
