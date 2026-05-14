"use client";

import React, { useState } from "react";

const SpecificationsTabs = ({ productAttributeRes }: any) => {
  const [activeTab, setActiveTab] = useState(0);

  // =================================================
  // GET DATA FROM API RESPONSE
  // =================================================

  const getAttributeValue = (key: string) => {
    return (
      productAttributeRes?.find(
        (a: any) => a.attribute === key
      )?.value || ""
    );
  };

  // =================================================
  // TABS
  // =================================================

  const tabs = [
    "SPECIFICATIONS",
    "FEATURES & BOX",
    "REVIEWS",
  ];

  // =================================================
  // SPECIFICATION DATA
  // =================================================

  const specData = [
    {
      label: "Material",
      value: getAttributeValue("material"),
    },
    {
      label: "Finish",
      value: getAttributeValue("finish"),
    },
    {
      label: "Dimensions",
      value: getAttributeValue("dimensions"),
    },
    {
      label: "Weight",
      value: getAttributeValue("weight"),
    },
    {
      label: "Warranty",
      value: getAttributeValue("warranty"),
    },
    {
      label: "SKU",
      value: getAttributeValue("sku"),
    },
  ].filter((item) => item.value);

  // =================================================
  // HTML CONTENT
  // =================================================

  const featuresBox =
    getAttributeValue("featuresBox");

  const reviews =
    getAttributeValue("reviews");

  // hide component if no data
  if (
    !specData.length &&
    !featuresBox &&
    !reviews
  )
    return null;

  return (
    <div className="w-full bg-black py-10 p-4 md:p-10 text-white font-inter">
      <div className="max-w-7xl mx-auto">
        {/* ========================================= */}
        {/* TAB HEADERS */}
        {/* ========================================= */}

        <div className="flex gap-10 border-b border-zinc-900 overflow-x-auto no-scrollbar">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`pb-4 text-[11px] tracking-[0.2em] font-medium transition-all relative whitespace-nowrap ${
                activeTab === index
                  ? "text-white"
                  : "text-zinc-600"
              }`}
            >
              {tab}

              {activeTab === index && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9C824A]" />
              )}
            </button>
          ))}
        </div>

        {/* ========================================= */}
        {/* SPECIFICATIONS */}
        {/* ========================================= */}

        <div className="py-8">
          {activeTab === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-zinc-900/50">
              {specData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center border-b border-zinc-900 py-5 px-4 group hover:bg-zinc-950/50 transition-colors"
                >
                  {/* Label */}
                  <div className="w-1/3 text-[#555] text-[13px] font-light">
                    {item.label}
                  </div>

                  {/* Value */}
                  <div className="w-2/3 text-zinc-300 text-[13px] font-medium tracking-wide">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ========================================= */}
          {/* FEATURES & BOX */}
          {/* ========================================= */}

          {activeTab === 1 && (
            <div
              className="prose prose-invert max-w-none text-zinc-300"
              dangerouslySetInnerHTML={{
                __html: featuresBox,
              }}
            />
          )}

          {/* ========================================= */}
          {/* REVIEWS */}
          {/* ========================================= */}

          {activeTab === 2 && (
            <div
              className="prose prose-invert max-w-none text-zinc-300"
              dangerouslySetInnerHTML={{
                __html: reviews,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecificationsTabs;