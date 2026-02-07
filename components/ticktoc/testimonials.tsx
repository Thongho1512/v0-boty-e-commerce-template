"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { FadeIn } from "./fade-in";

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-20 lg:py-28 px-4 overflow-hidden">
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
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-xl p-6 ticktoc-shadow border border-border relative"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: item.rating }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4 italic">
                  {`"${item.text}"`}
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {item.avatar}
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {item.name}
                  </span>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
