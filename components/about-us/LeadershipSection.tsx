"use client";
import React from "react";
import { motion } from "framer-motion";
import { IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";

const LeadershipSection = () => {
  return (
    <section className="relative w-full bg-[#050505] text-white py-8 md:py-24 overflow-hidden font-montserrat">
      
     
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-y-12 lg:gap-x-16 xl:gap-x-24">
          <div className="relative w-full lg:w-1/2 flex items-center justify-center lg:justify-start">
            <motion.div 
              initial={{ opacity: 0, x: -100 }} 
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false, amount: 0.2 }}
              className="relative w-full max-w-150"
            >
              <div className="aspect-square rounded-[20px] overflow-hidden border border-white/5 shadow-2xl">
                <img
                  src="/Leadership.jpg" 
                  alt="Rajesh Sharma"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-80" />
              </div>
            </motion.div>
          </div>
          <div className="relative w-full lg:w-1/2 flex items-center justify-center lg:justify-end ">
            <motion.div 
              initial={{ opacity: 0, x: 100 }} 
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
              className="space-y-10 w-full max-w-175"
            >
              <div className="space-y-4 md:text-left text-center">
                <span className="block text-[10px] md:text-xs font-bold text-[#FDB813] uppercase tracking-[0.5em] font-inter">
                  LEADERSHIP
                </span>
                
                <div>
                  <h2 className="text-4xl md:text-5xl font-medium leading-tight  tracking-tight text-[#FEFFF1]">
                    Rajesh Sharma
                  </h2>
                  <p className="text-[#FEFFF1] font-inter italic text-lg md:text-xl mt-1 opacity-90">
                    Founder & Managing Director
                  </p>
                </div>
              </div>
              <div className="space-y-6 font-inter text-[#928E87] text-sm md:text-md leading-relaxed">
                <p>
                  With over 25 years of experience in the building materials industry, Rajesh Sharma envisioned Morzze as a brand that would bridge the gap between international quality standards and Indian craftsmanship.
                </p>
                
                <p>
                  With over 25 years of experience in the building materials industry, Rajesh Sharma envisioned Morzze as a brand that would bridge the gap between international quality standards and Indian craftsmanship.
                </p>
                
                <p>
                  Under his leadership, Morzze has grown from a single-product startup to one of India's most respected names in premium fittings.
                </p>
              </div>
              <div className="flex gap-4 pt-4 border-t border-white/5">
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white/80 hover:border-[#CBA14D] hover:text-[#CBA14D] transition-colors duration-300">
                  <IconBrandLinkedin size={24} stroke={1.5} />
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white/80 hover:border-[#CBA14D] hover:text-[#CBA14D] transition-colors duration-300">
                  <IconBrandX size={24} stroke={1.5} />
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;