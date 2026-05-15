"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const DescriptionTabs = ({ productAttributeRes, pdfDocuments }: any) => {
  // HTML CONTENT TABS
  const tabKeys = [
    { key: "DESCRIPTION", label: "DESCRIPTION" },
    { key: "DIMENSIONS", label: "DIMENSIONS" },
    { key: "FEATURES", label: "FEATURES" },
    { key: "Accessories Included", label: "ACCESSORIES" },
  ];

  // AVAILABLE TABS
  const availableTabs = [
    ...tabKeys
      .map((tab) => {
        const found = productAttributeRes?.find(
          (a: any) => a.attribute === tab.key,
        );

        return found
          ? {
              type: "html",
              label: tab.label,
              content: found.value,
            }
          : null;
      })
      .filter(Boolean),

    ...(pdfDocuments?.length
      ? [
          {
            type: "pdf",
            label: "DOCUMENTATION",
            documents: pdfDocuments,
          },
        ]
      : []),
  ];

  const [activeTab, setActiveTab] = useState(0);

  // HIDE COMPONENT IF NO DATA
  if (!availableTabs.length) return null;
const currentTab: any = availableTabs[activeTab];
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
            {/* PDF SECTION */}
            {availableTabs[activeTab]?.type === "pdf" ? (
              <div className="space-y-4">
                {currentTab?.documents?.map(
                  (doc: any, index: number) => (
                    <a
                      key={index}
                      href={doc.mediaURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-zinc-800 p-4 rounded-lg hover:border-[#9C824A] transition"
                    >
                      <div>
                        <p className="text-white text-sm font-medium">
                          Product Documentation
                        </p>

                        <p className="text-zinc-500 text-xs">PDF Document</p>
                      </div>

                      <Button
                        type="button"
                        className="bg-[#9C824A] text-black hover:bg-[#b89b5e]"
                      >
                        View PDF
                      </Button>
                    </a>
                  ),
                )}
              </div>
            ) : (
              // HTML CONTENT
              <div
                className="text-white/80 text-[15px] leading-[1.8] prose prose-invert"
                dangerouslySetInnerHTML={{
                  __html: (availableTabs[activeTab] as any)?.content || "",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionTabs;
