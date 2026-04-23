"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";

const categories = [
  { name: "Wash Basin", image: "/democat1.png", link: "/category/wash-basin" },
  { name: "Floor Drainer", image: "/democat2.png", link: "/category/floor-drainer" },
  { name: "Kitchen Faucets", image: "/democat3.png", link: "/category/kitchen-faucets" },
  { name: "Air Tap", image: "/democat3.png", link: "/category/air-tap" },
  { name: "Steel Sinks", image: "/democat2.png", link: "/category/steel-sinks" },
];

const ShopCategory = () => {
  return (
    <section className="bg-black text-white py-12 md:py-24 px-6 md:px-10 overflow-hidden font-montserrat">
      <div className="max-w-screen-2xl mx-auto">
        {/* --- HEADER SECTION --- */}
        <div className="relative mb-12 md:mb-20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <span className="block text-[10px] md:text-xs font-bold text-[#CBA14D] uppercase tracking-[0.4em] mb-4">
              CURATED SELECTION
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
              Shop by Category
            </h2>
          </motion.div>

          <div className="hidden md:block absolute right-0 bottom-2">
            <Link
              href="/category#category-section"
              className="flex items-center gap-2 text-[10px] font-bold text-[#EDEBE980] hover:text-[#CBA14D] transition-colors uppercase tracking-widest group"
            >
              VIEW ALL{" "}
              <IconArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* --- GRID SYSTEM (Fixed Height Alignment) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Main Left Card: Spans full height of the right grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full min-h-[500px] lg:min-h-full"
          >
            <CategoryCard product={categories[0]} isMain />
          </motion.div>

          {/* Right Cards Grid */}
          <div className="grid grid-cols-2 gap-6">
            {categories.slice(1).map((cat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="aspect-square"
              >
                <CategoryCard product={cat} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({ product, isMain = false }: { product: any; isMain?: boolean }) => (
  <Link
    href={product.link}
    className="group block w-full h-full relative overflow-hidden bg-zinc-900 rounded-sm"
  >
    <Image
      src={product.image}
      alt={product.name}
      fill
      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
    />
    
    {/* Dark Overlay for Text Clarity */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

    {/* Content Container */}
    <div className="absolute bottom-8 left-8 z-10 transition-transform duration-500 group-hover:-translate-y-2">
      <h3 className={`font-montserrat font-medium text-white tracking-wide mb-2 ${isMain ? "text-2xl md:text-3xl" : "text-sm md:text-md"}`}>
        {product.name}
      </h3>
      
      {/* --- EXPLORE BUTTON (Reveals on Hover) --- */}
      <div className="flex items-center gap-2 text-[#CBA14D] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
        EXPLORE <IconArrowRight size={14} stroke={2.5} />
      </div>
    </div>
  </Link>
);

export default ShopCategory;