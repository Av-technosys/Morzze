"use client"
import React, { useMemo } from 'react'
import { useCart } from '@/context/CartContext'

/**
 * Parse a rupee string like "₹1,000" or "₹15000" into a number.
 * Returns 0 if parsing fails or input is empty/null.
 */
const parseRupeeValue = (value: string | null | undefined): number => {
  if (!value) return 0
  const cleaned = value.replace(/[₹,\s]/g, '')
  const num = parseFloat(cleaned)
  return Number.isFinite(num) ? num : 0
}

const CheckoutSummary = () => {
  const { cartItems, appliedCoupon } = useCart()

  const subtotal = useMemo(
    () => cartItems.reduce((s, item) => s + (item.price ?? 0) * item.quantity, 0),
    [cartItems]
  )

  /**
   * Calculate discount amount.
   * discountValue from admin is always a percentage number (e.g. "25" means 25%).
   * upto is the maximum cap (e.g. "₹1000").
   */
  const calculateDiscount = (
    base: number,
    discountValue: string,
    upto?: string | null
  ): number => {
    const normalized = discountValue.trim()
    if (!normalized) return 0

    const percent = parseFloat(normalized.replace("%", ""))
    if (!Number.isFinite(percent) || percent <= 0) return 0

    let discount = Math.round((base * percent) / 100)

    // Cap at upto value if provided
    const maxDiscount = parseRupeeValue(upto)
    if (maxDiscount > 0 && discount > maxDiscount) {
      discount = maxDiscount
    }

    return discount
  }

  // Check minimum order requirement
  const minimumOrderValue = parseRupeeValue(appliedCoupon?.minimumOrder)
  const meetsMinimumOrder = !minimumOrderValue || subtotal >= minimumOrderValue

  // Discount applies only to subtotal (product amount, ignoring GST)
  const discountAmount = appliedCoupon && meetsMinimumOrder
    ? calculateDiscount(subtotal, appliedCoupon.discountValue, appliedCoupon.upto)
    : 0

  const discountPercent = appliedCoupon
    ? parseFloat(appliedCoupon.discountValue.replace("%", ""))
    : 0

  const discountedSubtotal = subtotal - discountAmount
  const gst = Math.round(discountedSubtotal * 0.18)
  const total = Math.max(discountedSubtotal + gst, 0)

  return (
    <div className="bg-[#0A0A0A] border border-zinc-900 rounded-lg p-8 text-white">
      <h2 className="text-white text-lg font-medium mb-8">Summary</h2>
      
      <div className="space-y-6">
        {/* Product Line Items */}
        

        <div className="space-y-3 border-t border-zinc-900">
          <div className="flex justify-between text-sm">
            <span className=" font-light">Subtotal</span>
            <span className="text-white">₹{subtotal.toLocaleString("en-IN")}</span>
          </div>

          {appliedCoupon && discountAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className=" font-light">
                Discount&nbsp;
                <span className="text-emerald-400 font-semibold">
                  ({Number.isFinite(discountPercent) && discountPercent > 0
                    ? `${discountPercent}%`
                    : appliedCoupon.discountValue})
                </span>
                &nbsp;· {appliedCoupon.code}
              </span>
              <span className="text-emerald-400">-₹{discountAmount.toLocaleString("en-IN")}</span>
            </div>
          )}

          {appliedCoupon && !meetsMinimumOrder && (
            <div className="text-xs text-amber-400 bg-amber-400/10 rounded px-3 py-2">
              Coupon requires minimum order of ₹{minimumOrderValue.toLocaleString("en-IN")}.
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className=" font-light">Shipping</span>
            <span className="text-green-500 uppercase text-xs font-bold tracking-widest">Free</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className=" font-light">GST (18%)</span>
            <span className="text-white">₹{gst.toLocaleString("en-IN")}</span>
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