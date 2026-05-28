"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import ReturnRequestModal from "./ReturnRequestModal"
import Link from "next/link"
import { ContactLink } from "@/components/ContactLink"

export type OrderDetailLineItem = {
  id: string
  name: string
  variant: string
  quantity: number
  unitPriceFormatted: string
  lineTotalFormatted: string
  image: string | null
}

export type OrderDetailViewModel = {
  id: string
  date: string
  price: string
  status: string
  customerName: string
  customerPhone: string
  customerEmail: string
  shippingAddress: string
  paymentMethodLabel: string
  paymentRef: string | null
  lineItems: OrderDetailLineItem[]
  subtotalFormatted: string
  discountFormatted: string | null
  couponCode: string | null
  taxFormatted: string
}

export default function OrderDetails({ order }: { order: OrderDetailViewModel }) {
  const [downloading, setDownloading] = useState(false)

  if (!order) return null

  const handleDownloadInvoice = async () => {
    setDownloading(true)
    try {
      const res = await fetch(`/api/orders/${order.id}/invoice`, {
        method: "GET",
        credentials: "include",
      })
      if (!res.ok) {
        toast.error(res.status === 401 ? "Please sign in again." : "Could not download invoice.")
        return
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `invoice-${order.id.slice(0, 8)}.html`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      toast.success("Invoice downloaded.")
    } catch {
      toast.error("Could not download invoice.")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6 text-white font-inter bg-black overflow-x-hidden">
      <h1 className="text-2xl font-semibold font-montserrat mb-8">Recent Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#141414] border border-zinc-900 rounded-xl p-6 md:p-10">
        <div className="space-y-4 md:col-span-1">
          <h2 className="text-lg font-medium font-montserrat text-zinc-300">Order Summary</h2>
          <div className="space-y-2 text-sm text-zinc-400">
            {order.lineItems.length === 0 ? (
              <div className="flex justify-between">
                <span>Items</span>
                <span className="text-white">—</span>
              </div>
            ) : (
              order.lineItems.map((line) => (
                <div key={line.id} className="flex justify-between gap-2">
                  <span className="min-w-0 truncate">
                    {line.name}
                    {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                  </span>
                  <span className="text-white shrink-0">{line.lineTotalFormatted}</span>
                </div>
              ))
            )}

            <div className="flex justify-between pt-2 border-t border-zinc-800">
              <span>Subtotal</span>
              <span className="text-white">{order.subtotalFormatted}</span>
            </div>

            {order.couponCode && order.discountFormatted && (
              <div className="flex justify-between">
                <span>Discount <span className="text-emerald-400 text-xs">({order.couponCode})</span></span>
                <span className="text-emerald-400">-{order.discountFormatted}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-500">Free</span>
            </div>

            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span className="text-white">{order.taxFormatted}</span>
            </div>

            <div className="flex justify-between pt-4 border-t border-zinc-800 text-lg font-bold text-white font-montserrat">
              <span>Total</span>
              <span>{order.price}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-center text-center space-y-4">
          <h2 className="text-lg font-medium font-montserrat text-zinc-300">Payment Method</h2>
          <p className="text-sm text-zinc-400">{order.paymentMethodLabel}</p>
          {order.paymentRef ? (
            <p className="text-[11px] text-zinc-500 font-mono break-all max-w-full px-2">
              Ref: {order.paymentRef}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col items-end text-right space-y-3">
          <h2 className="text-lg font-medium font-montserrat text-zinc-300">Shipping address</h2>
          <div className="space-y-1 max-w-[280px]">
            <p className="font-bold text-white">{order.customerName}</p>
            {order.customerPhone ? (
              <ContactLink
                type="phone"
                value={order.customerPhone}
                className="block text-xs text-zinc-400"
              />
            ) : null}
            {order.customerEmail ? (
              <ContactLink
                type="email"
                value={order.customerEmail}
                className="block text-xs text-zinc-500 break-all"
              />
            ) : null}
            <p className="text-xs text-zinc-500 leading-relaxed">{order.shippingAddress}</p>
          </div>
          <Link
            href={`/orders/${order.id}/tracking`}
            className="bg-black text-white px-4 py-2 rounded-xl"
          >
            Track Order
          </Link>
        </div>
      </div>

      <div className="bg-[#141414] border border-zinc-900 rounded-xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-zinc-800/50">
          <div className="flex flex-wrap gap-6 md:gap-16">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Order ID</p>
              <p className="text-sm font-medium break-all">{order.id}</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Date</p>
              <p className="text-sm font-medium">{order.date}</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Total</p>
              <p className="text-sm font-medium">{order.price}</p>
            </div>
          </div>

          <span className="bg-[#DCFCE7] text-[#06C31F] border border-green-500/20 px-4 py-1 rounded-full text-[10px] font-bold shrink-0">
            {order.status}
          </span>
        </div>

        <div className="divide-y divide-zinc-800/50">
          {order.lineItems.length === 0 ? (
            <div className="p-6 text-sm text-zinc-500">
              Line items for this order are not available.
            </div>
          ) : (
            order.lineItems.map((line) => (
              <div
                key={line.id}
                className="p-6 flex flex-col md:flex-row justify-between items-center gap-6"
              >
                <div className="flex items-center gap-6 w-full">
                  <div className="w-24 h-24 bg-[#181818] border border-zinc-800 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {line.image ? (
                      <img src={line.image} alt={line.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-12 h-16 bg-zinc-800 rounded opacity-40 shadow-2xl rotate-6" />
                    )}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <h3 className="text-lg font-semibold font-montserrat truncate tracking-wide">
                      {line.name}
                    </h3>

                    <p className="text-xs text-zinc-500 uppercase tracking-tighter">{line.variant}</p>

                    <p className="text-xs text-zinc-500">
                      Qty: {line.quantity} · {line.unitPriceFormatted} each · {line.lineTotalFormatted}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 flex flex-col sm:flex-row gap-4 justify-end border-t border-zinc-800/50">
          <ReturnRequestModal disabled={order.status.toLowerCase() !== "delivered"} />
          <button
            type="button"
            disabled={downloading}
            onClick={handleDownloadInvoice}
            className="flex-1 sm:flex-none bg-[#FFB800] hover:bg-[#e6a600] disabled:opacity-60 text-black px-8 py-3 rounded-md text-[11px] font-bold uppercase tracking-widest transition-all"
          >
            {downloading ? "Downloading…" : "Download Invoice"}
          </button>
        </div>
      </div>
    </div>
  )
}
