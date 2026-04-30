"use client"
import React from 'react'
import { ArrowRight } from 'lucide-react'

const OrderSummary = () => {
  return (
    <div className="bg-[#141414] border border-[#454545] rounded-md p-8 sticky top-24 font-montserrat">
      <h2 className="text-white text-xl font-medium mb-8">Order Summary</h2>
      
      <div className="space-y-4 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500 font-light">Subtotal</span>
          <span className="text-zinc-300">₹23,600</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500 font-light">Shipping</span>
          <span className="text-green-500 uppercase text-xs font-bold tracking-widest">Free</span>
        </div>
        <div className="flex justify-between text-sm border-b pb-4  ">
          <span className="text-zinc-500 font-light">GST (18%)</span>
          <span className="text-zinc-300">₹4,248</span>
        </div>
      </div>

      <div className="border-t border-zinc-900  mb-5">
        <div className="flex justify-between items-center">
          <span className="text-white font-medium">Total</span>
          <span className="text-white text-xl font-semibold">₹27,848</span>
        </div>
      </div>

      {/* Promo Code Section */}
      <div className="mb-8">
        <label className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-3 block">
          Promo Code
        </label>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Enter Code"
            className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A88B4A] transition-colors"
          />
          <button className="border border-[#A88B4A] text-[#A88B4A] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#A88B4A] hover:text-black transition-all">
            Apply
          </button>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-[#FFB800] hover:bg-[#E6A600] text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all group">
        Proceed to Checkout
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  )
}

export default OrderSummary