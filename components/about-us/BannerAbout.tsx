"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const BannerAbout = () => {
  return (
    <section className="relative w-full md:py-20 py-8 flex items-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/banner-about.jpg"
          alt="Morzze Craftsmanship"
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
          className="max-w-3xl text-center md:text-left mt-20 md:mt-50"
        >
          <motion.span
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-montserrat text-[10px]  md:text-xs font-bold text-[#FDB813] uppercase tracking-[0.3em] mb-4 block"
          >
            OUR STORY
          </motion.span>
          <motion.h1
            variants={{
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="font-inter text-3xl md:text-2xl lg:text-5xl font-bold text-white leading-[1.1] mb-8 tracking-tight"
          >
            Crafting Excellence <br className="hidden md:block" /> Since 2008
          </motion.h1>
          <motion.p
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="font-inter text-white text-sm md:text-md max-w-2xl  md:mx-0 leading-relaxed"
          >
            Where precision engineering meets timeless design. We create{" "}
            <br className="hidden md:block" /> fittings that transform spaces
            into experiences.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default BannerAbout;
