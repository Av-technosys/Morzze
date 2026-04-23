"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const FullHorizontalBanner = () => {
  return (
    <section className="relative w-full  overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full h-auto"
      >
        <Image
          src="/category-view.png"
          alt="Category Full View"
          width={1920} 
          height={600}  
          className="w-full h-auto object-contain" 
          priority
        />
      </motion.div>
    </section>
  );
};

export default FullHorizontalBanner;