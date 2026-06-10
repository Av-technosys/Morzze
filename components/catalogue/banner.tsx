"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductCatalogueHero() {
  return (
    <section className="relative w-full min-h-[260px] md:min-h-[340px] lg:min-h-[400px] overflow-hidden flex items-center justify-center bg-black">
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <Image
          src="/catalogue.png"
          alt="Product Catalogue"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/45" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-[10px] md:text-xs uppercase tracking-[0.42em] text-[#d39b10] font-medium mb-4"
        >
          Product Catalogue
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-[34px] md:text-[52px] lg:text-[58px] font-semibold tracking-[-0.03em] text-white leading-[1.08] mb-4"
        >
          Explore Our Product Catalogue
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-[13px] md:text-[17px] leading-7 text-[#efefef]/90"
        >
          Explore the Morzze catalogue, a curated collection of premium kitchen and bathroom solutions that embody luxury and innovation. Each product is meticulously crafted with the finest materials, ensuring durability and timeless elegance.
        </motion.p>
      </div>
    </section>
  );
}
