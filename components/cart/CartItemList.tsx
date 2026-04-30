"use client"
import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react'

const CartItemList = () => {
  return (
    <div className="w-full">
      {/* --- DESKTOP VIEW (Isse nahi cheda) --- */}
      <div className="hidden md:grid grid-cols-12 pb-4 border-b font-montserrat border-zinc-800 text-[11px] font-bold tracking-[0.2em] text-[#FFFFFF] uppercase">
        <div className="col-span-6">Product</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-right">Total</div>
      </div>

      <div className="hidden md:grid grid-cols-12 py-8 border-b border-zinc-900 items-center group">
        <div className="col-span-6 flex gap-6">
          <div className="w-24 h-24 bg-zinc-900 rounded-md overflow-hidden shrink-0">
            <img src="/piecedemo1.png" alt="product" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-white text-sm font-medium mb-1 font-montserrat">Robe Hook Double</h3>
            <p className="text-zinc-500 text-xs font-light">Brushed Gold</p>
          </div>
        </div>
        <div className="col-span-2 flex justify-center">
          <div className="flex items-center px-3 py-1 gap-4">
            <button className="text-zinc-500 hover:text-white transition-colors"><Minus size={14} /></button>
            <span className="text-white text-sm w-4 text-center">2</span>
            <button className="text-zinc-500 hover:text-white transition-colors"><Plus size={14} /></button>
          </div>
        </div>
        <div className="col-span-2 text-center text-zinc-300 text-sm font-light text-nowrap">₹11,800</div>
        <div className="col-span-2 text-right">
          <div className="flex items-center justify-end gap-4 mb-2">
            <span className="text-white text-sm font-medium">₹23,600</span>
            <button className="text-red-500/80 hover:text-red-500 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
          <button className="text-[10px] mt-4 text-zinc-500 hover:text-zinc-300 underline underline-offset-4 tracking-wider uppercase transition-colors">
            Move to wishlist
          </button>
        </div>
      </div>


      {/* --- MOBILE VIEW (Exact matching image) --- */}
      <div className="md:hidden flex flex-col gap-6 py-4">
        <h2 className="text-white text-lg font-medium font-montserrat mb-2">Your Cart</h2>
        
        <div className="flex gap-4 items-start relative">
          {/* Product Image */}
          <div className="w-32 h-32 bg-zinc-900 rounded-lg overflow-hidden shrink-0">
            <img src="/piecedemo1.png" alt="product" className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="flex-1 pt-1">
            <h3 className="text-white text-[15px] font-medium leading-tight mb-1">Wash Basin</h3>
            <p className="text-zinc-500 text-xs mb-6">White</p>
            
            <div className="mt-auto">
              <span className="text-white text-lg font-medium block">₹299</span>
              <span className="text-zinc-500 text-xs mt-1 block font-light">Quantity: 1x</span>
            </div>
          </div>

          {/* Vertical Quantity Selector (Matches Image) */}
          <div className="flex flex-col items-center gap-1">
             <button className="w-8 h-8 flex items-center justify-center bg-[#141414] rounded-full text-zinc-400">
               <Plus size={14} />
             </button>
             <div className="w-8 h-14 flex items-center justify-center bg-[#141414] rounded-full text-white text-sm font-medium">
               1
             </div>
             <button className="w-8 h-8 flex items-center justify-center bg-[#141414] rounded-full text-zinc-400">
               <Minus size={14} />
             </button>
          </div>

          {/* Delete Button (Extra but useful) */}
          {/* <button className="absolute -top-1 -right-1 p-1 text-red-500/50">
             <Trash2 size={14} />
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default CartItemList