"use client"
import React from 'react'
import { Search, Home } from 'lucide-react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 text-center">
      
      {/* 404 Large Text with Sad Face Emoji Logic */}
      <div className="relative flex items-center justify-center mb-12">
        <h1 className="text-[120px] md:text-[180px] font-bold text-zinc-800 tracking-tighter leading-none select-none">
          404
        </h1>
        {/* Sad Emoji Overlay (Matches the gold layered circles) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 md:w-32 md:h-32 bg-[#A88B4A]/20 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-[#A88B4A]/40 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-[#FFB800] rounded-full flex items-center justify-center shadow-2xl">
                 <span className="text-black text-3xl md:text-5xl font-bold mb-2">☹️</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-md mx-auto mb-10">
        <h2 className="text-[#FEFFF1] text-2xl md:text-3xl font-semibold mb-4 font-montserrat">
          Oops! We lost that page.
        </h2>
        <p className="text-white/80 text-sm md:text-base font-light leading-relaxed font-inter">
          The product or page you're looking for might have been moved, deleted, or never existed in the first place.
        </p>
      </div>

      {/* Search Bar Section */}
      <div className="w-full max-w-xl mb-8">
        <div className="flex items-center bg-black border border-zinc-800 rounded-lg p-1.5 focus-within:border-zinc-600 transition-all">
          <div className="pl-4 text-zinc-500">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search for products, brands..." 
            className="flex-1 bg-transparent border-none outline-none text-sm text-white px-3 py-2 placeholder:text-zinc-600"
          />
          <button className="bg-[#FDB813] font-montserrat hover:bg-[#E6A600] text-black text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-md transition-colors">
            Find it
          </button>
        </div>
      </div>

      {/* Back to Home Button */}
      <Link href="/">
        <button className="flex items-center gap-2 bg-[#FDB813] hover:bg-[#E6A600] font-montserrat text-black text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-md transition-all group">
          <Home size={16} className="group-hover:-translate-y-0.5 transition-transform " />
          Back to Home
        </button>
      </Link>

    </div>
  )
}

export default NotFound