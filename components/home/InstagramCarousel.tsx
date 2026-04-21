"use client"
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const images = [
  "/insta1.png", "/insta2.png", "/insta3.png",
  "/insta4.png", "/insta5.png", "/insta4.png",
];

export default function InstagramCarousel() {
  const containerRef = useRef(null);

  return (
    <div className="relative text-white py-24 overflow-hidden ">
      
      {/* ✅ Background Image using Next Image */}
      <Image
        src="/insta-bg.png"
        alt="background"
        fill
        priority
        className="object-cover object-center -z-10"
      />

      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70 " />

      <div className="relative z-10 max-w-7xl mx-auto text-center px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-12 space-y-4">
          <span className="block font-montserrat text-xs md:text-sm font-bold text-[#CBA14D] uppercase tracking-[0.4em]">
            @MORZZEINDIA
          </span>

          <h2 className="font-montserrat text-3xl md:text-5xl font-medium uppercase tracking-tight">
            FOLLOW US ON <span className="text-[#CBA14D]">INSTAGRAM</span>
          </h2>

          <p className="font-inter text-[#928E87] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Get inspired by our latest designs and see how our customers transform their spaces
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              ref={containerRef}
              className="flex gap-4 md:gap-6"
              animate={{ x: [0, -1200] }}
              transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
            >
              {[...images, ...images].map((src, index) => (
                <div
                  key={index}
                  className="min-w-[240px] md:min-w-[220px] aspect-square bg-[#111] border border-white/10 group overflow-hidden"
                >
                  <img
                    src={src}
                    alt="insta post"
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Fades */}
          <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-[#0A0A0A] to-transparent z-20" />
          <div className="absolute inset-y-0 right-0 w-5 bg-gradient-to-l from-[#0A0A0A] to-transparent z-20" />
        </div>

        {/* Button */}
        <div className="mt-16">
          <Button 
            variant="outline"
            className="h-14 px-12 rounded-md font-montserrat border-[#CBA14D] text-[#CBA14D] hover:bg-[#CBA14D] hover:text-black font-bold uppercase tracking-[0.2em] transition-all duration-500 bg-transparent border-2"
          >
            FOLLOW @MORZZEINDIA
          </Button>
        </div>
      </div>
    </div>
  );
}