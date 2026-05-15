"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const press = [
  {
    logo: "BI",
    source: "Better Interiors",
    date: "February 28, 2024",
    title: "Sustainable Sanitary Ware: Morzze Leads Water Conservation",
    desc: "How the premium bathroom fittings brand is revolutionizing water efficiency with 5-star rated faucets.",
  },
  {
    logo: "HDT",
    source: "Home & Design Trends",
    date: "January 20, 2024",
    title: "Top 10 Kitchen Faucet Brands in India 2024",
    desc: "Morzze secures top position in annual rankings for pull-out kitchen faucets, pot fillers, and water purifier taps.",
  },
  {
    logo: "ET",
    source: "Economic Times",
    date: "December 10, 2023",
    title: "Morzze Expands Kitchen Sink Manufacturing Capacity",
    desc: "Premium sanitary ware manufacturer announces new facility for granite composite and stainless steel kitchen sinks.",
  },
  {
    logo: "DD",
    source: "Design Dekko",
    date: "November 5, 2023",
    title: "Interview: Crafting the Perfect Bathroom Experience",
    desc: "The design head shares insights on creating cohesive bathroom spaces with matching faucets, showers, and accessories.",
  },
  {
    logo: "BS",
    source: "Business Standard",
    date: "October 18, 2023",
    title: "Morzze Reports 40% Growth in Bathroom Fittings Segment",
    desc: "Strong demand for premium sanitary ware and luxury shower systems drives impressive financial performance.",
  },
];

export default function PressCoverageSection() {
  return (
    <section className="w-full bg-black text-white px-4 md:px-8 lg:px-10 py-16 md:py-20">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.42em] text-[#d39b10] font-medium mb-4">
          In The News
        </p>
        <h2 className="text-[38px] md:text-[52px] font-semibold tracking-[-0.03em] mb-10">
          Press Coverage
        </h2>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-[#121212] px-5 md:px-8 py-8 md:py-10 grid lg:grid-cols-2 gap-8 items-center text-left mb-6"
        >
          <div>
            <span className="inline-block px-3 py-[4px] rounded-full bg-[#f4e8c7] text-[#9b5d00] text-[10px] mb-4">
              Featured Story
            </span>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-[#1a1a1a] flex items-center justify-center text-[#e6aa12] text-[11px] font-semibold">
                AD
              </div>
              <div>
                <p className="text-[15px]">Architectural Digest India</p>
                <p className="text-[12px] text-white/60">March 15, 2024</p>
              </div>
            </div>
            <h3 className="text-[28px] md:text-[34px] font-semibold leading-[1.4] mb-5">
              Morzze Unveils Premium Rain Shower Collection for Luxury Bathroom
            </h3>
            <p className="text-[14px] leading-8 text-white/60 mb-5">
              The new range features thermostatic controls, rainfall heads, and
              spa-inspired designs that transform everyday bathrooms into
              wellness retreats..
            </p>
            <button className="text-[#d39b10] text-[13px] font-medium">
              Read Full Article →
            </button>
          </div>
          <div className="relative w-full h-[240px] md:h-[320px] overflow-hidden">
            <Image
              src="/exhibition.png"
              alt="Press"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 text-left">
          {press.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="bg-[#121212] border border-[#2a2a2a] p-4 min-h-[220px]"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-[4px] bg-[#ececec] text-black flex items-center justify-center text-[10px] font-semibold">
                  {item.logo}
                </div>
                <div>
                  <p className="text-[13px]">{item.source}</p>
                  <p className="text-[11px] text-white/50">{item.date}</p>
                </div>
              </div>
              <h4 className="text-[16px] leading-7 font-medium mb-4">
                {item.title}
              </h4>
              <p className="text-[12px] leading-6 text-white/50 mb-5">
                {item.desc}
              </p>
              <button className="text-[#d39b10] text-[12px]">Read more</button>
            </motion.div>
          ))}
        </div>

        <button className="px-14 h-11 border border-[#d39b10] text-[#d39b10] text-[12px] hover:bg-[#d39b10] hover:text-black transition">
          VIEW ALL PRESS RELEASES
        </button>
      </div>
    </section>
  );
}
