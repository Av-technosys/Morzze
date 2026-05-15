/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { Input } from "@/components/ui/input";

type Props = {
  productAttributes: Record<string, { value: string }>;
  handleValueChange: (attribute: string, value: string) => void;

  documents?: {
    key?: string;
    url: string;
    type?: string;
    name: string;
  }[];

  pdfDocuments?: {
    name: string;
    url: string;
  }[];

  handlePdfUpload?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  setPdfDocuments?: any;
};

const TABS = ["DESCRIPTION", "DIMENSIONS", "FEATURES", "Accessories Included", "Documentation"];

export default function AttributeSection({
  productAttributes,
  handleValueChange,
  documents = [],
  pdfDocuments = [],
  handlePdfUpload,
}: Props) {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const allDocuments =
  pdfDocuments.length > 0 ? pdfDocuments : documents;

  return (
    <Card className="m-1">
      <CardHeader>
        <CardTitle>Product Details & Specifications</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Tabs Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b pb-4 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#1f8297] text-white" // Adjust primary color as needed
                  : "border bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4 bg-[#f8f9fa] p-4 rounded-xl min-h-[300px]">
          <Label className="text-xl font-bold mb-4 block text-gray-800">
            {activeTab === "Usage" ? "How to Use" : activeTab}
          </Label>
          
          {activeTab === "Documentation" ? (
  <div className="space-y-4">
    <Input
      type="file"
      accept="application/pdf"
      onChange={handlePdfUpload}
    />

    <div className="space-y-2">
      {documents.map((doc, index) => (
        <a
          key={index}
          href={doc.url}
          target="_blank"
          className="block text-blue-600 underline"
        >
          {doc.name}
        </a>
      ))}
    </div>
  </div>
) : (
  <RichTextEditor
    value={productAttributes[activeTab]?.value ?? ""}
    onChange={(val) => handleValueChange(activeTab, val)}
  />
)}
        </div>
      </CardContent>
    </Card>
  );
}
