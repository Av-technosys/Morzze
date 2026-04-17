"use client";
import React from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, Award, RotateCcw } from "lucide-react";

const features = [
  {
    icon: <Truck size={28} strokeWidth={1.5} />,
    title: "FREE SHIPPING",
    desc: "On orders above ₹5,000",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    title: "12-MONTH WARRANTY",
    desc: "Guaranteed quality",
  },
  {
    icon: <Award size={28} strokeWidth={1.5} />,
    title: "PREMIUM QUALITY",
    desc: "European standards",
  },
  {
    icon: <RotateCcw size={28} strokeWidth={1.5} />,
    title: "EASY RETURNS",
    desc: "Hassle-free process",
  },
];

const TrustSection = () => {
  return (
    <section className="bg-black text-white py-16 border border-[#2E2E2E]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center text-center group"
            >
              <div className="text-[#CBA14D] mb-5 transition-transform duration-500 group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="font-montserrat text-[10px] md:text-xs font-bold tracking-[0.2em] mb-2 text-white/90">
                {item.title}
              </h3>
              <p className="font-inter text-[10px] md:text-[11px] text-[#928E8780] leading-relaxed uppercase tracking-wider">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
