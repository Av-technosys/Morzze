"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const warrantyTerms = [
  {
    years: "7",
    title: "Years on Faucets",
    desc: "Bathroom and kitchen faucets including cartridges, finishes, and all mechanical parts",
  },
  {
    years: "10",
    title: "Years on Sanitary Ware",
    desc: "Wash basins, WCs, bidets, and ceramic products against cracks and structural defects",
  },
  {
    years: "5",
    title: "Years on Showers",
    desc: "Rain shower systems, hand showers, shower panels, and thermostatic mixers",
  },
  {
    years: "5",
    title: "Years on Kitchen Sinks",
    desc: "Stainless steel and granite composite sinks against rust, cracks, and manufacturing defects",
  },
];

const WarrantyTermsSection = () => {
  return (
    <section className="bg-[#050505] py-8 md:py-24 overflow-hidden font-montserrat">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-15">
          
          {/* --- LEFT IMAGE: Slide in from Left --- */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/5">
              <Image
                src="/warn-2.png" // Replace with your image path
                alt="Morzze Luxury Fittings"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* --- RIGHT CONTENT: Staggered Reveal --- */}
          <div className="w-full lg:w-1/2 space-y-6 ">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false }}
              className="text-3xl md:text-3xl font-semibold text-white tracking-tight"
            >
              Industry-Leading Warranty Terms
            </motion.h2>

            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: false }}
              variants={{
                animate: { transition: { staggerChildren: 0.15 } }
              }}
              className="space-y-8"
            >
              {warrantyTerms.map((term, index) => (
                <motion.div
                  key={index}
                  variants={{
                    initial: { opacity: 0, x: 30 },
                    animate: { opacity: 1, x: 0 }
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-5 group"
                >
                  {/* Circular Year Badge */}
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#92400E] font-bold text-lg md:text-xl transition-transform duration-500 group-hover:scale-110">
                    {term.years}
                  </div>

                  {/* Text */}
                  <div className="space-y-1">
                    <h4 className="text-white font-semibold text-lg md:text-xl">
                      {term.title}
                    </h4>
                    <p className="font-inter text-white/80 text-xs md:text-sm leading-relaxed max-w-md">
                      {term.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WarrantyTermsSection;