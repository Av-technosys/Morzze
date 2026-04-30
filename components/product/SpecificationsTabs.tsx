"use client"
import React, { useState } from 'react'

const SpecificationsTabs = () => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = ["SPECIFICATIONS", "FEATURES & BOX", "REVIEWS"]

  // Specifications ka data array
  const specData = [
    { label: "Material", value: "304 Stainless Steel" },
    { label: "Finish", value: "Chrome" },
    { label: "Dimensions", value: "354 × 289 × 238 mm" },
    { label: "Weight", value: "3.7 kg" },
    { label: "Warranty", value: "12 Months" },
    { label: "SKU", value: "MRZ-ST001" },
  ]

  return (
    <div className="w-full bg-black py-10 p-4 md:p-10 text-white font-inter">
      <div className="max-w-7xl mx-auto">
        
        {/* Tab Headers */}
        <div className="flex gap-10 border-b border-zinc-900 overflow-x-auto no-scrollbar">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`pb-4 text-[11px] tracking-[0.2em] font-medium transition-all relative whitespace-nowrap ${
                activeTab === index ? "text-white" : "text-zinc-600"
              }`}
            >
              {tab}
              {activeTab === index && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9C824A]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content (Table Grid) */}
        <div className="py-8">
          {activeTab === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-zinc-900/50">
              {specData.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center border-b border-zinc-900 py-5 px-4 group hover:bg-zinc-950/50 transition-colors"
                >
                  {/* Label (Left Side) */}
                  <div className="w-1/3 text-[#555] text-[13px] font-light">
                    {item.label}
                  </div>
                  {/* Value (Right Side) */}
                  <div className="w-2/3 text-zinc-300 text-[13px] font-medium tracking-wide">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Other Tabs Placeholder */}
          {activeTab !== 0 && (
            <div className="py-10 text-zinc-600 text-sm italic">
              {tabs[activeTab]} content will be displayed here.
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default SpecificationsTabs