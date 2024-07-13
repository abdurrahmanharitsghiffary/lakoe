import { BiHomeCircle } from "react-icons/bi";
import { IoMdCube } from "react-icons/io";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
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
import { MdOutlineStorefront } from "react-icons/md";

const navItems: { icon: IconType; label: string; href?: string }[] = [
  {
    icon: BiHomeCircle,
    label: "Dashboard",
    href: "/seller/dashboard",
  },
  { icon: IoMdCube, label: "Produk", href: "/seller/products" },
  { icon: LiaShoppingBagSolid, label: "Pesanan", href: "/seller/orders" },
];

const accItems: { icon: IconType; label: string; href?: string }[] = [
  {
    icon: MdOutlineStorefront,
    label: "Atur Toko",
    href: "/seller/settings/store",
  },
  {
    icon: TbTruckDelivery,
    label: "Pengiriman",
    href: "seller/settings/delivery",
  },
  {
    icon: MdOutlinePayment,
    label: "Metode Pembayaran",
    href: "seller/settings/payment",
  },
];

function Navigation() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-2 px-2 py-2 h-[90vh]">
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
            className={cn(
              "ml-1 mr-2 text-2xl",
              pathname === item.href ? "text-lakoe-primary" : undefined
            )}
          />
          <h1
            className={cn(
              "text-base",
              pathname === item.href ? "text-lakoe-primary" : undefined
            )}
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
              <IoSettingsOutline className="ml-1 mr-2 text-2xl" />
              <h1 className="text-base">Pengaturan</h1>
            </Button>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col justify-center gap-4 ml-8">
            {accItems.map((item) => (
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
                  className={cn(
                    "ml-1 mr-2 text-2xl",
                    pathname === item.href ? "text-lakoe-primary" : undefined
                  )}
                />
                <h1
                  className={cn(
                    "text-base",
                    pathname === item.href ? "text-lakoe-primary" : undefined
                  )}
                >
                  {item.label}
                </h1>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        variant="ghost"
        size="lg"
        className="flex w-full justify-start items-center mt-auto"
      >
        <CgProfile className="ml-1 mr-2 h-8 w-8" />
        <h1 className="text-base">Profil</h1>
      </Button>
    </div>
  );
}

export default Navigation;
