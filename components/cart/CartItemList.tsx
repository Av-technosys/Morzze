"use client"
import React from 'react'
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

const CartItemList = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart()

  // Resolve full product data for each cart item
  const resolvedItems = cartItems
    .map((cartItem) => {
      const productData = products.find((p) => p.slug === cartItem.slug)
      if (!productData) return null
      return { ...productData, quantity: cartItem.quantity }
    })
    .filter(Boolean) as (typeof products[number] & { quantity: number })[]

  if (resolvedItems.length === 0) {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingBag size={48} className="text-zinc-700 mb-4" />
          <p className="text-zinc-500 text-sm mb-6 font-inter">Your cart is empty</p>
          <Link
            href="/products"
            className="bg-[#FFB800] hover:bg-[#E6A600] text-black font-bold py-3 px-8 rounded-md text-sm transition-all font-inter"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  const parsePrice = (price: string) => {
    return parseInt(price.replace(/,/g, ""), 10) || 0
  }

  return (
    <div className="w-full">
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:block">
        <div className="grid grid-cols-12 pb-4 border-b font-montserrat border-zinc-800 text-[11px] font-bold tracking-[0.2em] text-[#FFFFFF] uppercase">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        {resolvedItems.map((item) => {
          const unitPrice = parsePrice(item.price)
          const totalPrice = unitPrice * item.quantity

          return (
            <div key={item.slug} className="grid grid-cols-12 py-8 border-b border-zinc-900 items-center group">
              <div className="col-span-6 flex gap-6">
                <Link href={`/products/${item.slug}`} className="w-24 h-24 bg-zinc-900 rounded-md overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex flex-col justify-center">
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="text-white text-sm font-medium mb-1 font-montserrat hover:text-zinc-300 transition-colors">{item.name}</h3>
                  </Link>
                  <p className="text-zinc-500 text-xs font-light">{item.category}</p>
                </div>
              </div>
              <div className="col-span-2 flex justify-center">
                <div className="flex items-center px-3 py-1 gap-4">
                  <button
                    onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-white text-sm w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div className="col-span-2 text-center text-zinc-300 text-sm font-light text-nowrap">
                ₹{unitPrice.toLocaleString("en-IN")}
              </div>
              <div className="col-span-2 text-right">
                <div className="flex items-center justify-end gap-4 mb-2">
                  <span className="text-white text-sm font-medium">₹{totalPrice.toLocaleString("en-IN")}</span>
                  <button
                    onClick={() => removeFromCart(item.slug)}
                    className="text-red-500/80 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="md:hidden flex flex-col gap-6 py-4">
        <h2 className="text-white text-lg font-medium font-montserrat mb-2">Your Cart</h2>

        {resolvedItems.map((item) => {
          const unitPrice = parsePrice(item.price)

          return (
            <div key={item.slug} className="flex gap-4 items-start relative">
              {/* Product Image */}
              <Link href={`/products/${item.slug}`} className="w-32 h-32 bg-zinc-900 rounded-lg overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>

              {/* Details */}
              <div className="flex-1 pt-1">
                <Link href={`/products/${item.slug}`}>
                  <h3 className="text-white text-[15px] font-medium leading-tight mb-1">{item.name}</h3>
                </Link>
                <p className="text-zinc-500 text-xs mb-6">{item.category}</p>

                <div className="mt-auto">
                  <span className="text-white text-lg font-medium block">₹{unitPrice.toLocaleString("en-IN")}</span>
                  <span className="text-zinc-500 text-xs mt-1 block font-light">Quantity: {item.quantity}x</span>
                </div>
              </div>

              {/* Vertical Quantity Selector */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-[#141414] rounded-full text-zinc-400"
                >
                  <Plus size={14} />
                </button>
                <div className="w-8 h-14 flex items-center justify-center bg-[#141414] rounded-full text-white text-sm font-medium">
                  {item.quantity}
                </div>
                <button
                  onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center bg-[#141414] rounded-full text-zinc-400"
                >
                  <Minus size={14} />
                </button>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeFromCart(item.slug)}
                className="absolute -top-1 -right-1 p-1 text-red-500/50 hover:text-red-500 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CartItemList