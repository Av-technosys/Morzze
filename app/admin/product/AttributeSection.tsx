/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  productAttributes: Record<string, { value: string }>;
  handleValueChange: (attribute: string, value: string) => void;

  documents?: {
    key?: string;
    url: string;
    type?: string;
    name: string;
  }[];

  handlePdfUpload?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  setPdfDocuments?: (docs: any[]) => void;
};

const TABS = [
  "DESCRIPTION",
  "DIMENSIONS",
  "FEATURES",
  "Accessories Included",
  "Documentation",
];

export default function AttributeSection({
  productAttributes,
  handleValueChange,
  documents = [],
  handlePdfUpload,
  setPdfDocuments,
}: Props) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <Card className="m-1">
      <CardHeader>
        <CardTitle>
          Product Details & Specifications
        </CardTitle>
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
                  ? "bg-[#1f8297] text-white"
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
            {activeTab}
          </Label>

          {activeTab === "Documentation" ? (
            <div className="space-y-4">
              <Input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
              />

              <div className="space-y-2">
                {documents.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No PDF uploaded
                  </p>
                )}

                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border rounded-lg p-3 bg-white"
                  >
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {doc.name}
                    </a>

                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (!setPdfDocuments) return;

                        const updatedDocs = documents.filter(
                          (_, i) => i !== index
                        );

                        setPdfDocuments(updatedDocs);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <RichTextEditor
              value={
                productAttributes[activeTab]?.value ?? ""
              }
              onChange={(val) =>
                handleValueChange(activeTab, val)
              }
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}