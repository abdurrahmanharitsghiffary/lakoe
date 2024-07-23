import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Typography } from "@/components/ui/typography";
import { FaSearch } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div>
      <Menubar className="text-gray-400 justify-end bg-gray-100 py-2">
        <MenubarMenu>
          <Link to="/landing">
          <MenubarTrigger>Tentang Lakoe</MenubarTrigger>
          </Link>
          <MenubarTrigger>Mitra Lakoe</MenubarTrigger>
          <MenubarTrigger>Mulai Jualan</MenubarTrigger>
          <MenubarTrigger>Promo</MenubarTrigger>
          <MenubarTrigger>Lakoe Care</MenubarTrigger>
        </MenubarMenu>
      </Menubar>

      <div className="flex items-center gap-5 my-5 px-4">
        <Typography >Lakoe</Typography>
        <div className="relative w-full max-w-[500px] m-auto">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-500" />
          </span>
          <input
            type="search"
            className="pl-10 w-full h-[35px] border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
          />
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {/* <SlBasket className="text-gray-500 w-6 h-6" /> */}
          <Link to="/auth/login">
            <Button variant="outline">Masuk</Button>
          </Link>
          <Link to="/auth/register">
            <Button variant="lakoePrimary">Daftar</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
