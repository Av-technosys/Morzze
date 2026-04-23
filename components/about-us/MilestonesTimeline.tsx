"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const milestones = [
  {
    year: "2008",
    title: "Foundation",
    desc: "Morzze was founded in New Delhi with a vision to revolutionize kitchen and bathroom fittings in India.",
  },
  {
    year: "2012",
    title: "First Manufacturing Unit",
    desc: "Established our state-of-the-art manufacturing facility with German precision machinery.",
  },
  {
    year: "2015",
    title: "Pan-India Presence",
    desc: "Expanded distribution network to cover all major cities across India with 500+ dealers.",
  },
  {
    year: "2018",
    title: "International Expansion",
    desc: "Entered Middle East and Southeast Asian markets with premium export collections.",
  },
  {
    year: "2021",
    title: "Digital Transformation",
    desc: "Launched e-commerce platform and digital-first customer experience.",
  },
  {
    year: "2024",
    title: "Sustainability Initiative",
    desc: "Committed to carbon-neutral manufacturing and eco-friendly product lines.",
  },
];

const MilestonesTimeline = () => {
  const containerRef = useRef(null);
  
  // Scroll tracking logic fix
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section ref={containerRef} className="relative w-full bg-[#171717] text-white py-8 md:py-24 overflow-hidden font-montserrat">
      
      {/* --- HEADER BLOCK --- */}
      <div className="text-center mb-20 md:mb-32 space-y-4">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="block text-[10px] md:text-xs font-bold text-[#FBBF24] uppercase tracking-[0.6em]"
        >
          OUR JOURNEY
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-medium text-white tracking-tight uppercase"
        >
          Milestones
        </motion.h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* --- CENTRAL VERTICAL LINE --- */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-white/10 -translate-x-1/2 hidden md:block" />
        
        {/* Animated Gold Line */}
        <motion.div 
          style={{ scaleY: scrollYProgress }}
          className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#F59E0B] origin-top -translate-x-1/2 hidden md:block z-10"
        />

        <div className="space-y-32 md:space-y-48">
          {milestones.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.4 }}
              className={`relative flex flex-col md:flex-row items-start ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* --- CONTENT SIDE (Fixed Alignment) --- */}
              <div className={`w-full md:w-1/2 flex flex-col ${
                index % 2 === 0 ? "md:items-end md:text-right md:pr-20" : "md:items-start md:text-left md:pl-20"
              }`}>
                <span className="text-[#FBBF24] font-bold text-lg md:text-xl mb-2 tracking-widest">{item.year}</span>
                <h3 className="text-2xl md:text-3xl font-medium text-[#FFFFFF] mb-4 leading-tight uppercase">{item.title}</h3>
                {/* Paragraph Alignment Fixed */}
                <p className="text-[#928E87] font-inter text-sm md:text-base leading-relaxed max-w-sm">
                  {item.desc}
                </p>
              </div>

              {/* Central Point (The Dot) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2 w-3 h-3 bg-[#CBA14D] rounded-full z-20 hidden md:flex items-center justify-center">
                <div className="w-6 h-6 bg-[#CBA14D]/20 rounded-full animate-pulse absolute" />
              </div>

              {/* Empty Spacer Side */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MilestonesTimeline;