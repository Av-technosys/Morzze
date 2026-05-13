/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/ui/rich-text-editor";

type TechnicalSpecsProps = {
  productAttributes: Record<string, { value: string }>;
  handleValueChange: (attribute: string, value: string) => void;
};

const TECH_TABS = ["SPECIFICATIONS", "FEATURES & BOX", "REVIEWS"];

const SPEC_GRID_FIELDS = [
  { id: "Material", label: "Material" },
  { id: "Finish", label: "Finish" },
  { id: "DIMENSIONS", label: "Dimensions" },
  { id: "Weight", label: "Weight" },
  { id: "Warranty", label: "Warranty" },
  { id: "SKU", label: "SKU" },
  { id: "size", label: "Finishes (Comma separated)" },
];

export default function TechnicalSpecsSection({ 
  productAttributes, 
  handleValueChange 
}: TechnicalSpecsProps) {
  const [activeTab, setActiveTab] = useState(TECH_TABS[0]);

  return (
    <Card className="border-t-4 border-t-[#9C824A] shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tight text-gray-800">
          Technical & Extra Details
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Tab Navigation - Based on Screenshot 2026-05-13 175938.png */}
        <div className="flex gap-8 border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
          {TECH_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[11px] font-bold tracking-[0.2em] transition-all relative whitespace-nowrap ${
                activeTab === tab ? "text-black" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9C824A]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="min-h-[300px]">
          {activeTab === "SPECIFICATIONS" ? (
            /* GRID VIEW FOR SPECS */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 animate-in fade-in duration-300">
              {SPEC_GRID_FIELDS.map((field) => (
                <div key={field.id} className="flex flex-col space-y-1.5 group">
                  <Label className="text-[10px] uppercase text-gray-400 font-bold tracking-widest group-focus-within:text-[#9C824A] transition-colors">
                    {field.label}
                  </Label>
                  <Input
                    placeholder={`Enter ${field.label}...`}
                    value={productAttributes[field.id]?.value ?? ""}
                    onChange={(e) => handleValueChange(field.id, e.target.value)}
                    className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#9C824A] bg-transparent text-sm font-medium placeholder:text-gray-300 transition-all italic"
                  />
                </div>
              ))}
            </div>
          ) : (
            /* RICH TEXT FOR OTHER TABS */
            <div className="animate-in fade-in duration-300">
              <Label className="text-sm font-semibold text-gray-600 mb-4 block italic">
                {activeTab} Content (Will display as paragraphs/lists)
              </Label>
              <RichTextEditor
                value={productAttributes[activeTab]?.value ?? ""}
                onChange={(val) => handleValueChange(activeTab, val)}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}