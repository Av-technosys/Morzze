"use client"
import React, { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { products } from '@/data/products'
import { initiateRazorpayPayment } from '@/lib/razorpay'
import { toast } from 'sonner'

const OrderReview = ({ shippingData }: { shippingData?: any }) => {
  const { cartItems, clearCart } = useCart()
  const router = useRouter()
  const [paying, setPaying] = useState(false)

  const parsePrice = (price: string) => parseInt(price.replace(/,/g, ""), 10) || 0

  const resolvedItems = cartItems
    .map((ci) => {
      const p = products.find((prod) => prod.slug === ci.slug)
      if (!p) return null
      return { ...p, quantity: ci.quantity, unitPrice: parsePrice(p.price) }
    })
    .filter(Boolean) as any[]

  const subtotal = resolvedItems.reduce((s: number, i: any) => s + i.unitPrice * i.quantity, 0)
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst

  const handlePayment = async () => {
    if (resolvedItems.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    setPaying(true)
    try {
      const items = resolvedItems.map((item: any) => ({
        productId: item.id?.toString(),
        quantity: item.quantity,
        slug: item.slug,
        isTypeSubscription: false,
      }))

      const address = shippingData
        ? {
            street: shippingData.addressLine1 || "",
            locality: shippingData.addressLine2 || "",
            city: shippingData.city || "",
            state: shippingData.state || "",
            pincode: shippingData.pincode || "",
          }
        : {}

      await initiateRazorpayPayment({
        amount: total,
        name: "Morzze",
        description: `Order of ${resolvedItems.length} item(s)`,
        items,
        address,
      })

      // Payment successful — clear cart and redirect
      clearCart()
      toast.success("Payment successful! Order placed.")
      router.push("/dashboard/orders")
    } catch (error: any) {
      console.error("Payment error:", error)
      toast.error(error?.description || error?.message || "Payment failed. Please try again.")
    } finally {
      setPaying(false)
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-white text-2xl font-medium mb-8 font-montserrat">Order Review</h2>

      <div className="space-y-4 mb-10">
        {/* Contact Info Box */}
        <div className="bg-[#0F0F0F] border border-zinc-900 p-6 rounded-md font-inter">
          <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-2 font-inter">Contact</p>
          <p className="text-zinc-300 text-sm font-light">
            {shippingData
              ? `${shippingData.fullName} — ${shippingData.phone}`
              : "—"
            }
          </p>
        </div>

        {/* Shipping Address Box */}
        <div className="bg-[#0F0F0F] border border-zinc-900 p-6 rounded-md">
          <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-2 font-inter">Ship To</p>
          <p className="text-zinc-300 text-sm font-light leading-relaxed">
            {shippingData
              ? [shippingData.addressLine1, shippingData.addressLine2, shippingData.city, shippingData.state, shippingData.pincode]
                .filter(Boolean)
                .join(", ")
              : "—"
            }
          </p>
        </div>
      </div>

      {/* Product List Section */}
      <div className="border-b border-zinc-900 pb-8 mb-8 space-y-6">
        {resolvedItems.map((item: any) => (
          <div key={item.slug} className="flex items-center gap-6">
            <div className="w-16 h-16 bg-zinc-900 rounded overflow-hidden shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="text-white text-sm font-medium">{item.name}</h4>
              <p className="text-zinc-500 text-xs font-light mt-1">{item.category} × {item.quantity}</p>
            </div>
            <div className="text-white text-sm font-medium">
              ₹{(item.unitPrice * item.quantity).toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>

      {/* Total display */}
      <div className="flex justify-between items-center mb-8">
        <span className="text-zinc-400 text-sm">Total (incl. GST)</span>
        <span className="text-white text-lg font-semibold">₹{total.toLocaleString("en-IN")}</span>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={paying || resolvedItems.length === 0}
        className="w-full font-montserrat bg-[#FFB800] hover:bg-[#E6A600] text-black font-bold py-4 rounded-md transition-all uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {paying ? "Processing..." : "Continue to Checkout"}
      </button>
    </div>
  )
}

export default OrderReview