import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useLocation, Link } from "react-router-dom";

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

export type NavItem = ListItem | SectionItem;

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
          layoutId={item?.isSection ? "underlineSection" : "underline"}
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
      <AnimatePresence mode="popLayout">
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
      </AnimatePresence>
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

const getNavItems = (navItems: NavItem[]) => {
  return navItems.map((item) => {
    if (!item.isSection) return <NavList item={item} />;
    return <NavItemSection item={item} />;
  });
};

export function Sidebar({ navItems }: { navItems: NavItem[] }) {
  return (
    <div className="h-[100dvh] w-[280px] bg-white dark:bg-slate-800 shadow-md border-r-[1px] overflow-y-auto">
      <div className="p-4 flex gap-2 items-center mb-2">
        <img src="/assets/lakoe.png" className="w-8" alt="Lakoe Logo" />
        <h1 className="text-2xl font-bold h-[10%]">Lakoe</h1>
      </div>
      <nav className="h-[90%]">
        <ul className="flex flex-col w-full h-full">
          {getNavItems(navItems)}
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
  );
}
