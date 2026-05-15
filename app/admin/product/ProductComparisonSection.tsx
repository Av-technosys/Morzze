"use client";

import { Input } from "@/components/ui/input";

const FIXED_COMPARE_FIELDS = [
  "CORE MATERIAL",
  "ACOUSTIC SHIELD",
  "HEAT RESISTANCE",
  "FINISH OPTIONS",
];

const ProductComparisonSection = ({
  compareFields,
  setCompareFields,
}: any) => {
  return (
    <div className="space-y-4 bg-white rounded-4xl py-4 px-4">

      {FIXED_COMPARE_FIELDS.map((feature, index) => (
        <div
          key={feature}
          className="grid md:grid-cols-2 gap-4 border p-4 rounded-xl"
        >
          {/* FIXED FEATURE NAME */}
          <div className="font-semibold text-sm text-gray-700">
            {feature}
          </div>

          {/* VALUE INPUT ONLY */}
          <Input
            placeholder="Enter value"
           value={compareFields?.[index]?.value ?? ""}
           onChange={(e) => {
  const updated = [...compareFields];

  updated[index] = {
    feature,
    value: e.target.value,
  };

  setCompareFields(updated);
            }}
          />
        </div>
      ))}

    </div>
  );
};

export default ProductComparisonSection;