"use client"
import React from 'react'
import { useCart } from '@/context/CartContext'

const CheckoutSummary = () => {
  const { cartItems } = useCart()

  const subtotal = cartItems.reduce((s, item) => s + (item.price ?? 0) * item.quantity, 0)
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst

  return (
    <div className="bg-[#0A0A0A] border border-zinc-900 rounded-lg p-8">
      <h2 className="text-white text-lg font-medium mb-8">Summary</h2>
      
      <div className="space-y-6">
        {/* Product Line Items */}
        <div className="space-y-4">
          {cartItems.map((item, i) => (
            <div key={i} className="flex justify-between items-start gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {item.image && (
                  <div className="w-10 h-10 bg-zinc-900 rounded overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name ?? "Product"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <span className="text-zinc-500 text-sm font-light leading-snug truncate">
                  {item.name ?? item.slug} {item.quantity > 1 && `×${item.quantity}`}
                </span>
              </div>
              <span className="text-zinc-300 text-sm font-medium text-nowrap">
                ₹{((item.price ?? 0) * item.quantity).toLocaleString("en-IN")}
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