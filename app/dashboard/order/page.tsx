"use client"
import { useRouter } from 'next/navigation'
import { orders } from '@/data/orders'
import React from 'react'



export default function MyOrdersPage() {
    const router = useRouter()
  return (
    <div className="w-full max-w-[90vw] overflow-x-hidden bg-black text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6 md:px-6">
        
        <h1 className="text-2xl md:text-3xl font-semibold font-montserrat mb-6">
          My Orders
        </h1>

        {/* Custom Tabs - Horizontal Scroll without breaking layout */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6">
          {["All", "Delivered", "Shipped", "Pending"].map((tab, idx) => (
            <button
              key={tab}
              className={`px-6 py-2 rounded-full border border-[#FFB800] text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                idx === 0 ? "bg-[#FFB800] text-black" : "text-[#FFB800]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Container */}
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <div 
              key={idx} 
              className="w-full bg-[#141414] border border-zinc-900 rounded-xl p-4 md:p-6 box-border"
            >
              {/* Row 1: ID, Date & Status */}
              <div className="flex justify-between items-start gap-2 mb-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[11px] md:text-sm text-zinc-400 font-inter font-medium">{order.id}</span>
                    <span className="text-[11px] md:text-sm text-zinc-600 font-inter">{order.date}</span>
                  </div>
                </div>
                <span className="bg-[#D1FAE5]/10 text-[#10B981] border border-[#10B981]/20 px-3 py-1 text-[10px] font-bold rounded-full whitespace-nowrap">
                  {order.status}
                </span>
              </div>

              {/* Row 2: Price */}
              <div className="mb-4">
                <span className="text-2xl md:text-3xl font-bold font-montserrat">
                  {order.price}
                </span>
              </div>

              {/* Row 3: Product Info */}
              <div className="flex gap-4 items-start">
                {/* Image Box */}
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#181818] border border-zinc-800 rounded-lg shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black opacity-50" />
                </div>

                {/* Info & View Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[80px] md:min-h-[96px]">
                  <div className="space-y-1">
                    <h4 className="text-sm md:text-lg font-semibold font-montserrat truncate tracking-wide uppercase">
                      {order.product}
                    </h4>
                    <p className="text-[11px] md:text-sm text-zinc-500 font-inter truncate uppercase">
                      {order.variant} | QTY: {order.qty}
                    </p>
                  </div>
                  
                  <div className="flex justify-end mt-auto">
                    <button onClick={() => router.push(`/dashboard/order/${order.id}`)} className="text-[#FFB800] text-[11px] md:text-sm font-bold font-inter hover:underline uppercase tracking-widest">
                      View Details
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}