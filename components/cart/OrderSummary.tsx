"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
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

const OrderSummary = () => {
  const { cartItems, appliedCoupon, setAppliedCoupon, clearCoupon } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isApplying, setIsApplying] = useState(false)

  // Subtotal = sum of (basePrice × quantity) — no GST
  const subtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const unitPrice = item.price ?? 0
        return sum + unitPrice * item.quantity
      }, 0),
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

    // discountValue is always a percentage from the admin form
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

  // Check minimum order and calculate discount
  const minimumOrderValue = parseRupeeValue(appliedCoupon?.minimumOrder)
  const meetsMinimumOrder = !minimumOrderValue || subtotal >= minimumOrderValue

  // Discount applies ONLY to subtotal (ignores GST)
  const discountAmount = appliedCoupon && meetsMinimumOrder
    ? calculateDiscount(subtotal, appliedCoupon.discountValue, appliedCoupon.upto)
    : 0

  const discountedSubtotal = subtotal - discountAmount
  const gst = Math.round(discountedSubtotal * 0.18)
  const total = Math.max(discountedSubtotal + gst, 0)

  // Derive the display label for the discount
  const discountPercent = appliedCoupon
    ? parseFloat(appliedCoupon.discountValue.replace("%", ""))
    : 0

  useEffect(() => {
    if (!appliedCoupon) return

    // Check minimum order
    if (minimumOrderValue > 0 && subtotal < minimumOrderValue) {
      setMessage({
        type: 'error',
        text: `Minimum order of ₹${minimumOrderValue.toLocaleString("en-IN")} required. Add ₹${(minimumOrderValue - subtotal).toLocaleString("en-IN")} more.`
      })
      return
    }

    const amount = calculateDiscount(subtotal, appliedCoupon.discountValue, appliedCoupon.upto)
    if (amount <= 0) {
      setMessage({ type: 'error', text: 'Coupon is not valid for this cart.' })
      clearCoupon()
    } else {
      // Clear any stale min-order error
      setMessage(null)
    }
  }, [appliedCoupon, subtotal])

  const handleApplyCoupon = async () => {
    const value = couponCode.trim().toUpperCase()
    if (!value) {
      setMessage({ type: 'error', text: 'Please enter a promo code.' })
      return
    }

    setIsApplying(true)
    setMessage(null)

    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: value }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setMessage({ type: 'error', text: data.message || 'Invalid coupon code.' })
        clearCoupon()
        return
      }

      const coupon = data.coupon

      // Check minimum order value before applying
      const minOrder = parseRupeeValue(coupon.minimumOrder)
      if (minOrder > 0 && subtotal < minOrder) {
        setMessage({
          type: 'error',
          text: `Minimum order of ₹${minOrder.toLocaleString("en-IN")} required to use this coupon.`
        })
        clearCoupon()
        return
      }

      setAppliedCoupon({
        code: coupon.couponCode,
        discountValue: coupon.discountValue,
        title: coupon.title,
        upto: coupon.upto,
        minimumOrder: coupon.minimumOrder,
      })

      const percent = parseFloat(coupon.discountValue.replace("%", ""))
      const uptoVal = parseRupeeValue(coupon.upto)
      const label = Number.isFinite(percent) && percent > 0
        ? `${percent}% off${uptoVal > 0 ? ` (upto ₹${uptoVal.toLocaleString("en-IN")})` : ''}`
        : `₹${coupon.discountValue} off`

      setMessage({ type: 'success', text: `Coupon applied: ${label}` })
      toast.success('Coupon applied successfully')
    } catch {
      setMessage({ type: 'error', text: 'Unable to apply coupon. Please try again.' })
      clearCoupon()
    } finally {
      setIsApplying(false)
    }
  }

  const handleRemoveCoupon = () => {
    clearCoupon()
    setCouponCode("")
    setMessage({ type: 'success', text: 'Coupon removed.' })
  }

  return (
    <div className="bg-[#141414] border border-[#454545] rounded-md p-8 sticky top-24 font-montserrat">
      <h2 className="text-white text-xl font-medium mb-8">Order Summary</h2>

      <div className="space-y-4 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500 font-light">Subtotal</span>
          <span className="text-zinc-300">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>

        {appliedCoupon && discountAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-light">
              Discount&nbsp;
              · {appliedCoupon.code}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400">-₹{discountAmount.toLocaleString("en-IN")}</span>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {appliedCoupon && !meetsMinimumOrder && (
          <div className="text-xs text-amber-400 bg-amber-400/10 rounded px-3 py-2">
            Minimum order ₹{minimumOrderValue.toLocaleString("en-IN")} required.
            Add ₹{(minimumOrderValue - subtotal).toLocaleString("en-IN")} more to apply this coupon.
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-zinc-500 font-light">Shipping</span>
          <span className="text-green-500 uppercase text-xs font-bold tracking-widest">Free</span>
        </div>
        <div className="flex justify-between text-sm border-b pb-4">
          <span className="text-zinc-500 font-light">GST (18%)</span>
          <span className="text-zinc-300">₹{gst.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="border-t border-zinc-900 mb-5">
        <div className="flex justify-between items-center pt-4">
          <span className="text-white font-medium">Total</span>
          <span className="text-white text-xl font-semibold">₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="mb-8">
        <label className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-3 block">
          Have coupon 
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter Code"
            className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A88B4A] transition-colors"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={isApplying || cartItems.length === 0}
            className="border border-[#A88B4A] text-[#A88B4A] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#A88B4A] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isApplying ? 'Applying' : 'Apply'}
          </button>
        </div>
        {message && (
          <p className={`mt-3 text-sm ${message.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
            {message.text}
          </p>
        )}
      </div>

      <Link href={"/checkout"}>
        <button
          disabled={cartItems.length === 0}
          className="w-full bg-[#FFB800] hover:bg-[#E6A600] text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Checkout
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </Link>
    </div>
  )
}

export default OrderSummary