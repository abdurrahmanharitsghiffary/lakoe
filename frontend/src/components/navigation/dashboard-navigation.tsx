import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoMdNotifications } from "react-icons/io";
import { FaTruck } from "react-icons/fa6";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems: { label: string; href?: string }[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  { label: "Produk", href: "/products" },
];

/**
 * @deprecated since version 2.0
 */
export function DashboardNavigation() {
  const { pathname } = useLocation();

  return (
    <div className="flex justify-end gap-2 px-1 py-2 ">
      {navItems.map((item) => (
        <Link
          key={item?.label}
          to={item.href ?? ""}
          className={cn(
            buttonVariants({
              variant: item.href === pathname ? "secondary" : "ghost",
              size: "lg",
            }),
            "flex px-5 justify-center  py-4"
          )}
        >
          <h1
            className="text-lg"
            style={{ color: pathname === item.href ? "#0000FF" : undefined }}
          >
            {item.label}
          </h1>
        </Link>
      ))}
      <Accordion
        type="single"
        collapsible
        style={{ marginTop: "-15px" }}
        className="flex gap-5"
      >
        <AccordionItem className="border-b-0" value="item-1">
          <AccordionTrigger>
            <Button
              variant="ghost"
              size="lg"
              className="flex px-2 justify-start items-center"
            >
              <h1 className="text-lg">Orders</h1>
            </Button>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col  gap-2">
            <Button
              variant="ghost"
              size="lg"
              className="flex px-2 justify-start items-center"
            >
              <h1 className="text-lg">Pesanan</h1>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="flex px-2 justify-start items-center"
            >
              <h1 className="text-lg">Pesanan</h1>
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-b-0">
          <AccordionTrigger>
            <Button
              variant="ghost"
              size="lg"
              className="flex px-2 justify-start items-center"
            >
              <h1 className="text-lg">Logistics</h1>
            </Button>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col justify-center gap-4 ml-8">
            <Button
              variant="ghost"
              size="lg"
              className="flex px-2 justify-start items-center"
            >
              <LiaShoppingBagSolid className="ml-1 mr-2 h-8 w-8" />
              <h1 className="text-lg">Pesanan</h1>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="flex px-2 justify-start items-center"
            >
              <LiaShoppingBagSolid className="ml-1 mr-2 h-8 w-8" />
              <h1 className="text-lg">Pesanan</h1>
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-b-0">
          <AccordionTrigger>
            <Button
              variant="ghost"
              size="lg"
              className="flex px-2 justify-start items-center"
            >
              <h1 className="text-lg">Lainnya</h1>
            </Button>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col justify-center gap-4 ml-8">
            <Button
              variant="ghost"
              size="lg"
              className="flex px-2 justify-start items-center"
            >
              <h1 className="text-lg">Pesanan</h1>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="flex px-2 justify-start items-center"
            >
              <LiaShoppingBagSolid className="ml-1 mr-2 h-8 w-8" />
              <h1 className="text-lg">Pesanan</h1>
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        size="lg"
        className="flex px-5 justify-start items-center"
        style={{ backgroundColor: "orange" }}
      >
        <h1 className="text-lg">+ Tambahkan Produk </h1>
      </Button>
      <Button
        variant="ghost"
        size="lg"
        className="flex px-2 justify-start items-center"
      >
        <IoMdNotifications className="ml-1 mr-2 h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="lg"
        className="flex px-2 justify-start items-center"
      >
        <FaTruck className="ml-1 mr-2 h-8 w-8" />
      </Button>
    </div>
  );
}
