"use client";

import React from "react"

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { kimonoPlans } from "@/lib/data";
import { FadeIn } from "@/components/ticktoc/fade-in";
import { PageBreadcrumb } from "@/components/ticktoc/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MessageCircle, CheckCircle2, Phone } from "lucide-react";

function BookingForm() {
  const t = useTranslations("booking");
  const tPlans = useTranslations("plans");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const preselectedPlan = searchParams.get("plan") || "";

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    plan: preselectedPlan,
    people: "1",
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <FadeIn>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              {t("success")}
            </h2>
            <Button asChild className="mt-6">
              <Link href={`/${locale}`}>{tNav("home")}</Link>
            </Button>
          </div>
        </div>
      </FadeIn>
    );
  }

  return (
    <>
      <PageBreadcrumb items={[{ label: tNav("booking") }]} />

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

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-16">
        {/* Form */}
        <FadeIn delay={0.1} className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-6 sm:p-8 ticktoc-shadow border border-border"
          >
            <div className="grid gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name" className="mb-2 block text-foreground font-medium">
                    {t("name")}
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-2 block text-foreground font-medium">
                    {t("phone")}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="mb-2 block text-foreground font-medium">
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="date" className="mb-2 block text-foreground font-medium">
                    {t("date")}
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="people" className="mb-2 block text-foreground font-medium">
                    {t("people")}
                  </Label>
                  <Input
                    id="people"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.people}
                    onChange={(e) =>
                      setFormData({ ...formData, people: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="plan" className="mb-2 block text-foreground font-medium">
                  {t("plan")}
                </Label>
                <select
                  id="plan"
                  className="w-full rounded-lg border border-border bg-input px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={formData.plan}
                  onChange={(e) =>
                    setFormData({ ...formData, plan: e.target.value })
                  }
                >
                  <option value="">{t("selectPlan")}</option>
                  {kimonoPlans.map((plan) => {
                    const planT = tPlans.raw(plan.translationKey) as {
                      title: string;
                    };
                    return (
                      <option key={plan.id} value={plan.id}>
                        {planT.title}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <Label htmlFor="note" className="mb-2 block text-foreground font-medium">
                  {t("note")}
                </Label>
                <textarea
                  id="note"
                  rows={4}
                  placeholder={t("notePlaceholder")}
                  className="w-full rounded-lg border border-border bg-input px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                {t("submit")}
              </Button>
            </div>
          </form>
        </FadeIn>

        {/* Contact Sidebar */}
        <FadeIn delay={0.2} className="lg:col-span-2">
          <div className="bg-secondary rounded-2xl p-6 sm:p-8 sticky top-24">
            <h3 className="font-serif text-xl font-bold text-foreground mb-4">
              {t("zaloChat")}
            </h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="flex flex-col gap-3">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full bg-transparent justify-start"
              >
                <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Zalo: 0901 234 567
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full bg-transparent justify-start"
              >
                <a href="tel:0901234567">
                  <Phone className="h-4 w-4 mr-2" />
                  0901 234 567
                </a>
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="font-serif font-semibold text-foreground mb-2">
                Opening Hours
              </h4>
              <p className="text-sm text-muted-foreground">
                9:00 AM - 7:00 PM
              </p>
              <p className="text-sm text-muted-foreground">Mon - Sun</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </>
  );
}

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Suspense>
          <BookingForm />
        </Suspense>
      </div>
    </main>
  );
}
