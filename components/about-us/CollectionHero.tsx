"use client";
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

// --- MORZZE LUXURY REVEAL VARIANTS ---
const containerVariants: Variants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Items in sequence
      delayChildren: 0.3, // Slow start for luxury feel
    },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  },
};

const CollectionHero = () => {
  return (
    <section className="relative w-full py-8 md:py-24 overflow-hidden  font-montserrat">
      
      {/* --- BACKGROUND IMAGE: Slow Zoom Logic --- */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: false }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/banner-about.jpg" // Placeholder, replace with your actual image path
          alt="Morzze Bathroom fittings range"
          fill
          className="object-cover transition-transform duration-[20s] linear animate-slow-zoom"
          priority
        />
        {/* Luxury Vignette Overlay for Depth */}
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-black/80" />
      </motion.div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10 w-full h-full flex items-center justify-center">
        
        {/* --- CONTENT BLOCK (Centered Alignment) --- */}
        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: false, amount: 0.3 }}
          className="text-center space-y-8 md:space-y-12 max-w-3xl flex flex-col items-center"
        >
          {/* Top Label */}
          <motion.span 
            variants={itemVariants}
            className="block text-[10px] md:text-xs font-bold text-[#FBBF24] uppercase tracking-[0.6em] font-montserratpt-1"
          >
            EXPERIENCE MORZZE
          </motion.span>
          
          {/* Main Title */}
          <motion.h2 
            variants={itemVariants}
            className="font-montserrat text-3xl md:text-5xl font-semibold text-white tracking-tight leading-[1.15]"
          >
            Discover Our <br /> Premium Collection
          </motion.h2>
          
          {/* Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-[#928E87] font-inter text-sm md:text-md leading-relaxed max-w-2xl opacity-90"
          >
            Explore our complete range of bathroom and kitchen fittings — designed t transform your living spaces into expressions of luxury.
          </motion.p>
          
          {/* --- BUTTON GROUP (Exact Sizing and Color) --- */}
          <motion.div variants={itemVariants} className="flex gap-4 md:gap-6 items-center pt-2">
            {/* CTA 1: Filled */}
            <a 
              href="#" 
              className="px-10 py-2 md:py-4 bg-[#FDB813] text-[#1C2023] font-bold text-xs md:text-sm  tracking-wider rounded-md border-2 border-[#FFBF3F] hover:bg-transparent hover:text-white transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(255,191,63,0.3)]"
            >
              Explore Products
            </a>
            
            {/* CTA 2: Outlined */}
            <a 
              href="#" 
              className="px-10 py-2 md:py-4 bg-transparent font-bold text-xs md:text-sm  tracking-wider rounded-md border-2 border-[#FDB813] text-[#FDB813] transition-all duration-300 shadow-md"
            >
              Contact Us
                </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom shadow accent for precise symmetry matching image_9.png */}
      <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
    </section>
  );
};

export default CollectionHero;