import {
  MdOutlineDashboard,
  MdOutlineDone,
  MdOutlinePending,
} from "react-icons/md";
import { Outlet } from "react-router-dom";
import { PiHandWithdrawBold } from "react-icons/pi";
import { IoAnalytics, IoSettingsOutline } from "react-icons/io5";
import { TiCancel } from "react-icons/ti";
import { DiTerminal } from "react-icons/di";
import Sidebar, { NavItem } from "@/components/sidebar/sidebar";
import { Helmet } from "react-helmet-async";

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
        href: "/on-process",
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

export function AdminLayout() {
  return (
    <div className="flex w-full min-h-[100dvh] max-h-[100dvh] overflow-y-hidden">
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <Sidebar navItems={navItems} />
      <main className="!bg-slate-100 w-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
