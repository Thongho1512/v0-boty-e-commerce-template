"use client";

import { useTranslations } from "next-intl";
import { BadgeDollarSign, Sparkles, Zap, Shield } from "lucide-react";
import { FadeIn } from "./fade-in";

const icons = [BadgeDollarSign, Sparkles, Zap, Shield];
const keys = ["price", "variety", "service", "quality"];

export function WhyUs() {
  const t = useTranslations("whyUs");

  return (
    <section className="py-20 lg:py-28 px-4 bg-secondary">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {keys.map((key, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={key} delay={i * 0.1}>
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {t(key)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`${key}Desc`)}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
