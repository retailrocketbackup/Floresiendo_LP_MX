"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export function FAQAccordion({ items, title, subtitle }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-burgundy mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-warm-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}

      <div className="space-y-4 max-w-3xl mx-auto">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-coral/30 shadow-lg shadow-coral/5"
                  : "border-warm-gray-100 hover:border-warm-gray-200 hover:shadow-md"
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-6 text-left gap-4 focus-ring rounded-2xl group"
                aria-expanded={isOpen}
                aria-controls={`faq-content-${index}`}
              >
                <span
                  className={`font-semibold text-lg transition-colors duration-200 ${
                    isOpen ? "text-coral" : "text-warm-gray-800 group-hover:text-burgundy"
                  }`}
                >
                  {item.question}
                </span>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen
                      ? "bg-coral text-white rotate-180"
                      : "bg-warm-gray-100 text-warm-gray-500 group-hover:bg-coral/10 group-hover:text-coral"
                  }`}
                >
                  <ChevronDown size={20} className="transition-transform duration-300" />
                </div>
              </button>

              <div
                id={`faq-content-${index}`}
                ref={(el) => { contentRefs.current[index] = el; }}
                className="grid transition-all duration-300 ease-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                }}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-0">
                    <div className="w-12 h-0.5 bg-coral/20 rounded-full mb-4" />
                    <p className="text-warm-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
