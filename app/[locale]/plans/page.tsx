"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { kimonoPlans, formatVND, type PlanCategory } from "@/lib/data";
import { FadeIn } from "@/components/ticktoc/fade-in";
import { PageBreadcrumb } from "@/components/ticktoc/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories: { key: PlanCategory | "all"; labelKey: string }[] = [
  { key: "all", labelKey: "all" },
  { key: "women", labelKey: "women" },
  { key: "men", labelKey: "men" },
  { key: "kids", labelKey: "kids" },
];

export default function PlansPage() {
  const t = useTranslations("plans");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<PlanCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? kimonoPlans
      : kimonoPlans.filter((p) => p.category === activeCategory);

  const categoryLabels: Record<string, string> = {
    all: tCommon("viewAll"),
    women: t("women"),
    men: t("men"),
    kids: t("kids"),
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageBreadcrumb
          items={[{ label: tNav("plans") }]}
        />

        <FadeIn>
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              {t("title")}
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-pretty">
              {t("subtitle")}
            </p>
            <div className="sakura-line mt-6 mx-auto w-32" />
          </div>
        </FadeIn>

        {/* Category Filter */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <Button
                key={cat.key}
                variant={activeCategory === cat.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.key)}
                className="rounded-full"
              >
                {categoryLabels[cat.key]}
              </Button>
            ))}
          </div>
        </FadeIn>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
          {filtered.map((plan, idx) => {
            const planT = t.raw(plan.translationKey) as {
              title: string;
              desc: string;
              price: string;
              includes: string;
            };
            return (
              <FadeIn key={plan.id} delay={idx * 0.05}>
                <Link
                  href={`/${locale}/plans/${plan.slug}`}
                  className="group block h-full"
                >
                  <div className="bg-card rounded-xl overflow-hidden ticktoc-shadow border border-border hover:border-primary/30 ticktoc-transition h-full flex flex-col">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={plan.image || "/placeholder.svg"}
                        alt={planT.title}
                        fill
                        className="object-cover group-hover:scale-105 ticktoc-transition"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge
                          variant="secondary"
                          className="bg-card/90 backdrop-blur-sm text-foreground text-xs"
                        >
                          {plan.category === "women"
                            ? t("women")
                            : plan.category === "men"
                              ? t("men")
                              : t("kids")}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary ticktoc-transition">
                        {planT.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2 flex-1">
                        {planT.desc}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-primary font-bold text-lg">
                          {formatVND(plan.priceVND)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t("bookNow")} &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </main>
  );
}
