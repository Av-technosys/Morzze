"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, HardDrive, CalendarDays, Download } from "lucide-react";

const tabs = [
  "All",
  "Complete Collection",
  "Bathroom Fittings",
  "Shower Systems",
  "Kitchen",
  "Sanitary Ware",
  "Accessories",
  "Bathtubs",
  "Wellness",
];

const catalogues = [
  {
    tab: "Complete Collection",
    title: "Morzze Complete Collection 202",
    desc: "Our flagship catalogue featuring the entire premium bathroom fittings, kitchen sinks,",
    pages: "180 pages",
    size: "28 MB",
    year: "2024",
  },
  {
    tab: "Shower Systems",
    title: "Shower Systems & Rain Heads",
    desc: "Complete shower solutions — overhead rain showers, handheld showers, thermostatic s",
    pages: "44 pages",
    size: "11 MB",
    year: "2024",
  },
  {
    tab: "Kitchen",
    title: "Kitchen Sinks & Faucets",
    desc: "Premium kitchen sinks in stainless steel, granite composite, and ceramic — paired with pull",
    pages: "40 pages",
    size: "10 MB",
    year: "2024",
  },
  {
    tab: "Bathroom Fittings",
    title: "Bathroom Fittings & Faucets",
    desc: "Explore our full range of bathroom faucets, mixers, wall-mounted taps, and concealed",
    pages: "52 pages",
    size: "14 MB",
    year: "2024",
  },
  {
    tab: "Sanitary Ware",
    title: "Sanitary Ware & Wash Basin",
    desc: "Designer wash basins, wall-hung WCs, floor mounted toilets, bidets, and complete bath",
    pages: "48 pages",
    size: "13 MB",
    year: "2024",
  },
  {
    tab: "Accessories",
    title: "Bathroom Accessories & Hardware",
    desc: "Towel rails, toilet paper holders, soap dispensers, robe hooks, mirrors, and complete bathroo",
    pages: "36 pages",
    size: "9 MB",
    year: "2024",
  },
  {
    tab: "Bathtubs",
    title: "Bathtubs & Whirlpool Systems",
    desc: "Freestanding bathtubs, built-in soaking tubs, whirlpool systems, and acrylic bath suites c",
    pages: "30 pages",
    size: "8 MB",
    year: "2024",
  },
  {
    tab: "Sanitary Ware",
    title: "Sanitary Ware & Wash Basin",
    desc: "Designer wash basins, wall-hung WCs, floor mounted toilets, bidets, and complete bath",
    pages: "48 pages",
    size: "13 MB",
    year: "2024",
  },
];

export default function CatalogueGridDownloads() {
  const [activeTab, setActiveTab] = useState("All");
  const filtered =
    activeTab === "All"
      ? catalogues
      : catalogues.filter((c) => c.tab === activeTab);

  return (
    <section className="w-full bg-black text-white">
      <div className="px-4 md:px-8 lg:px-10 py-10 md:py-14 max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="overflow-x-auto scrollbar-hidden  border-b border-[#1d1d1d] pb-5 mb-12">
          <div className="flex  min-w-max">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(tab)}
                className={`px-7 h-10 rounded-full text-[13px] whitespace-nowrap ${activeTab === tab ? "bg-[#e6aa12] text-black" : "text-white"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group"
              >
                <div className="relative w-full h-[260px] overflow-hidden rounded-[2px] mb-4 bg-[#efefef]">
                  <Image
                    src="/video.png"
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                <h3 className="text-[15px] font-medium text-[#f5f2ea] mb-2">
                  {item.title}
                </h3>
                <p className="text-[12px] leading-6 text-[#777777] mb-4">
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-3 text-[10px] text-[#777777] mb-4">
                  <span className="flex items-center gap-1">
                    <FileText size={11} /> {item.pages}
                  </span>
                  <span className="flex items-center gap-1">
                    <HardDrive size={11} /> {item.size}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays size={11} /> {item.year}
                  </span>
                </div>

                <button className="w-full h-10 border border-[#d39b10] text-[#d39b10] text-[12px] flex items-center justify-center gap-2 hover:bg-[#d39b10] hover:text-black transition">
                  <Download size={13} /> Download PDF
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
