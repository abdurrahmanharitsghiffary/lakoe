import { BiHomeCircle } from "react-icons/bi";
import { IoMdCube } from "react-icons/io";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { IconType } from "react-icons/lib";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems: { icon: IconType; label: string; href?: string }[] = [
  {
    icon: BiHomeCircle,
    label: "Dashboard",
    href: "/dashboard",
  },
  { icon: IoMdCube, label: "Produk", href: "/products" },
  { icon: LiaShoppingBagSolid, label: "Pesanan", href: "/orders" },
];

function Navigation() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col mr-2 gap-4 px-1 py-4 h-[90vh]">
      {navItems.map((item) => (
        <Link
          key={item?.label}
          to={item.href ?? ""}
          className={cn(
            buttonVariants({
              variant: item.href === pathname ? "secondary" : "ghost",
              size: "lg",
            }),
            "flex w-full justify-start items-center py-3"
          )}
        >
          <item.icon
            className="ml-1 mr-2 h-8 w-8"
            color={pathname === item.href ? "blue" : undefined}
          />
          <h1
            className="text-lg"
            style={{ color: pathname === item.href ? "#0000FF" : undefined }}
          >
            {item.label}
          </h1>
        </Link>
      ))}
      <Accordion type="single" collapsible style={{ marginTop: "-15px" }}>
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger>
            <Button
              variant="ghost"
              size="lg"
              className="flex w-full justify-start items-center"
            >
              <IoSettingsOutline className="ml-1 mr-2 h-8 w-8" />
              <h1 className="text-lg">Pengaturan</h1>
            </Button>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col justify-center gap-4 ml-8">
            <Button
              variant="ghost"
              size="lg"
              className="flex w-full justify-start items-center"
            >
              <LiaShoppingBagSolid className="ml-1 mr-2 h-8 w-8" />
              <h1 className="text-lg">Pesanan</h1>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="flex w-full justify-start items-center"
            >
              <LiaShoppingBagSolid className="ml-1 mr-2 h-8 w-8" />
              <h1 className="text-lg">Pesanan</h1>
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        variant="ghost"
        size="lg"
        className="flex w-full justify-start items-center mt-auto"
      >
        <CgProfile className="ml-1 mr-2 h-8 w-8" />
        <h1 className="text-lg">Profil</h1>
      </Button>
    </div>
  );
}

export default Navigation;
