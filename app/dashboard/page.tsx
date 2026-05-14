import { AddressCard } from "@/components/dashboard/AddressCard"
import {
  RecentOrders,
  type RecentOrderItem,
} from "@/components/dashboard/RecentOrders"
import { IconHeart, IconStar, IconMapPin, IconPackage } from "@tabler/icons-react"
import { getAddresses } from "@/helper/user/action"
import { getWishlistDB } from "@/helper/wishlist/action"
import { getOrdersByUserId } from "@/helper/order/action"
import { getUserAllReviews } from "@/helper/review/action"

/** Always read fresh counts for the signed-in user (addresses, orders, wishlist, reviews). */
export const dynamic = "force-dynamic"

function formatINR(amount: number | null | undefined) {
  if (amount == null) return "—"
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatStatus(status: string | null | undefined) {
  if (!status) return "—"
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
}

function mapOrderToRecentItem(o: NonNullable<Awaited<ReturnType<typeof getOrdersByUserId>>>[number]): RecentOrderItem {
  const items = o.order_items ?? []
  const first = items[0]
  const totalQty = items.reduce((s, i) => s + (i.quantity ?? 0), 0)
  const productLabel = (first?.productName ?? "Order").trim() || "Order"
  const name = items.length > 1 ? `${productLabel} +${items.length - 1} more` : productLabel
  const variant = first?.productVarientBox?.trim() || "—"
  const qty = totalQty > 0 ? totalQty : (first?.quantity ?? 1)

  return {
    id: o.id,
    date: o.createdAt
      ? new Date(o.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—",
    price: formatINR(o.totalAmount ?? undefined),
    status: formatStatus(o.status ?? undefined),
    name,
    detail: `${variant} | Qty: ${qty}`,
    image: first?.productImage ?? null,
  }
}

async function getDashboardStats() {
  const [addressRes, wishlistRes, ordersRes, reviewsRes] = await Promise.allSettled([
    getAddresses(),
    getWishlistDB(),
    getOrdersByUserId(),
    getUserAllReviews(),
  ])

  const ordersList =
    ordersRes.status === "fulfilled" ? (ordersRes.value ?? []) : []
  const recentOrders: RecentOrderItem[] = ordersList
    .slice(0, 6)
    .map(mapOrderToRecentItem)

  const reviewsList =
    reviewsRes.status === "fulfilled" ? (reviewsRes.value ?? []) : []

  return {
    addresses: addressRes.status === "fulfilled" ? addressRes.value.length : 0,
    wishlist: wishlistRes.status === "fulfilled" ? wishlistRes.value.length : 0,
    orders: ordersList.length,
    reviews: reviewsList.length,
    recentOrders,
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()
  const { recentOrders, ...statCounts } = stats

  const statCards = [
    { label: "Wishlist", icon: IconHeart, count: statCounts.wishlist, href: "/dashboard/wishlist" },
    { label: "Reviews", icon: IconStar, count: statCounts.reviews, href: "/dashboard/review-rating" },
    { label: "Addresses", icon: IconMapPin, count: statCounts.addresses, href: "/dashboard/address" },
    { label: "Orders", icon: IconPackage, count: statCounts.orders, href: "/dashboard/order" },
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
          <RecentOrders orders={recentOrders} />
        </div>

        {/* Right Side: Address (4 columns on desktop) */}
        <div className="lg:col-span-4">
          <AddressCard />
        </div>
      </div>
    </div>
  )
}