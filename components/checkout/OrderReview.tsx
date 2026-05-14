"use client"
import React, { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { initiateRazorpayPayment } from '@/lib/razorpay'
import { toast } from 'sonner'
import { ShoppingBag } from 'lucide-react'

const OrderReview = ({ shippingData }: { shippingData?: any }) => {
  const { cartItems, clearCart } = useCart()
  const router = useRouter()
  const [paying, setPaying] = useState(false)

  const subtotal = cartItems.reduce((s, item) => s + (item.price ?? 0) * item.quantity, 0)
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    setPaying(true)
    try {
      const items = cartItems.map((item) => ({
        productId: item.productId ?? item.slug,
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
        description: `Order of ${cartItems.length} item(s)`,
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
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <ShoppingBag size={36} className="text-zinc-700 mb-3" />
            <p className="text-zinc-500 text-sm">No items in cart</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.slug} className="flex items-center gap-6">
              <div className="w-16 h-16 bg-zinc-900 rounded overflow-hidden shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name ?? "Product"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-700">
                    <ShoppingBag size={20} />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-white text-sm font-medium">{item.name ?? item.slug}</h4>
                <p className="text-zinc-500 text-xs font-light mt-1">
                  {item.sku ? `SKU: ${item.sku}` : ""} × {item.quantity}
                </p>
              </div>
              <div className="text-white text-sm font-medium">
                ₹{((item.price ?? 0) * item.quantity).toLocaleString("en-IN")}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Totals */}
      <div className="space-y-2 mb-8">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Subtotal</span>
          <span className="text-zinc-300">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">GST (18%)</span>
          <span className="text-zinc-300">₹{gst.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-zinc-900">
          <span className="text-zinc-400 text-sm">Total (incl. GST)</span>
          <span className="text-white text-lg font-semibold">₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={paying || cartItems.length === 0}
        className="w-full font-montserrat bg-[#FFB800] hover:bg-[#E6A600] text-black font-bold py-4 rounded-md transition-all uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {paying ? "Processing..." : "Continue to Checkout"}
      </button>
    </div>
  )
}

export default OrderReview