import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const CommonEnquiries = () => {
  const faqs = [
    {
      question: "is the gold finish resistant to oxidation?",
      answer: "yes, our proprietary gold-architectural layer is engineered to be highly resistant to oxidation and tarnishing, ensuring a long-lasting luster even with daily use."
    },
    {
      question: "can this be installed as a top-mount?",
      answer: "absolutely. this unit is designed for versatile installation, supporting both top-mount and under-mount configurations depending on your kitchen's aesthetic."
    },
    {
      question: "what is the delivery timeline for bespoke units?",
      answer: "bespoke units typically undergo a precision crafting process that takes 4-6 weeks, followed by quality inspection and express worldwide shipping."
    }
  ]

  return (
    <div className="w-full bg-[#131313] py-24 px-6 font-inter">
      <div className="max-w-3xl mx-auto">
        
        {/* Header - Wahi matching font jo image mein hai */}
        <h2 className="text-center text-3xl md:text-4xl font-medium text-[#E5E2E1] mb-20 tracking-tight">
          Common Enquires
        </h2>

        <Accordion   className="w-full space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border-zinc-800 border-b-[0.5px] px-0" // Patli border
            >
              <AccordionTrigger className="text-[#E5E2E1] hover:text-white transition-colors text-[14px] md:text-[15px] font-light py-6 hover:no-underline text-left">
                {/* Image mein text lowercase hai, wahi feel rakhi hai */}
                <span className="lowercase leading-relaxed tracking-wide">
                  {faq.question}
                </span>
              </AccordionTrigger>
              
              <AccordionContent className="text-zinc-500 text-[14px] leading-relaxed pb-6 font-light">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </div>
  )
}

export default CommonEnquiries