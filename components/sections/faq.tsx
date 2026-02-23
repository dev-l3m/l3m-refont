"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export function FAQ({ title = "FAQ", subtitle, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-sand">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
        <div className="max-w-5xl">
          <FadeIn>
            <div className="mb-16">
              {title && (
                <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-6">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="font-serif text-xl lg:text-2xl leading-relaxed text-ink/80 font-light max-w-4xl">
                  {subtitle}
                </p>
              )}
            </div>
          </FadeIn>

          <div className="space-y-4">
            {items.map((item, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="border-l-2 border-accent/30 bg-white/50 hover:bg-white/80 transition-all duration-300 rounded-r-lg overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left p-6 lg:p-8 flex items-start justify-between gap-6 group focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-2 rounded-r-lg"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <span className="font-serif text-2xl lg:text-3xl font-medium text-accent/60 flex-shrink-0">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-sans text-lg lg:text-xl font-medium text-ink leading-relaxed group-hover:text-accent transition-colors duration-250">
                          {item.question}
                        </h3>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 lg:w-6 lg:h-6 text-muted flex-shrink-0 mt-1 transition-transform duration-300",
                        openIndex === index && "transform rotate-180 text-accent"
                      )}
                    />
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={cn(
                      "overflow-hidden transition-all duration-500 ease-in-out",
                      openIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                      <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
