import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

type CommonEnquiriesProps = {
  faqs: FAQ[];
};

const CommonEnquiries = ({ faqs }: CommonEnquiriesProps) => {
  // agar faq nahi hai to section hide
  if (!faqs?.length) return null;

  return (
    <div className="w-full bg-[#131313] py-24 px-6 font-inter">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-center text-3xl md:text-4xl font-medium text-[#E5E2E1] mb-20 tracking-tight">
          Common Enquiries
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              value={`item-${index}`}
              className="border-zinc-800 border-b-[0.5px] px-0"
            >
              <AccordionTrigger className="text-[#E5E2E1] hover:text-white transition-colors text-[14px] md:text-[15px] font-light py-6 hover:no-underline text-left">
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
  );
};

export default CommonEnquiries;