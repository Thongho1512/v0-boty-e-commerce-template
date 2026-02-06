"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { hairstyleImages } from "@/lib/data";
import { FadeIn } from "@/components/ticktoc/fade-in";
import { PageBreadcrumb } from "@/components/ticktoc/page-breadcrumb";
import { Button } from "@/components/ui/button";

export default function HairstylePage() {
  const t = useTranslations("hairstyle");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageBreadcrumb items={[{ label: tNav("hairstyle") }]} />

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {hairstyleImages.map((img, i) => (
            <FadeIn key={img.src} delay={i * 0.05}>
              <div className="bg-card rounded-xl overflow-hidden ticktoc-shadow border border-border group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 ticktoc-transition"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground text-center">
                    {img.alt}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

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
