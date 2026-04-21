"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const LookbookSection = () => {
  return (
    <section className="bg-black text-white py-8 md:py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* -- HEADER SECTION -- */}
        <div className="text-center space-y-2">
          <span className="block font-inter text-xs md:text-sm font-bold text-[#CBA14D] uppercase tracking-[0.5em]">
            INSPIRATION
          </span>
          <h2 className="font-montserrat text-4xl md:text-6xl font-medium tracking-tight text-white uppercase">
            The Lookbook
          </h2>
        </div>

        {/* -- ANIMATED GRID -- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* 1. LEFT IMAGE: Niche se upar aayegi */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            className="relative group w-full aspect-[16/9] overflow-hidden cursor-pointer"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              transition={{ duration: 0.6 }}
              className="w-full h-full relative"
            >
              <Image 
                src="/lookbook1.png" 
                alt="Bathroom Design"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-500" />
            </motion.div>
            
            {/* TEXT OVERLAY */}
            <div className="absolute bottom-8 left-8 z-10 pointer-events-none">
              <span className="block font-inter text-[11px] font-bold text-[#CBA14D] tracking-[0.3em] uppercase">
                BATHROOM
              </span>
              <h4 className="font-montserrat text-white text-2xl font-medium mt-1">
                Modern Bathroom Oasi
              </h4>
            </div>
          </motion.div>

          {/* 2. RIGHT IMAGE: Uper se niche aayegi */}
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            className="relative group w-full aspect-[16/9] overflow-hidden cursor-pointer"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              transition={{ duration: 0.6 }}
              className="w-full h-full relative"
            >
              <Image 
                src="/lookbook2.png" 
                alt="Kitchen Design"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-500" />
            </motion.div>
            
            {/* TEXT OVERLAY */}
            <div className="absolute bottom-8 left-8 z-10 pointer-events-none">
              <span className="block font-inter text-[11px] font-bold text-[#CBA14D] tracking-[0.3em] uppercase">
                KITCHEN
              </span>
              <h4 className="font-montserrat text-white text-2xl font-medium mt-1">
                Contemporary Kitchen
              </h4>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default LookbookSection