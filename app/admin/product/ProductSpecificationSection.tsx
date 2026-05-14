"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/ui/rich-text-editor";

type Props = {
  productSpecifications: Record<string, { value: string }>;

  handleSpecificationChange: (
    attribute: string,
    value: string,
  ) => void;
};

const TABS = [
  "SPECIFICATIONS",
  "FEATURES & BOX",
  "REVIEWS",
];

export default function ProductSpecificationSection({
  productSpecifications,
  handleSpecificationChange,
}: Props) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <Card className="m-1">
      <CardHeader>
        <CardTitle>Product Specifications</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 border-b pb-4 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-[#1f8297] text-white"
                  : "border bg-white text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================================================= */}
        {/* SPECIFICATIONS */}
        {/* ================================================= */}

        {activeTab === "SPECIFICATIONS" && (
          <div className="bg-[#f8f9fa] p-5 rounded-xl">
            <Label className="text-xl font-bold mb-6 block">
              Product Specifications
            </Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Material */}
              <div className="space-y-2">
                <Label>Material</Label>

                <Input
                  placeholder="Enter Material"
                  value={productSpecifications.material?.value ?? ""}
                  onChange={(e) =>
                    handleSpecificationChange(
                      "material",
                      e.target.value,
                    )
                  }
                />
              </div>

              {/* Finish */}
              <div className="space-y-2">
                <Label>Finish</Label>

                <Input
                  placeholder="Enter Finish"
                  value={productSpecifications.finish?.value ?? ""}
                  onChange={(e) =>
                    handleSpecificationChange(
                      "finish",
                      e.target.value,
                    )
                  }
                />
              </div>

              {/* Dimensions */}
              <div className="space-y-2">
                <Label>Dimensions</Label>

                <Input
                  placeholder="Enter Dimensions"
                  value={productSpecifications.dimensions?.value ?? ""}
                  onChange={(e) =>
                    handleSpecificationChange(
                      "dimensions",
                      e.target.value,
                    )
                  }
                />
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <Label>Weight</Label>

                <Input
                  placeholder="Enter Weight"
                  value={productSpecifications.weight?.value ?? ""}
                  onChange={(e) =>
                    handleSpecificationChange(
                      "weight",
                      e.target.value,
                    )
                  }
                />
              </div>

              {/* Warranty */}
              <div className="space-y-2">
                <Label>Warranty</Label>

                <Input
                  placeholder="Enter Warranty"
                  value={productSpecifications.warranty?.value ?? ""}
                  onChange={(e) =>
                    handleSpecificationChange(
                      "warranty",
                      e.target.value,
                    )
                  }
                />
              </div>

              {/* SKU */}
              <div className="space-y-2">
                <Label>SKU</Label>

                <Input
                  placeholder="Enter SKU"
                  value={productSpecifications.sku?.value ?? ""}
                  onChange={(e) =>
                    handleSpecificationChange(
                      "sku",
                      e.target.value,
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* FEATURES & BOX */}
        {/* ================================================= */}

        {activeTab === "FEATURES & BOX" && (
          <div className="bg-[#f8f9fa] p-5 rounded-xl">
            <Label className="text-xl font-bold mb-4 block">
              Features & Box
            </Label>

            <RichTextEditor
              value={productSpecifications.featuresBox?.value ?? ""}
              onChange={(val) =>
                handleSpecificationChange(
                  "featuresBox",
                  val,
                )
              }
            />
          </div>
        )}

        {/* ================================================= */}
        {/* REVIEWS */}
        {/* ================================================= */}

        {activeTab === "REVIEWS" && (
          <div className="bg-[#f8f9fa] p-5 rounded-xl">
            <Label className="text-xl font-bold mb-4 block">
              Reviews
            </Label>

            <RichTextEditor
              value={productSpecifications.reviews?.value ?? ""}
              onChange={(val) =>
                handleSpecificationChange(
                  "reviews",
                  val,
                )
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}