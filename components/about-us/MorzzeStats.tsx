"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
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
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const MorzzeStats = () => {
  const stats = [
    { value: "15+", label: "Years of Excellence" },
    { value: "500+", label: "Dealer Network" },
    { value: "50K+", label: "Happy Customers" },
    { value: "200+", label: "Product Variants" },
  ];

  return (
    <section className="relative w-full bg-[#171717] text-white md:py-10 py-8 overflow-hidden ">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col items-center justify-center text-center space-y-2 md:space-y-3 ${
                index !== stats.length - 1 ? "md:border-r border-white/10" : ""
              }`}
            >
              <span className="font-montserrat text-4xl md:text-5xl font-semibold text-[#FBBF24] tracking-tight leading-none">
                {stat.value}
              </span>
              <p className="font-inter text-[10px] md:text-xs font-bold text-[#FEFFF1] uppercase tracking-widest px-4 leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MorzzeStats;
