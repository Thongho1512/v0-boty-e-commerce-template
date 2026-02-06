"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { kimonoPlans, formatVND, pricingData } from "@/lib/data";
import { FadeIn } from "@/components/ticktoc/fade-in";
import { PageBreadcrumb } from "@/components/ticktoc/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Sparkles, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default function PlanDetailPage() {
  const locale = useLocale();
  const t = useTranslations("plans");
  const tNav = useTranslations("nav");
  const tPricing = useTranslations("pricing");
  const tCommon = useTranslations("common");
  const params = useParams();
  const slug = params.slug as string;

  const plan = kimonoPlans.find((p) => p.slug === slug);
  if (!plan) return notFound();

  const planT = t.raw(plan.translationKey) as {
    title: string;
    desc: string;
    price: string;
    includes: string;
  };

  const pricing = pricingData.find((p) => p.planKey === plan.translationKey);
  const includesList = planT.includes.split(",").map((s) => s.trim());

  // Related plans (same category, excluding current)
  const related = kimonoPlans
    .filter((p) => p.category === plan.category && p.id !== plan.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageBreadcrumb
          items={[
            { label: tNav("plans"), href: `/${locale}/plans` },
            { label: planT.title },
          ]}
        />

        <div className="pb-16">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <FadeIn direction="left">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden ticktoc-shadow">
                <Image
                  src={plan.image || "/placeholder.svg"}
                  alt={planT.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">
                    {plan.category === "women"
                      ? t("women")
                      : plan.category === "men"
                        ? t("men")
                        : t("kids")}
                  </Badge>
                </div>
              </div>
            </FadeIn>

            {/* Details */}
            <FadeIn direction="right" delay={0.1}>
              <div className="flex flex-col justify-center">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance">
                  {planT.title}
                </h1>

                <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
                  {planT.desc}
                </p>

                {/* Price */}
                <div className="mt-6 p-4 bg-secondary rounded-xl">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {formatVND(plan.priceVND)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {tPricing("halfDay")}
                    </span>
                  </div>
                  {pricing && (
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl font-semibold text-foreground">
                        {formatVND(pricing.fullDay)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / {tPricing("fullDay")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Includes */}
                <div className="mt-6">
                  <h3 className="font-serif text-lg font-semibold text-foreground flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    {t("includes")}
                  </h3>
                  <ul className="mt-3 grid gap-2">
                    {includesList.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Duration Info */}
                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {tPricing("halfDay")} / {tPricing("fullDay")}
                  </span>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="flex-1">
                    <Link href={`/${locale}/booking?plan=${plan.id}`}>
                      {t("bookNow")}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="flex-1 bg-transparent">
                    <Link href={`/${locale}/pricing`}>
                      {tPricing("title")}
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Related Plans */}
          {related.length > 0 && (
            <section className="mt-16">
              <FadeIn>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  {t("title")}
                </h2>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((rp, idx) => {
                  const rpT = t.raw(rp.translationKey) as {
                    title: string;
                    desc: string;
                    price: string;
                  };
                  return (
                    <FadeIn key={rp.id} delay={idx * 0.05}>
                      <Link
                        href={`/${locale}/plans/${rp.slug}`}
                        className="group block"
                      >
                        <div className="bg-card rounded-xl overflow-hidden ticktoc-shadow border border-border hover:border-primary/30 ticktoc-transition">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={rp.image || "/placeholder.svg"}
                              alt={rpT.title}
                              fill
                              className="object-cover group-hover:scale-105 ticktoc-transition"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-serif text-base font-semibold text-foreground group-hover:text-primary ticktoc-transition">
                              {rpT.title}
                            </h3>
                            <span className="text-primary font-bold mt-1 block">
                              {formatVND(rp.priceVND)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </FadeIn>
                  );
                })}
              </div>
            </section>
          )}

          {/* Back */}
          <FadeIn delay={0.2}>
            <div className="mt-10">
              <Button variant="ghost" asChild>
                <Link
                  href={`/${locale}/plans`}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {tCommon("back")}
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
