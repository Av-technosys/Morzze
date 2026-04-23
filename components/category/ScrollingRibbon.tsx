"use client";
import React from "react";
import { motion } from "framer-motion";

const ScrollingRibbon = () => {
  const items = [
    "AIRTAP",
    "BATHROOM FAUCETS",
    "ELECTRIC TOWER WARMER",
    "FLOOR DRAINER",
    "FOOD WASTE DISPOSER",
  ];

  return (
    <div className="bg-[#0D0D0D] py-15">
    <div className="w-full overflow-hidden bg-black py-10 border-y border-white relative">
      
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 6 }}
      >
        {[...items, ...items].map((text, i) => (
          <div key={i} className="relative mx-10">
            
            {/* 🔥 BACK TEXT (ghost / shadow wala) */}
            <span
              className="absolute left-1 -top-[8px] text-white/20 tracking-[0.25em] font-bold uppercase md:text-2xl text-xl  pointer-events-none"
            >
              {text}
            </span>

            {/* 🔥 FRONT TEXT */}
            <span className="relative text-white  md:text-2xl tracking-[0.25em] text-xl uppercase font-semibold">
              {text}
            </span>

          </div>
        ))}
      </motion.div>

    </div></div>
  );
};

export default ScrollingRibbon;