"use client"
import React from 'react'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'

const CheckoutSummary = () => {
  const { cartItems } = useCart()

  const parsePrice = (price: string) => parseInt(price.replace(/,/g, ""), 10) || 0

  const resolvedItems = cartItems
    .map((ci) => {
      const p = products.find((prod) => prod.slug === ci.slug)
      if (!p) return null
      const unitPrice = parsePrice(p.price)
      return { name: p.name, quantity: ci.quantity, unitPrice, total: unitPrice * ci.quantity }
    })
    .filter(Boolean) as { name: string; quantity: number; unitPrice: number; total: number }[]

  const subtotal = resolvedItems.reduce((s, i) => s + i.total, 0)
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst

  return (
    <div className="bg-[#0A0A0A] border border-zinc-900 rounded-lg p-8">
      <h2 className="text-white text-lg font-medium mb-8">Summary</h2>
      
      <div className="space-y-6">
        {/* Product Line Items */}
        <div className="space-y-4">
          {resolvedItems.map((item, i) => (
            <div key={i} className="flex justify-between items-start gap-4">
              <span className="text-zinc-500 text-sm font-light leading-snug">
                {item.name} {item.quantity > 1 && `×${item.quantity}`}
              </span>
              <span className="text-zinc-300 text-sm font-medium text-nowrap">
                ₹{item.total.toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-6 border-t border-zinc-900">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-light">Subtotal</span>
            <span className="text-zinc-300">₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-light">Shipping</span>
            <span className="text-green-500 uppercase text-xs font-bold tracking-widest">Free</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-light">GST (18%)</span>
            <span className="text-zinc-300">₹{gst.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Grand Total */}
        <div className="flex justify-between items-center pt-6 border-t border-zinc-900">
          <span className="text-white font-medium">Total</span>
          <span className="text-white text-xl font-semibold tracking-tight">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary