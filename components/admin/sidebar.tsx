"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Box,
  List,
  File,
  FileText,
  User,
  MessageSquare,
  Settings,
  Code,
  Feather,
  Video,
  BriefcaseBusiness,
  ShoppingCart,
  IndianRupee,
  BookOpen,
  MapPin,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutGrid },
    { label: "Products", href: "/admin/product", icon: Box },
      { label: "Orders", href: "/admin/order", icon: FileText },
       { label: "Users", href: "/admin/users", icon: User },
        { label: "Reviews", href: "/admin/reviews", icon: MessageSquare },
          { label: "Payments", href: "/admin/payment", icon: IndianRupee },
  { label: "Categories", href: "/admin/category", icon: List },
  { label: "Blogs", href: "/admin/blog", icon: File },
  { label: "Catalogue", href: "/admin/catalogue", icon: BookOpen },
  { label: "Stores", href: "/admin/stores", icon: MapPin },
  { label: "Videos", href: "/admin/videos", icon: Video },
  { label: "Applications", href: "/admin/applications", icon: BriefcaseBusiness },

  // {
  //   label: "Featured Products",
  //   href: "/admin/featured-products",
  //   icon: ShoppingCart,
  // },
  // {
  //   label: "Featured Categories",
  //   href: "/admin/featured-categories",
  //   icon: Feather,
  // },
  { label: "Coupons", href: "/admin/coupons", icon: Code },
  // { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const signOutAdmin = async () => {
    await fetch("/api/admin/access", { method: "DELETE" });
    router.replace("/admin/gate");
    router.refresh();
  };

  // normalize path (remove trailing slash)
  const currentPath = pathname.replace(/\/$/, "");

  return (
    <aside className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 p-6 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
        <p className="text-sm text-zinc-400">Manage your account details</p>
      </div>

      {/* Navigation */}
      <nav className="h-[calc(78vh-3rem)] space-y-3 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          let active = false;
          if (href === "/admin") {
            active = currentPath === "/admin";
          } else {
            active = currentPath === href || currentPath.startsWith(`${href}/`);
          }

          return (
            <Link key={href} href={href}>
              <SidebarItem
                icon={<Icon size={24} className="text-yellow-400" />}
                label={label}
                active={active}
              />
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => void signOutAdmin()}
        className="mt-4 w-full rounded-lg border border-red-500/50 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/20 hover:text-red-300 cursor-pointer font-medium"
      >
        Sign out of admin
      </button>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
        active
          ? "bg-yellow-500/20 text-yellow-400 font-semibold border-l-4 border-yellow-400"
          : "hover:bg-zinc-900 text-zinc-400 hover:text-white"
      }`}
    >
      <span className={active ? "opacity-100" : "opacity-70"}>{icon}</span>
      <span className="text-base">{label}</span>
    </div>
  );
}
