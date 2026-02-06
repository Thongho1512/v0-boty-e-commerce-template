"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { pricingData, extrasData, formatVND } from "@/lib/data";
import { FadeIn } from "@/components/ticktoc/fade-in";
import { PageBreadcrumb } from "@/components/ticktoc/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
  const t = useTranslations("pricing");
  const tPlans = useTranslations("plans");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageBreadcrumb items={[{ label: tNav("pricing") }]} />

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

        {/* Pricing Table */}
        <FadeIn delay={0.1}>
          <div className="bg-card rounded-2xl ticktoc-shadow border border-border overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-secondary">
                    <th className="px-6 py-4 font-serif font-semibold text-foreground">
                      {t("package")}
                    </th>
                    <th className="px-6 py-4 font-serif font-semibold text-foreground text-center">
                      {t("halfDay")}
                    </th>
                    <th className="px-6 py-4 font-serif font-semibold text-foreground text-center">
                      {t("fullDay")}
                    </th>
                    <th className="px-6 py-4 font-serif font-semibold text-foreground text-center hidden sm:table-cell">
                      &nbsp;
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.map((row, i) => {
                    const planT = tPlans.raw(row.planKey) as { title: string };
                    return (
                      <tr
                        key={row.planKey}
                        className={`border-t border-border ${i % 2 === 1 ? "bg-secondary/40" : ""}`}
                      >
                        <td className="px-6 py-4">
                          <span className="font-medium text-foreground">
                            {planT.title}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-primary font-semibold">
                          {formatVND(row.halfDay)}
                        </td>
                        <td className="px-6 py-4 text-center text-primary font-semibold">
                          {formatVND(row.fullDay)}
                        </td>
                        <td className="px-6 py-4 text-center hidden sm:table-cell">
                          <Button asChild size="sm" variant="outline" className="bg-transparent">
                            <Link href={`/${locale}/booking?plan=${row.planKey}`}>
                              {tCommon("bookNow")}
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        {/* Extras */}
        <FadeIn delay={0.2}>
          <div className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
              {t("extras")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {extrasData.map((extra) => (
                <div
                  key={extra.key}
                  className="bg-card rounded-xl p-5 ticktoc-shadow border border-border text-center"
                >
                  <p className="font-medium text-foreground">
                    {t(extra.key)}
                  </p>
                  <p className="mt-2 text-xl font-bold text-primary">
                    {formatVND(extra.price)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.3}>
          <div className="text-center pb-16">
            <Button asChild size="lg">
              <Link href={`/${locale}/booking`}>{tCommon("bookNow")}</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
