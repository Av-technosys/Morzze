"use client"
import React, { useState } from "react";

const DescriptionTabs = ({ product }: any) => {

  const tabs = product.tabs || []; // 🔥 direct use

  const [activeTab, setActiveTab] = useState(0);

  if (!tabs.length) return null;

  return (
    <div className="w-full bg-black py-10 p-4 md:p-10 font-inter">
      <div className="max-w-7xl mx-auto">

        {/* TAB HEADERS */}
        <div className="flex items-center gap-10 border-b border-zinc-900 overflow-x-auto">
          {tabs.map((tab: any, index: number) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`pb-4 text-[11px] tracking-[0.25em] font-medium relative whitespace-nowrap ${
                activeTab === index
                  ? "text-white"
                  : "text-zinc-600 hover:text-zinc-400"
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
            <p className="text-[#928E87] text-[15px] leading-[1.8] whitespace-pre-line">
              {tabs[activeTab]?.content}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DescriptionTabs;