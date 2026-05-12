"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  IconLayoutDashboard, IconUser, IconShoppingBag, 
  IconAddressBook, IconHeart, IconStar, 
  IconBell, IconLogout, IconChevronRight 
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { logout } from "@/helper"
import { getProfile } from "@/helper/user/action"
import { toast } from "sonner"

const navItems = [
  { title: "Dashboard", icon: IconLayoutDashboard, href: "/dashboard" },
  { title: "Profile Settings", icon: IconUser, href: "/dashboard/profile" },
  { title: "My Orders", icon: IconShoppingBag, href: "/dashboard/order" },
  { title: "Address Book", icon: IconAddressBook, href: "/dashboard/address" },
  { title: "Wishlist", icon: IconHeart, href: "/dashboard/wishlist" },
  { title: "Reviews & Ratings", icon: IconStar, href: "/dashboard/review-rating" },
  { title: "Notifications", icon: IconBell, href: "/dashboard/notification" },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = React.useState(false)
  const [user, setUser] = React.useState<{ fullName: string; email: string } | null>(null)

  React.useEffect(() => {
    getProfile()
      .then((data) => {
        setUser({ fullName: data.fullName ?? "", email: data.email ?? "" })
      })
      .catch(() => {
        setUser(null)
      })
  }, [])

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)

    const toastId = toast.loading("Signing out...")

    try {
      await logout()
      toast.success("Signed out successfully", { id: toastId })
      router.push("/login")
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out", { id: toastId })
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <aside className="w-full lg:w-[280px] flex flex-col gap-4 p-4 lg:h-screen lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-r border-zinc-900 bg-[#0A0A0A]">
      
      {/* Profile Section - Centered Like Image */}
      <div className="bg-[#141414] rounded-xl p-6 text-center border border-zinc-900 shadow-sm">
        <div className="w-14 h-14 bg-zinc-800 rounded-full mx-auto mb-3 flex items-center justify-center border border-zinc-700/50">
          <IconUser className="text-[#FFB800]" size={28} />
        </div>
        {user ? (
          <>
            <h3 className="text-white font-medium text-sm">{user.fullName || "User"}</h3>
            <p className="text-zinc-500 text-[11px] mt-0.5">{user.email}</p>
          </>
        ) : (
          <>
            <div className="h-4 w-24 bg-zinc-800 rounded mx-auto animate-pulse" />
            <div className="h-3 w-36 bg-zinc-800 rounded mx-auto mt-1.5 animate-pulse" />
          </>
        )}
      </div>

      {/* Navigation - Vertical List Style */}
      <nav className="flex-1">
        <div className="bg-[#141414] lg:bg-transparent rounded-xl lg:rounded-none border lg:border-0 border-zinc-900 overflow-hidden space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "w-full flex items-center justify-between px-4 md:py-2.5 py-3.5 transition-all group border-b lg:border-b-0 border-zinc-900/50 last:border-0",
                  isActive 
                    ? "bg-[#FFB800]/10 text-[#FFB800] lg:border lg:border-[#FFB800]/20 lg:rounded-lg" 
                    : "text-zinc-400 hover:text-white lg:hover:bg-zinc-900 lg:rounded-lg"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon 
                    size={19} 
                    className={cn("transition-colors", isActive ? "text-[#FFB800]" : "text-zinc-500 group-hover:text-zinc-300")} 
                  />
                  <span className="text-[13px] font-medium">{item.title}</span>
                </div>
                <IconChevronRight 
                  size={14} 
                  className={cn("opacity-30 transition-transform group-hover:translate-x-0.5", isActive && "opacity-100")} 
                />
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Sign Out - Bottom Section */}
      <div className="mt-auto pt-4 lg:border-t lg:border-zinc-900">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/5 rounded-lg transition-all group disabled:opacity-50"
        >
          <IconLogout size={19} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[13px] font-medium">{loggingOut ? "Signing Out..." : "Sign Out"}</span>
        </button>
      </div>
    </aside>
  )
}