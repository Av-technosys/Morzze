"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const categoryData = [
  {
    id: "kitchen-faucets",
    title: "Kitchen Faucets",
    sub: "PRECISION MEETS ELEGANCE",
    desc: "Pull-down sprayers, touchless sensors, and bridge faucets — all engineered for the modern kitchen.",
    images: ["/kitchenfaucet.png", "/kitchenfaucet2.png", "/kitchenfaucet2.png", "/kitchenfaucet.png"] 
  },
  { id: "steel-sinks", title: "Steel Sinks", sub: "DURABILITY DEFINED", desc: "Handcrafted stainless steel sinks with noise-reduction technology.", images: ["/s1.jpg", "/s2.jpg", "/s3.jpg", "/s4.jpg"] },
  { id: "granite-basins", title: "Granite Basins", sub: "NATURAL LUXURY", desc: "Carved from solid stone, bringing earthy textures to your bathroom.", images: ["/b1.jpg", "/b2.jpg", "/b3.jpg", "/b4.jpg"] },
  { id: "air-taps", title: "Air Taps", sub: "FUTURE OF FLOW", desc: "Minimalist designs with advanced aeration for a soft water touch.", images: ["/a1.jpg", "/a2.jpg", "/a3.jpg", "/a4.jpg"] },
  { id: "towel-warmers", title: "Towel Warmers", sub: "COZY COMFORT", desc: "Heated rails that blend functionality with high-end spa aesthetics.", images: ["/t1.jpg", "/t2.jpg", "/t3.jpg", "/t4.jpg"] },
];

const CategoryShowcase = () => {
  const [activeTab, setActiveTab] = useState(categoryData[0]);

  return (
    <section className="bg-black text-white py-24 px-6 md:px-10 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* -- LEFT SIDE: CATEGORY LIST (4 Columns) -- */}
        <div className="lg:col-span-4 space-y-6 pt-10">
          {categoryData.map((cat) => (
            <div key={cat.id} className="relative">
              <button
                onClick={() => setActiveTab(cat)}
                className="w-full text-left flex items-center gap-4 group focus:outline-none"
              >
                <div className={`h-[24px] w-[2px] bg-[#CBA14D] transition-all duration-500 ${activeTab.id === cat.id ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`} />
                <span className={`font-montserrat text-lg md:text-xl tracking-wide transition-colors duration-300 ${activeTab.id === cat.id ? 'text-white' : 'text-[#928E8780] hover:text-white/60'}`}>
                  {cat.title}
                </span>
              </button>

              <AnimatePresence>
                {activeTab.id === cat.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pl-5 mt-4">
                      <div className="bg-[#111111]/50 p-6 border-l border-[#CBA14D]/20">
                        <span className="block font-montserrat text-[10px] font-bold text-[#CBA14D] tracking-[0.3em] mb-3">{cat.sub}</span>
                        <p className="font-inter text-sm text-[#928E87] leading-relaxed mb-6 max-w-sm">{cat.desc}</p>
                        <Link href={`/category/${cat.id}`} className="inline-block font-montserrat text-[10px] font-bold text-[#CBA14D] uppercase tracking-widest border-b border-transparent hover:border-[#CBA14D] transition-all">
                          EXPLORE COLLECTION +
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* -- RIGHT SIDE: COMPACT IMAGE GRID (8 Columns) -- */}
        <div className="lg:col-span-8 flex justify-center items-center h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              className="grid grid-cols-2 gap-11 w-[500px]" // Max-width added to keep images small
            >
              {activeTab.images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: index * 0.15, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  // Heights and Widths are now controlled and separate
                  className={`relative overflow-hidden bg-zinc-900 w-full rounded-sm shadow-2xl ${
                    index === 0 ? 'aspect-square mt-0' : 
                    index === 1 ? 'aspect-square mt-10' : 
                    index === 2 ? 'aspect-square -mt-10' : 
                    'aspect-square mt-0'
                  }`}
                >
                  <Image
                    src={img}
                    alt={activeTab.title}
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}

export default CategoryShowcase