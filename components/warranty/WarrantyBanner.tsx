"use client";
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion"; // Types import kiye

// 1. Properly typed variants for Red Alert prevention
const containerVariants: Variants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  },
};

const WarrantyBanner = () => {
  return (
    <section className="relative w-full py-20 md:py-32 flex items-center overflow-hidden">
      
      {/* Background with Scale fix to avoid CSS conflicts */}
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/warn-banner.png" 
          alt="Morzze Protection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" /> 
      </motion.div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10 w-full text-center">
        {/* Parent container controls children */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {/* Sub-label */}
          <motion.span
            variants={itemVariants}
            className="block text-[10px] md:text-xs font-bold text-[#CBA14D] uppercase tracking-[0.4em]"
          >
            7-10 Year Warranty
          </motion.span>
          
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-montserrat text-3xl md:text-5xl font-semibold text-white tracking-tight"
          >
            Warranty & Protection
          </motion.h1>
          
          {/* Paragraph */}
          <motion.p
            variants={itemVariants}
            className="font-inter text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          >
            Shop with confidence. Every Morzze bathroom and kitchen product is backed by our industry-leading warranty program.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default WarrantyBanner;