"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative w-full md:py-8 py-18  flex items-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/hero-bg.png"
          alt="Luxury Bathroom Collection"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40 md:bg-black/20"></div>
      </motion.div>
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10 w-full">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: false }}
          className="max-w-2xl text-center md:text-left mt-20 md:mt-40"
        >
          <motion.span
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-montserrat text-[10px] md:text-xs font-bold text-[#CBA14D] uppercase tracking-[0.3em] mb-4 block"
          >
            BATHROOM COLLECTION
          </motion.span>
          <motion.h1
            variants={{
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="font-inter text-4xl md:text-6xl lg:text-7xl font-bold text-[#EDEBE980] leading-[1.1] mb-8 tracking-tight"
          >
            Luxury Redefined <br className="hidden md:block" /> For Every Space
          </motion.h1>
          <motion.div
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="flex justify-center md:justify-start"
          >
            <Link
              href="/products"
              className="group relative border border-[#CBA14D]/60 px-8 py-3 transition-all duration-300 hover:bg-[#CBA14D] overflow-hidden inline-block"
            >
              <span className="relative z-10 font-inter text-[10px] md:text-xs font-bold text-[#CBA14D] group-hover:text-black uppercase tracking-widest">
                Explore Products
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent"></div>
    </section>
  );
};

export default HeroSection;
