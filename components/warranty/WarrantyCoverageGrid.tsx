"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

// --- MORZZE LUXURY REVEAL VARIANTS ---
const containerVariants: Variants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Cards sequence mein aayenge
      delayChildren: 0.2,
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

const warrantyData = [
  {
    title: "7-Year Warranty on Faucet",
    desc: "All Morzze bathroom and kitchen faucets come with comprehensive 7-year warranty covering manufacturing defects, cartridge failures, and finish deterioration under normal use.",
  },
  {
    title: "10-Year Warranty on Sanitary Ware",
    desc: "Wash basins, WCs, and bidets are backed by a 10-year warranty against structural defects, cracks, and manufacturing flaws.",
  },
  {
    title: "5-Year Warranty on Showers",
    desc: "Rain shower systems, hand showers, and thermostatic panels include a 5-year warranty covering leaks, valve failures, and chrome finish issues.",
  },
  {
    title: "What's Covered",
    desc: "Manufacturing defects, material flaws, chrome finish peeling, cartridge malfunctions, leaks from joints, and structural integrity of ceramic products.",
  },
  {
    title: "What's Not Covered",
    desc: "Normal wear and tear, damage from hard water deposits, improper installation, unauthorized repairs, physical damage, and damage from harsh cleaning chemicals.",
  },
  {
    title: "Extended Warranty Options",
    desc: "Purchase extended coverage for up to 15 years on premium collections. Contact our support team for commercial project warranty packages.",
  },
];

const WarrantyCoverageGrid = () => {
  return (
    <section className="bg-[#050505] py-20 md:py-32 font-montserrat overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-medium text-[#FEFFF1] tracking-tight"
          >
            Warranty Coverage
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-inter text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            We stand behind the quality of our craftsmanship. Here's what's included in your warranty protection for bathroom and kitchen products.
          </motion.p>
        </div>

        {/* --- GRID SECTION --- */}
        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {warrantyData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-8 md:p-10 bg-[#0A0A0A] border border-white/5 rounded-sm transition-all duration-500 hover:border-[#FDB813]/30"
            >
              {/* Subtle hover accent line at the top */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#FDB813] transition-all duration-500 group-hover:w-full" />
              
              <div className="space-y-5">
                <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#FDB813] transition-colors duration-300 leading-tight">
                  {item.title}
                </h3>
                <p className="font-inter text-white/80 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WarrantyCoverageGrid;