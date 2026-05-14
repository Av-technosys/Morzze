import Link from "next/link"
import React from "react"

export type RecentOrderItem = {
  id: string
  date: string
  price: string
  status: string
  name: string
  detail: string
  image: string | null
}

type RecentOrdersProps = {
  orders?: RecentOrderItem[]
}

export function RecentOrders({ orders = [] }: RecentOrdersProps) {
  return (
    <div className="bg-[#0F0F0F] border border-zinc-900 rounded-2xl p-5 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-lg font-medium">Recent Orders</h2>
        <Link
          href="/dashboard/order"
          className="text-[10px] text-[#FFB800] uppercase tracking-widest font-bold hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-zinc-500 text-sm">No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="border border-zinc-900 rounded-xl p-5 bg-[#141414]/50 relative"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-wider">
                    <span className="truncate max-w-[140px] sm:max-w-none">{order.id}</span>
                    <span className="text-zinc-800 shrink-0">|</span>
                    <span className="shrink-0">{order.date}</span>
                  </div>
                  <div className="text-white text-lg font-semibold mt-1">{order.price}</div>
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[9px] font-medium lowercase shrink-0">
                  {order.status}
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="w-20 h-20 bg-zinc-900 rounded-lg overflow-hidden shrink-0 border border-zinc-800/50">
                  {order.image ? (
                    <img
                      src={order.image}
                      alt=""
                      className="w-full h-full object-cover opacity-90"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 opacity-60" />
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between min-h-[80px] py-1 min-w-0">
                  <div>
                    <h4 className="text-white text-[13px] font-medium leading-tight">{order.name}</h4>
                    <p className="text-zinc-600 text-[11px] mt-1 font-light">{order.detail}</p>
                  </div>
                  <Link
                    href={`/dashboard/order/${order.id}`}
                    className="self-end text-[#FFB800] text-[10px] font-bold uppercase tracking-widest hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
