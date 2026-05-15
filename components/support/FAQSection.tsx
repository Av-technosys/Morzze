"use client";
import React, { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

// 1. Data ko bahar nikal lo handle karne ke liye
const FAQ_CONTENT = {
  "General": [
    { q: "What's your helpline number?", a: "You can reach our support team at +91 123 456 7890." },
    { q: "What's your helpline number?", a: "You can reach our support team at +91 123 456 7890." },
  ],
  "Stainless Steel Sink": [
    { q: "What grade of steel do you use?", a: "We use premium 304-grade stainless steel." },
  ],
  "Faucets": [
    { q: "What is the warranty?", a: "7-year leak-proof warranty." },
  ],
  "Quartz Sink": [
    { q: "Is it heat resistant?", a: "Yes, up to 280°C." },
  ],
  "Accessories": [
    { q: "Do you sell soap dispensers?", a: "Yes, we have a range of matching dispensers." },
  ]
} as const; // 'as const' use karne se types rigid ho jate hain

// 2. Keys ki type nikal lo (General | Faucets etc.)
type CategoryType = keyof typeof FAQ_CONTENT;

const FAQSection = () => {
  // 3. State ko batao ki wo sirf CategoryType hi ho sakta hai
  const [activeCategory, setActiveCategory] = useState<CategoryType>("General");

  const categories = Object.keys(FAQ_CONTENT) as CategoryType[];

  return (
    <div className="space-y-16">
      <div className="flex justify-center gap-3 flex-wrap">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-[11px] font-bold transition-all border ${
              activeCategory === cat 
                ? 'bg-[#FDB813] text-black border-[#FDB813]' 
                : 'bg-transparent text-white border-white/10 hover:border-white/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <h3 className="text-center text-white font-bold tracking-[4px] text-sm uppercase">
            {activeCategory}
          </h3>
          
          <Accordion type="single" collapsible className="w-full space-y-3">
            {/* Ab yahan Red Line nahi aayegi kyunki TS ko pata hai activeCategory valid key hai */}
            {FAQ_CONTENT[activeCategory].map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-none bg-[#0D0D0D] px-6 rounded-lg"
              >
                <AccordionTrigger className="text-white hover:no-underline text-sm py-5 font-medium text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/80 pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;