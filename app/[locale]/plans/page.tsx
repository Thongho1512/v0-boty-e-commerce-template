"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { kimonoPlans, formatVND } from "@/lib/data";
import { FadeIn } from "@/components/ticktoc/fade-in";
import { PageBreadcrumb } from "@/components/ticktoc/page-breadcrumb";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PlansPage() {
  const t = useTranslations("plans");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const [activeSection, setActiveSection] = useState<"women" | "men" | "kids">("women");

  // Group plans by category
  const womenPlans = kimonoPlans.filter((p) => p.category === "women");
  const menPlans = kimonoPlans.filter((p) => p.category === "men");
  const kidsPlans = kimonoPlans.filter((p) => p.category === "kids");

  // Scroll to section
  const scrollToSection = (section: "women" | "men" | "kids") => {
    const element = document.getElementById(`section-${section}`);
    if (element) {
      const offset = 80; // Header offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(section);
    }
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["women", "men", "kids"] as const;
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(`section-${section}`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageBreadcrumb items={[{ label: tNav("plans") }]} />

        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              {t("title")}
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-pretty">
              {t("subtitle")}
            </p>
            <div className="sakura-line mt-6 mx-auto w-32" />
          </div>
        </FadeIn>

        {/* Kimono Nữ Section */}
        <section id="section-women" className="mb-16 scroll-mt-20">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-border" />
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
                {t("women")}
              </h2>
              <div className="h-px flex-1 bg-border" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {womenPlans.map((plan, idx) => {
              const planT = t.raw(plan.translationKey) as {
                title: string;
                desc: string;
                includes: string;
              };
              return (
                <FadeIn key={plan.id} delay={0.15 + idx * 0.05}>
                  <Link
                    href={`/${locale}/plans/${plan.slug}`}
                    className="group block h-full"
                  >
                    <div className="bg-card rounded-xl overflow-hidden ticktoc-shadow border border-border hover:border-primary/30 ticktoc-transition h-full flex flex-col">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={plan.image}
                          alt={planT.title}
                          fill
                          className="object-cover group-hover:scale-105 ticktoc-transition"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary ticktoc-transition">
                          {planT.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 flex-1 leading-relaxed">
                          {planT.desc}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-primary font-bold text-lg">
                            {formatVND(plan.priceVND)}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 ticktoc-transition" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* Kimono Nam Section */}
        <section id="section-men" className="mb-16 scroll-mt-20">
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-border" />
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
                {t("men")}
              </h2>
              <div className="h-px flex-1 bg-border" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menPlans.map((plan, idx) => {
              const planT = t.raw(plan.translationKey) as {
                title: string;
                desc: string;
                includes: string;
              };
              return (
                <FadeIn key={plan.id} delay={0.25 + idx * 0.05}>
                  <Link
                    href={`/${locale}/plans/${plan.slug}`}
                    className="group block h-full"
                  >
                    <div className="bg-card rounded-xl overflow-hidden ticktoc-shadow border border-border hover:border-primary/30 ticktoc-transition h-full flex flex-col">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={plan.image}
                          alt={planT.title}
                          fill
                          className="object-cover group-hover:scale-105 ticktoc-transition"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary ticktoc-transition">
                          {planT.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 flex-1 leading-relaxed">
                          {planT.desc}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-primary font-bold text-lg">
                            {formatVND(plan.priceVND)}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 ticktoc-transition" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* Trẻ Em Section */}
        <section id="section-kids" className="pb-16 scroll-mt-20">
          <FadeIn delay={0.3}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-border" />
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
                {t("kids")}
              </h2>
              <div className="h-px flex-1 bg-border" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kidsPlans.map((plan, idx) => {
              const planT = t.raw(plan.translationKey) as {
                title: string;
                desc: string;
                includes: string;
              };
              return (
                <FadeIn key={plan.id} delay={0.35 + idx * 0.05}>
                  <Link
                    href={`/${locale}/plans/${plan.slug}`}
                    className="group block h-full"
                  >
                    <div className="bg-card rounded-xl overflow-hidden ticktoc-shadow border border-border hover:border-primary/30 ticktoc-transition h-full flex flex-col">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={plan.image}
                          alt={planT.title}
                          fill
                          className="object-cover group-hover:scale-105 ticktoc-transition"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary ticktoc-transition">
                          {planT.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 flex-1 leading-relaxed">
                          {planT.desc}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-primary font-bold text-lg">
                            {formatVND(plan.priceVND)}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 ticktoc-transition" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </section>
      </div>

      {/* Floating Navigation Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-card/95 backdrop-blur-md rounded-full shadow-2xl border border-border px-2 py-2 flex items-center gap-2">
          <button
            onClick={() => scrollToSection("women")}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-medium ticktoc-transition flex items-center gap-2 whitespace-nowrap",
              activeSection === "women"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-foreground hover:bg-secondary"
            )}
          >
            <span>{t("women")}</span>
          </button>
          <button
            onClick={() => scrollToSection("men")}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-medium ticktoc-transition flex items-center gap-2 whitespace-nowrap",
              activeSection === "men"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-foreground hover:bg-secondary"
            )}
          >
            <span>{t("men")}</span>
          </button>
          <button
            onClick={() => scrollToSection("kids")}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-medium ticktoc-transition flex items-center gap-2 whitespace-nowrap",
              activeSection === "kids"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-foreground hover:bg-secondary"
            )}
          >
            <span>{t("kids")}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
