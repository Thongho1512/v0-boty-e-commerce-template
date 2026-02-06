"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { FadeIn } from "./fade-in";

export function CTABanner() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = `/${locale}`;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <Image
        src="/images/shop-interior.jpg"
        alt="Ticktoc Kimono Rental shop interior"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="relative z-10 mx-auto max-w-3xl text-center px-4">
        <FadeIn>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-background text-balance">
            {t("hero.title")}
          </h2>
          <p className="mt-4 text-background/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link href={`${prefix}/booking`}>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              >
                {t("hero.cta")}
              </Button>
            </Link>
            <Link href={`${prefix}/gallery`}>
              <Button
                size="lg"
                variant="outline"
                className="border-background/50 text-background hover:bg-background/10 hover:text-background bg-transparent"
              >
                {t("gallery.title")}
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
