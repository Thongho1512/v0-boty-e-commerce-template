"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { kimonoPlans, formatVND } from "@/lib/data";
import { FadeIn } from "./fade-in";

const featuredIds = ["women-basic", "women-lace", "furisode", "men-basic"];

export function FeaturedPlans() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = `/${locale}`;
  const featured = kimonoPlans.filter((p) => featuredIds.includes(p.id));

  return (
    <section className="py-20 lg:py-28 px-4">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground text-balance">
              {t("featured.title")}
            </h2>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {t("featured.subtitle")}
            </p>
            <div className="sakura-line max-w-32 mx-auto mt-5" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((plan, i) => (
            <FadeIn key={plan.id} delay={i * 0.1}>
              <Link href={`${prefix}/plans/${plan.slug}`}>
                <motion.article
                  whileHover={{ y: -6 }}
                  className="group bg-card rounded-xl overflow-hidden ticktoc-shadow ticktoc-transition"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={plan.image || "/placeholder.svg"}
                      alt={t(`plans.${plan.translationKey}.title`)}
                      fill
                      className="object-cover group-hover:scale-105 ticktoc-transition"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-base font-semibold text-foreground">
                      {t(`plans.${plan.translationKey}.title`)}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {t(`plans.${plan.translationKey}.desc`)}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">
                        {t("featured.from")} {formatVND(plan.priceVND)}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-primary ticktoc-transition">
                        {t("featured.details")}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="text-center mt-10">
            <Link
              href={`${prefix}/plans`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 ticktoc-transition"
            >
              {t("common.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
