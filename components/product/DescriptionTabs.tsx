"use client";
import React, { useState } from "react";

const DescriptionTabs = ({ productAttributeRes }: any) => {
  // 1. Array se relevant tabs filter karke list banao
  const tabKeys = [
    { key: "DESCRIPTION", label: "DESCRIPTION" },
    { key: "DIMENSIONS", label: "DIMENSIONS" },
    { key: "FEATURES", label: "FEATURES" },
    { key: "Accessories Included", label: "ACCESSORIES" },
    { key: "Documentation", label: "DOCUMENTATION" },
  ];

  // 2. Sirf wahi tabs nikalo jinka data API response mein hai
  const availableTabs = tabKeys
    .map((tab) => {
      const found = productAttributeRes?.find((a: any) => a.attribute === tab.key);
      return found ? { label: tab.label, content: found.value } : null;
    })
    .filter(Boolean);

  const [activeTab, setActiveTab] = useState(0);

  // Agar koi data nahi hai to component hide rakho
  if (!availableTabs.length) return null;

  return (
    <div className="w-full bg-black py-10 p-4 md:p-10 font-inter border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* TAB HEADERS */}
        <div className="flex items-center gap-10 border-b border-zinc-900 overflow-x-auto no-scrollbar">
          {availableTabs.map((tab: any, index: number) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`pb-4 text-[11px] tracking-[0.25em] font-medium relative whitespace-nowrap transition-colors ${
                activeTab === index ? "text-white" : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              {tab.label}
              {activeTab === index && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9C824A]" />
              )}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="py-10">
          <div className="max-w-5xl">
            {/* Kyunki aapka data HTML span tags ke saath aa raha hai */}
            <div
              className="text-white/80 text-[15px] leading-[1.8] prose prose-invert"
              dangerouslySetInnerHTML={{ __html: availableTabs[activeTab]?.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionTabs;