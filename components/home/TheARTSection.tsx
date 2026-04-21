"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const artPoints = [
  {
    number: "01",
    title: "Material Selection",
    desc: "Only 304-grade stainless steel and premium brass alloys make the cut.",
  },
  {
    number: "02",
    title: "Precision Engineering",
    desc: "CNC-machined to 0.01mm tolerance for flawless fit and finish.",
  },
  {
    number: "03",
    title: "Hand Finishing",
    desc: "Each piece is hand-polished through 7 stages for mirror-perfect surfaces.",
  },
];

const TheARTSection = () => {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-10 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square w-full overflow-hidden"
        >
          <Image
            src="/artmake.jpg"
            alt="Master craftsman working on steel"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block font-montserrat text-[10px] md:text-xs font-bold text-[#CBA14D] uppercase tracking-[0.4em] mb-4">
              THE ART OF MAKING
            </span>
            <h2 className="font-montserrat text-3xl md:text-5xl font-medium tracking-tight mb-6">
              Crafted with <span className="text-[#CBA14D]">Obsession</span>
            </h2>
            <p className="font-inter text-[#928E87] leading-relaxed max-w-xl">
              Every Morzze product passes through the hands of master craftsmen
              who treat precision as an art form. From raw material to finished
              product, our commitment to excellence is unwavering.
            </p>
          </motion.div>
          <div className="space-y-8 border-l border-[#CBA14D]/30 pl-8">
            {artPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                  duration: 1.2,
                  delay: 0.2 + index * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group"
              >
                <div className="flex gap-6 items-start">
                  <span className="font-montserrat text-sm font-bold text-[#CBA14D] mt-1">
                    {point.number}
                  </span>
                  <div>
                    <h4 className="font-montserrat text-lg font-medium text-white mb-2 group-hover:text-[#CBA14D] transition-colors">
                      {point.title}
                    </h4>
                    <p className="font-inter text-sm text-[#928E87] leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheARTSection;
