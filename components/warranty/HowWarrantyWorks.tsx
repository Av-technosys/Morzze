"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  IconShoppingCart, 
  IconFileDescription, 
  IconShieldCheck, 
  IconHeadset 
} from "@tabler/icons-react";

const containerVariants: Variants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 40 },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  },
};

const steps = [
  {
    icon: <IconShoppingCart size={32} stroke={1.5} />,
    title: "Purchase",
    desc: "Buy your Morzze bathroom or kitchen products from authorized dealers",
  },
  {
    icon: <IconFileDescription size={32} stroke={1.5} />,
    title: "Register",
    desc: "Register your product within 30 days of purchase",
  },
  {
    icon: <IconShieldCheck size={32} stroke={1.5} />,
    title: "Protected",
    desc: "Enjoy 7-10 years of comprehensive warranty coverage",
  },
  {
    icon: <IconHeadset size={32} stroke={1.5} />,
    title: "Support",
    desc: "Contact us anytime for warranty claims or service",
  },
];

const HowWarrantyWorks = () => {
  return (
    <section className="bg-[#0A0A0A] py-8 md:py-24 font-montserrat overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-medium text-[#FEFFF1] tracking-tight"
          >
            How Warranty Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-inter text-white/80 text-sm md:text-base opacity-80"
          >
            Simple steps to protect your bathroom and kitchen investment
          </motion.p>
        </div>

        {/* --- STEPS GRID --- */}
        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Circle */}
              <div className="w-20 h-20 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#92400E] mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-[0_0_40px_rgba(254,243,199,0.1)]">
                {step.icon}
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white tracking-wide">
                  {step.title}
                </h3>
                <p className="font-inter text-white/80 text-sm leading-relaxed max-w-[240px] mx-auto opacity-90">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowWarrantyWorks;