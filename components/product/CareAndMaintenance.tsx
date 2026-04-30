"use client"
import React from 'react'
import { Droplets, Sparkles, Wand2, Ban } from 'lucide-react'

const CareAndMaintenance = () => {
  // 1. Data array for the cards
  const careSteps = [
    {
      title: "Daily Radiance",
      description: "To maintain the obsidian luster, we recommend a simple rinse with warm water and a micro-fiber cloth after each use. Avoid abrasive steel pads which may disrupt the nano-sealant architectural layer.",
      icon: <Droplets className="w-6 h-6 text-[#FFC637]" />, // Gold color icon
    },
    {
      title: "Daily Preservation",
      description: "The high-precision drain assembly is engineered for optimal flow. Monthly cleaning with our organic citric-based solvent or baking soda will prevent sediment buildup in the gold-plated filters.",
      icon: <Sparkles className="w-6 h-6 text-[#FFC637]" />,
    },
    {
      title: "Weekly Polish",
      description: "Enhance the deep obsidian hue once a week using a specialized stainless steel cleaner or a solution of diluted white vinegar. Apply with a soft cloth following the grain direction of the composite.",
      icon: <Wand2 className="w-6 h-6 text-[#FFC637]" />,
    },
    {
      title: "Avoid These",
      description: "", // List style content for the last card
      icon: <Ban className="w-6 h-6 text-[#FFB4AB]" />, // Red-ish for warning
      isList: true,
      listItems: [
        "Steel wool & abrasive pads",
        "Bleach-based harsh cleaners",
        "Prolonged contact with acidic foods",
        "Industrial-strength solvents"
      ]
    }
  ]

  return (
    <div className="w-full bg-black text-white py-24 px-6 font-inter">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <p className="text-[#FFC637] text-[10px] tracking-[0.4em] uppercase font-bold mb-3">
            PRESERVATION
          </p>
          <h2 className="text-3xl text-[#E5E2E1] md:text-5xl font-medium tracking-tight">
            Care & Maintenance
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careSteps.map((step, index) => (
            <div 
              key={index} 
              className="bg-[#0F0F0F] p-8 rounded-xl border border-zinc-900/50 hover:border-[#A88B4A]/30 transition-all duration-500 group"
            >
              {/* Icon Container */}
              <div className="mb-8 ">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium mb-6 text-[#E5E2E1]">
                {step.title}
              </h3>

              {/* Content */}
              {step.isList ? (
                <ul className="space-y-3">
                  {step.listItems?.map((item, i) => (
                    <li key={i} className="text-[#D0C5AF] text-[13px] font-light leading-relaxed flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#D0C5AF] text-[13px] font-light leading-[1.8]">
                  {step.description}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default CareAndMaintenance