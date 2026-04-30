    "use client"
import React from 'react'
import { Check } from 'lucide-react' // Lucide icons use kar raha hoon checkmark ke liye

const ProductComparison = () => {
  // Data structure: Columns aur Rows ka array
  const comparisonData = {
    headers: ["FEATURE", "V02-119LX (LUXE)", "Standard Single Bowl", "Modern Series III"],
    rows: [
      {
        feature: "CORE MATERIAL",
        v02: "Obsidian Composite",
        standard: "Quartz Blend",
        modern: "Ceramic Coated"
      },
      {
        feature: "ACOUSTIC SHIELD",
        v02: true, // true matlab checkmark dikhayenge
        standard: "Standard Pad",
        modern: "Single Layer"
      },
      {
        feature: "HEAT RESISTANCE",
        v02: "530°F",
        standard: "420°F",
        modern: "380°F"
      },
      {
        feature: "FINISH OPTIONS",
        v02: "12 Bespoke Finishes",
        standard: "3 Standard",
        modern: "4 Standard"
      }
    ]
  }

  return (
    <div className="w-full bg-[#0A0A0A] text-white py-10 p-4 md:p-10 font-inter">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-light mb-20 tracking-tight">
          How It Compares
        </h2>

        {/* Comparison Table */}
        <div className="overflow-x-auto overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-zinc-900">
                {comparisonData.headers.map((header, index) => (
                  <th 
                    key={index} 
                    className={`pb-8 text-[11px] font-bold tracking-[0.2em] text-left uppercase ${
                      index === 1 ? "text-white" : "text-zinc-500"
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-zinc-900">
              {comparisonData.rows.map((row, index) => (
                <tr key={index} className="group hover:bg-zinc-950/30 transition-colors">
                  {/* Feature Name */}
                  <td className="py-8 text-[11px] font-bold tracking-[0.15em] text-zinc-400 uppercase">
                    {row.feature}
                  </td>

                  {/* V02 Data (Primary Product) */}
                  <td className="py-8 text-[13px] font-light text-zinc-300">
                    {row.v02 === true ? (
                      <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      row.v02
                    )}
                  </td>

                  {/* Standard Model Data */}
                  <td className="py-8 text-[13px] font-light text-zinc-500">
                    {row.standard}
                  </td>

                  {/* Modern Series Data */}
                  <td className="py-8 text-[13px] font-light text-zinc-500">
                    {row.modern}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default ProductComparison