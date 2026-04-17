"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const products = [
  {
    category: "KITCHEN FAUCETS",
    name: "Arc Pull-Down Faucet",
    price: "₹12,500",
    image: "/piecedemo1.png",
  },
  {
    category: "GRANITE BASINS",
    name: "Oval Vessel Basin",
    price: "₹14,200",
    image: "/piecedemo2.png",
  },
  {
    category: "STEEL SINKS",
    name: "Luxe Single Bowl Sink",
    price: "₹18,900",
    image: "/piecedemo3.png",
  },
  {
    category: "KITCHEN FAUCETS",
    name: "AeroMix Tall Faucet",
    price: "₹11,500",
    image: "/piecedemo4.png",
  },
  {
    category: "TOWEL WARMERS",
    name: "Curved Chrome Warmer",
    price: "₹24,000",
    image: "/piecedemo5.png",
  },
];

const SignaturePieces = () => {
  return (
    <section className="bg-black text-white py-20 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
        <div className="relative mb-12 flex items-center justify-center min-h-25">
          <div className="text-center">
            <span className="block font-montserrat text-[10px] md:text-xs font-bold text-[#CBA14D] uppercase tracking-[0.4em] mb-4">
              CURATED SELECTION
            </span>
            <h2 className="font-montserrat text-3xl md:text-5xl font-medium tracking-tight text-white">
              Signature Pieces
            </h2>
          </div>
          <div className="hidden md:block absolute right-0 bottom-7">
            <Link
              href="/all-products"
              className="flex items-center gap-2 font-montserrat text-[10px] font-bold text-[#EDEBE980] hover:text-[#CBA14D] transition-colors uppercase tracking-widest group"
            >
              VIEW ALL
              <span className="text-lg transition-transform group-hover:translate-x-1">
                <IconArrowRight size={20} />
              </span>
            </Link>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-10 no-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="min-w-70 md:min-w-87.5 flex-none snap-start group"
            >
              <div className="relative aspect-square overflow-hidden mb-6 bg-zinc-900">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="space-y-2">
                <p className="font-montserrat text-[10px] font-bold text-[#928E8780] uppercase tracking-widest">
                  {product.category}
                </p>
                <h3 className="font-inter text-base md:text-lg font-medium text-white/90">
                  {product.name}
                </h3>
                <p className="font-montserrat text-sm font-bold text-[#CBA14D]">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="md:hidden flex justify-center mt-4">
        <Link
          href="/all-products"
          className="font-montserrat text-[10px] font-bold text-[#CBA14D] uppercase tracking-widest"
        >
          View All Collection →
        </Link>
      </div>
    </section>
  );
};

export default SignaturePieces;
