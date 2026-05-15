"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CareersStorySection() {
  return (
    <section className="w-full bg-black text-white px-4 md:px-8 lg:px-12 py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] uppercase tracking-[0.42em] text-white/80 mb-7">
            Our Story
          </p>

          <h2 className="text-[48px] md:text-[68px] lg:text-[76px] leading-[0.95] font-semibold italic tracking-[-0.04em] mb-8">
            Let&apos;s unite <br />
            and conquer <br />
            <span className="text-[#b25d12]">together</span>
          </h2>

          <div className="space-y-6 max-w-[540px] text-[14px] md:text-[15px] leading-8 text-white/70">
            <p>
              At Morzze, we don&apos;t just make furniture — we shape spaces
              where life happens. Since 2008, we&apos;ve been building
              India&apos;s most celebrated luxury furniture brand, one
              handcrafted piece at a time.
            </p>
            <p>
              Our team of designers, craftspeople, and innovators share one
              obsession: creating objects of extraordinary beauty that stand the
              test of time. If that sounds like you, we want to hear from you.
            </p>
          </div>
        </motion.div>

        {/* Right Mosaic */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative h-[170px] md:h-[190px] overflow-hidden"
          >
            <Image
              src="/story1.png"
              alt="career1"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative h-[220px] md:h-[250px] overflow-hidden mt-5"
          >
            <Image
              src="/story2.png"
              alt="career2"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative h-[220px] md:h-[250px] overflow-hidden -mt-6"
          >
            <Image
              src="/story3.png"
              alt="career3"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative h-[170px] md:h-[190px] overflow-hidden"
          >
            <Image
              src="/story4.png"
              alt="career4"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
