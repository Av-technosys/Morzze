"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Plus, Trash2 } from "lucide-react";

type FAQItem = {
  id?: string;
  question: string;
  answer: string;
};

type Props = {
  faqs: FAQItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQItem[]>>;
};

export default function ProductFaqSection({
  faqs,
  setFaqs,
}: Props) {
  // ADD FAQ
  const addFaq = () => {
    setFaqs([
      ...faqs,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  // REMOVE FAQ
  const removeFaq = (index: number) => {
    const updated = faqs.filter((_, i) => i !== index);
    setFaqs(updated);
  };

  // UPDATE FAQ
  const updateFaq = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updated = [...faqs];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setFaqs(updated);
  };

  return (
    <Card className="m-1">
      <CardHeader>
        <CardTitle>Product FAQs</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-2xl p-5 space-y-4 bg-[#fafafa]"
          >
            {/* TOP BAR */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-gray-700">
                FAQ #{index + 1}
              </h3>

              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeFaq(index)}
              >
                <Trash2 size={16} />
              </Button>
            </div>

            {/* QUESTION */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Question
              </label>

              <Input
                placeholder="Enter FAQ question"
                value={faq.question}
                onChange={(e) =>
                  updateFaq(
                    index,
                    "question",
                    e.target.value
                  )
                }
              />
            </div>

            {/* ANSWER */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Answer
              </label>

              <Textarea
                placeholder="Enter FAQ answer"
                value={faq.answer}
                onChange={(e) =>
                  updateFaq(
                    index,
                    "answer",
                    e.target.value
                  )
                }
                className="min-h-[120px]"
              />
            </div>
          </div>
        ))}

        {/* ADD BUTTON */}
        <Button
          type="button"
          variant="outline"
          onClick={addFaq}
          className="w-full"
        >
          <Plus size={16} className="mr-2" />
          Add FAQ
        </Button>
      </CardContent>
    </Card>
  );
}