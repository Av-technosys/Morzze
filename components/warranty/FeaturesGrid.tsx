"use client";
import React from "react";
import { 
  IconShieldCheck, 
  IconAward, 
  IconHeadset, 
  IconMapPin 
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const FeaturesGrid = () => {
  const features = [
    {
      icon: <IconShieldCheck size={28} stroke={1.5} />,
      title: "ISO 9001 Certified",
      description: "Quality management",
    },
    {
      icon: <IconAward size={28} stroke={1.5} />,
      title: "15+ Industry Awards",
      description: "Excellence recognized",
    },
    {
      icon: <IconHeadset size={28} stroke={1.5} />,
      title: "24/7 Support",
      description: "Always here to help",
    },
    {
      icon: <IconMapPin size={28} stroke={1.5} />,
      title: "Pan-India Service",
      description: "500+ service centers",
    },
  ];

  return (
    <section className="bg-black py-20 font-montserrat">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center space-y-4 group"
            >
              {/* Icon Circle Container */}
              <div className="w-16 h-16 bg-[#FFF4D2] rounded-full flex items-center justify-center text-[#FDB813] transition-transform duration-300 group-hover:scale-110 shadow-[0_0_20px_rgba(253,184,19,0.15)]">
                {feature.icon}
              </div>

              {/* Text Content */}
              <div className="space-y-1">
                <h3 className="text-white text-[15px] font-bold tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-[13px] font-medium opacity-80">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;