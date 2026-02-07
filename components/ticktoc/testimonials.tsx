"use client";

import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { FadeIn } from "./fade-in";

// Duplicate testimonials to fill space and create seamless loop
const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

export function Testimonials() {
  const t = useTranslations("testimonials");

  // Split testimonials into 3 columns
  const col1 = extendedTestimonials.filter((_, i) => i % 3 === 0);
  const col2 = extendedTestimonials.filter((_, i) => i % 3 === 1);
  const col3 = extendedTestimonials.filter((_, i) => i % 3 === 2);

  return (
    <section className="py-20 lg:py-28 px-4 overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground text-balance">
              {t("title")}
            </h2>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {t("subtitle")}
            </p>
            <div className="sakura-line max-w-32 mx-auto mt-5" />
          </div>
        </FadeIn>

        {/* 3-Column Scrolling Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-6">
          {/* Column 1 */}
          <div className="scroll-marquee-container">
            <div className="scroll-marquee space-y-5 pb-5">
              {col1.map((item, i) => (
                <TestimonialCard key={i} item={item} />
              ))}
            </div>
          </div>

          {/* Column 2 - Offset animation */}
          <div className="scroll-marquee-container hidden md:block">
            <div
              className="scroll-marquee space-y-5 pb-5"
              style={{ animationDelay: "-10s" }}
            >
              {col2.map((item, i) => (
                <TestimonialCard key={i} item={item} />
              ))}
            </div>
          </div>

          {/* Column 3 - Different offset */}
          <div className="scroll-marquee-container hidden lg:block">
            <div
              className="scroll-marquee space-y-5 pb-5"
              style={{ animationDelay: "-20s" }}
            >
              {col3.map((item, i) => (
                <TestimonialCard key={i} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile note */}
        <p className="text-xs text-muted-foreground text-center mt-8 lg:hidden">
          💡 Swipe or scroll to see more testimonials
        </p>
      </div>
    </section>
  );
}

function TestimonialCard({
  item,
}: {
  item: (typeof testimonials)[0];
}) {
  return (
    <div className="testimonial-card bg-card rounded-lg p-5 ticktoc-shadow border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-default">
      <Quote className="h-5 w-5 text-primary/20 mb-2" />
      <div className="flex gap-0.5 mb-2">
        {Array.from({ length: item.rating }).map((_, s) => (
          <Star
            key={s}
            className="h-3.5 w-3.5 fill-accent text-accent"
          />
        ))}
      </div>
      <p className="text-xs sm:text-sm text-foreground leading-relaxed mb-3 italic line-clamp-3">
        {`"${item.text}"`}
      </p>
      <div className="flex items-center gap-2 pt-2 border-t border-border">
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
          {item.avatar}
        </div>
        <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
          {item.name}
        </span>
      </div>
    </div>
  );
}
