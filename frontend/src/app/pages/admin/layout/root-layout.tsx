import {
  MdOutlineDashboard,
  MdOutlineDone,
  MdOutlinePending,
} from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PiHandWithdrawBold } from "react-icons/pi";
import { IoAnalytics, IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { TiCancel } from "react-icons/ti";
import { DiTerminal } from "react-icons/di";

type BaseItem = {
  isSection: boolean;
  href: string;
  icon?: React.ReactNode;
  label: string;
  id: number | string;
};

type ListItem = {
  isSection: false;
} & BaseItem;

type SectionItem = {
  isSection: true;
  items: ListItem[];
} & BaseItem;

type NavItem = ListItem | SectionItem;

const navItems: NavItem[] = [
  {
    href: "",
    id: "overview",
    isSection: false,
    label: "Overview",
    icon: <MdOutlineDashboard />,
  },
  {
    href: "/withdrawal",
    id: "withdraw",
    isSection: true,
    label: "Withdrawal",
    icon: <PiHandWithdrawBold />,
    items: [
      {
        href: "/pending",
        id: "pending",
        isSection: false,
        label: "Pending",
        icon: <MdOutlinePending />,
      },
      {
        href: "/processing",
        id: "processing",
        isSection: false,
        label: "In Process",
        icon: <DiTerminal />,
      },
      {
        href: "/success",
        id: "success",
        isSection: false,
        label: "Success",
        icon: <MdOutlineDone />,
      },
      {
        href: "/rejected",
        id: "rejected",
        isSection: false,
        label: "Rejected",
        icon: <TiCancel />,
      },
    ],
  },
  {
    href: "/analysis",
    id: "analysis",
    isSection: false,
    label: "Analysis",
    icon: <IoAnalytics />,
  },
  {
    href: "/settings",
    id: "settings",
    isSection: false,
    label: "Settings",
    icon: <IoSettingsOutline />,
  },
];

function NavItemSection({
  item,
  baseUrl = "",
}: {
  baseUrl?: string;
  item: SectionItem;
}) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li
      key={item?.id}
      className="w-full relative cursor-pointer"
      onClick={() => setIsOpen((c) => !c)}
    >
      {pathname === "/admin" + baseUrl + item?.href && (
        <motion.span
          layoutId="underline"
          className="absolute block bg-purple-600 left-0 inset-y-0 w-1"
        ></motion.span>
      )}
      <button className="text-base font-semibold w-full p-4 hover:bg-slate-300 flex gap-2 items-center transition-all justify-between">
        <div className="flex justify-start items-center gap-2">
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </div>
        <motion.span animate={isOpen ? { rotate: 180 } : { rotate: 0 }}>
          <ChevronDown />
        </motion.span>
      </button>
      {isOpen && (
        <motion.ul
          className="pl-8 flex flex-col w-full h-full"
          exit={{ y: -100, opacity: 0 }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {item.items.map((it) => (
            <NavList baseUrl={item?.href ?? ""} item={it} />
          ))}
        </motion.ul>
      )}
    </li>
  );
}

function NavList({ item, baseUrl = "" }: { baseUrl?: string; item: ListItem }) {
  const { pathname } = useLocation();
  console.log(baseUrl, "ITEM");

  return (
    <li key={item?.id} className="w-full relative cursor-pointer">
      {pathname === "/admin" + baseUrl + item?.href && (
        <motion.span
          layoutId="underline"
          className="absolute block bg-purple-600 left-0 inset-y-0 w-1"
        ></motion.span>
      )}
      <Link
        to={"/admin" + baseUrl + item?.href}
        className="text-base font-semibold w-full p-4 hover:bg-slate-300 flex gap-2 items-center transition-all justify-start"
      >
        <span className="text-xl">{item.icon}</span>
        {item.label}
      </Link>
    </li>
  );
}

const getNavItems = () => {
  return navItems.map((item) => {
    if (!item.isSection) return <NavList item={item} />;
    return <NavItemSection item={item} />;
  });
};

export function AdminLayout() {
  return (
    <div className="flex w-full min-h-[100dvh] max-h-[100dvh] overflow-y-hidden">
      <div className="h-[100dvh] w-[280px] bg-white dark:bg-slate-800 shadow-md border-r-[1px] overflow-y-auto">
        <h1 className="text-3xl font-bold p-4 h-[10%]">Lakoe</h1>
        <nav className="h-[90%]">
          <ul className="flex flex-col w-full h-full">
            {getNavItems()}
            <li className="w-full relative mt-auto cursor-pointer">
              <p className="text-base font-semibold w-full p-4 hover:bg-slate-300 flex gap-2 items-center transition-all justify-start">
                <span className="text-xl">
                  <BiLogOut />
                </span>
                Logout
              </p>
            </li>
          </ul>
        </nav>
      </div>
      <main className="!bg-slate-100 w-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
