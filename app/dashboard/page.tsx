import { AddressCard } from "@/components/dashboard/AddressCard"
import { RecentOrders } from "@/components/dashboard/RecentOrders"
import { IconHeart, IconStar, IconMapPin, IconPackage } from "@tabler/icons-react"
import { getAddresses } from "@/helper/user/action"
import { getWishlistDB } from "@/helper/wishlist/action"
import { getOrdersByUserId } from "@/helper/order/action"

async function getDashboardStats() {
  const [addressRes, wishlistRes, ordersRes] = await Promise.allSettled([
    getAddresses(),
    getWishlistDB(),
    getOrdersByUserId(),
  ])

  return {
    addresses: addressRes.status === "fulfilled" ? addressRes.value.length : 0,
    wishlist: wishlistRes.status === "fulfilled" ? wishlistRes.value.length : 0,
    orders: ordersRes.status === "fulfilled" ? (ordersRes.value?.length ?? 0) : 0,
    reviews: 0, // no review system yet
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  const statCards = [
    { label: "Wishlist", icon: IconHeart, count: stats.wishlist, href: "/dashboard/wishlist" },
    { label: "Reviews", icon: IconStar, count: stats.reviews, href: "/dashboard/review-rating" },
    { label: "Addresses", icon: IconMapPin, count: stats.addresses, href: "/dashboard/address" },
    { label: "Orders", icon: IconPackage, count: stats.orders, href: "/dashboard/order" },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-white">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <a key={stat.label} href={stat.href} className="bg-[#0F0F0F] border border-zinc-900 p-5 rounded-xl flex flex-col justify-between h-[120px] hover:border-zinc-700 transition-colors group">
            <div className="flex justify-between">
              <stat.icon className="text-[#FFB800]" size={20} />
              <span className="text-zinc-800 group-hover:text-zinc-600 transition-colors">→</span>
            </div>
            <div>
              <div className="text-2xl text-white font-medium">{stat.count}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          </a>
        ))}
      </div>

      {/* Main Content: Orders and Address */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Recent Orders (8 columns on desktop) */}
        <div className="lg:col-span-8">
          <RecentOrders />
        </div>

        {/* Right Side: Address (4 columns on desktop) */}
        <div className="lg:col-span-4">
          <AddressCard />
        </div>
      </div>
    </div>
  )
}