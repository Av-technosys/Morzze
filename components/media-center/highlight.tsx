"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export default function ExhibitionHighlightsSection() {
  return (
    <section className="w-full bg-black text-white px-4 md:px-8 lg:px-10 py-16 md:py-20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.42em] text-[#d39b10] font-medium mb-4"
        >
          In The News
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-[38px] md:text-[52px] font-semibold tracking-[-0.03em] mb-10"
        >
          Exhibition Highlights
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true }}
          className="bg-[#121212] px-5 md:px-8 py-8 md:py-10 grid lg:grid-cols-2 gap-8 items-center text-left mb-10"
        >
          {/* Left */}
          <div>
            <span className="inline-block px-3 py-[4px] rounded-full bg-[#f4e8c7] text-[#9b5d00] text-[10px] mb-4">
              Featured Story
            </span>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-[#1a1a1a] flex items-center justify-center text-[#e6aa12] text-[11px] font-semibold">
                AD
              </div>
              <div>
                <p className="text-[15px] text-white">
                  Architectural Digest India
                </p>
                <p className="text-[12px] text-[#777777]">March 15, 2024</p>
              </div>
            </div>

            <h3 className="text-[30px] md:text-[36px] font-semibold mb-5">
              ARCHEX Dehradun 2026
            </h3>

            <p className="text-[14px] leading-8 text-white/60 mb-4">
              Morzze proudly showcased its premium kitchen and bathroom
              solutions at ARCHEX Dehradun 2026. Designed for modern and elegant
              spaces, our collection reflects refined finishes, seamless
              functionality, and superior craftsmanship.
            </p>

            <button className="flex items-center gap-2 text-[#d39b10] text-[13px] font-medium mb-4 hover:gap-3 transition-all">
              Read Full Article <MoveRight size={13} />
            </button>

            <p className="text-[14px] leading-8 text-white/60">
              From refined finishes to seamless flow and superior craftsmanship,
              our products reflect a perfect balance of functionality and
              aesthetics. Experience the quality, detailing, and innovation that
              define Morzze.
            </p>
          </div>

          {/* Right */}
          <div className="relative w-full h-[240px] md:h-[320px] overflow-hidden">
            <Image
              src="/exhibition.png"
              alt="Exhibition"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        <button className="px-14 h-11 border border-[#d39b10] text-[#d39b10] text-[12px] hover:bg-[#d39b10] hover:text-black transition">
          VIEW ARTICLE
        </button>
      </div>
    </section>
  );
}
