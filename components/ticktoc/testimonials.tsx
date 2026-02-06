"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { FadeIn } from "./fade-in";

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-20 lg:py-28 px-4">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground text-balance">
              {t("title")}
            </h2>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {t("subtitle")}
            </p>
            <div className="sakura-line max-w-32 mx-auto mt-5" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="bg-card rounded-xl p-6 ticktoc-shadow">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: item.rating }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  {`"${item.text}"`}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                    {item.avatar}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {item.name}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
