"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 40 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const BrandHeritage = () => {
  return (
    <section className="relative w-full bg-[#050505] text-white py-20 md:py-32 overflow-hidden font-montserrat">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, amount: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-4/5 lg:aspect-square  overflow-hidden border border-white/5 shadow-2xl group">
              <img
                src="/green-about.png"
                alt="Morzze Heritage"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: false, amount: 0.2 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <motion.div variants={fadeInUp} className="space-y-1 md:text-left text-center">
              <span className="block text-[10px] md:text-xs font-bold text-[#FBBF24] uppercase tracking-[0.4em]">
                BRAND HERITAGE
              </span>
              <h2 className="text-3xl md:text-5xl font-medium leading-[1.1] text-[#FEFFF1] tracking-tight">
                A Legacy Built on <br /> Precision & Pride
              </h2>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="space-y-3 font-inter text-[#928E87] text-sm md:text-md leading-relaxed max-w-2xl"
            >
              <p>
                Morzze began with a simple belief: that everyday objects deserve
                extraordinary attention. Founded in 2008 in New Delhi, we set
                out to redefine what premium kitchen and bathroom fittings could
                be for Indian homes.
              </p>
              <p>
                Our journey started in a small workshop where our founders
                combined traditional Indian craftsmanship with German
                engineering precision. Today, we operate three state-of-the-art
                manufacturing facilities — but our commitment to quality remains
                unchanged.
              </p>
              <p>
                Every Morzze product is born from solid brass, 304-grade
                stainless steel, and premium ceramic cartridges. Each piece
                undergoes 72+ hours of rigorous testing before it earns the
                right to carry our name.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="flex gap-12 md:gap-20  border-t border-white/5"
            >
              <div className="flex items-center gap-5 group">
                <div className="w-[1.5px] h-12 bg-[#CBA14D] transition-all duration-500 group-hover:h-16" />
                <div className="space-y-1">
                  <h4 className="text-4xl md:text-5xl font-semibold text-white leading-none">
                    16+
                  </h4>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#928E87]">
                    Years of Craft
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-[1.5px] h-12 bg-[#CBA14D] transition-all duration-500 group-hover:h-16" />
                <div className="space-y-1">
                  <h4 className="text-4xl md:text-5xl font-semibold text-white leading-none">
                    18
                  </h4>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#928E87]">
                    Countries Served
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandHeritage;
