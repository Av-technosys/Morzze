"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";

const categories = [
  { name: "Wash Basin", image: "/democat1.png", link: "/category/wash-basin" },
  {
    name: "Floor Drainer",
    image: "/democat2.png",
    link: "/category/floor-drainer",
  },
  {
    name: "Kitchen Faucets",
    image: "/democat3.png",
    link: "/category/kitchen-faucets",
  },
  { name: "Air Tap", image: "/democat3.png", link: "/category/air-tap" },
  {
    name: "Steel Sinks",
    image: "/democat2.png",
    link: "/category/steel-sinks",
  },
];

const ShopCategory = () => {
  return (
    <section className="bg-black text-white py-8 md:py-24 px-6 md:px-10 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <div className="relative mb-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <span className="block font-montserrat text-[10px] md:text-xs font-bold text-[#CBA14D] uppercase tracking-[0.4em] mb-4">
              CURATED SELECTION
            </span>
            <h2 className="font-montserrat text-3xl md:text-5xl font-medium tracking-tight text-white">
              Shop by Category
            </h2>
          </motion.div>

          <div className="hidden md:block absolute right-6 bottom-2">
            <Link
              href="/all-products"
              className="flex items-center gap-2 font-montserrat text-[10px] font-bold text-[#EDEBE980] hover:text-[#CBA14D] transition-colors uppercase tracking-widest group"
            >
              VIEW ALL{" "}
              <span className="text-lg transition-transform group-hover:translate-x-1">
                <IconArrowRight size={20} />
              </span>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 h-112.5 lg:h-134"
          >
            <CategoryCard product={categories[0]} />
          </motion.div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 px-0 md:px-4">
            {categories.slice(1).map((cat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 180 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + index * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative aspect-square overflow-hidden scale-95"
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

const CategoryCard = ({ product }: { product: any }) => (
  <Link
    href={product.link}
    className="block group w-full h-full relative overflow-hidden bg-zinc-950 rounded-sm"
  >
    <Image
      src={product.image}
      alt={product.name}
      fill
      className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
    <div className="absolute bottom-6 left-6 z-10">
      <h3 className="font-inter text-sm md:text-base font-medium text-white tracking-wide">
        {product.name}
      </h3>
    </div>
  </Link>
);

export default ShopCategory;
