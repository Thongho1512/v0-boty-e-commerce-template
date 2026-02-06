"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { SakuraIcon } from "./sakura-icon";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = `/${locale}`;

  const quickLinks = [
    { label: t("nav.home"), href: prefix },
    { label: t("nav.plans"), href: `${prefix}/plans` },
    { label: t("nav.pricing"), href: `${prefix}/pricing` },
    { label: t("nav.booking"), href: `${prefix}/booking` },
    { label: t("nav.gallery"), href: `${prefix}/gallery` },
  ];

  const serviceLinks = [
    { label: t("nav.women"), href: `${prefix}/plans#women` },
    { label: t("nav.men"), href: `${prefix}/plans#men` },
    { label: t("nav.kids"), href: `${prefix}/plans#kids` },
    { label: t("nav.hairstyle"), href: `${prefix}/hairstyle` },
    { label: t("nav.faq"), href: `${prefix}/faq` },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={prefix} className="flex items-center gap-2">
              <SakuraIcon className="h-7 w-7 text-primary" />
              <span className="font-serif text-lg font-semibold">
                Ticktoc Kimono
              </span>
            </Link>
            <p className="text-sm leading-relaxed opacity-70">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-background/10 ticktoc-transition"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-background/10 ticktoc-transition"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-background/10 ticktoc-transition"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://zalo.me/0901234567"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-background/10 ticktoc-transition text-xs font-bold"
                aria-label="Zalo"
              >
                Zalo
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 ticktoc-transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider mb-4">
              {t("footer.services")}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 ticktoc-transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider mb-4">
              {t("footer.contactUs")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm opacity-70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{t("contact.addressValue")}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm opacity-70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{t("contact.phoneValue")}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm opacity-70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{t("contact.emailValue")}</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-xs opacity-50 mb-1">{t("footer.nearby")}</p>
              <p className="text-xs opacity-60 leading-relaxed">
                {t("contact.nearbyPlaces")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="sakura-line mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-50">
          <p>&copy; 2026 {t("footer.rights")}</p>
          <p>Ticktoc Kimono Rental - Ho Chi Minh City</p>
        </div>
      </div>

      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: schema markup
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Ticktoc Kimono Rental",
            description:
              "Premium kimono rental service in Ho Chi Minh City",
            url: "https://ticktockimono.vn",
            telephone: "+84901234567",
            email: "hello@ticktockimono.vn",
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Nguyen Hue Street",
              addressLocality: "Ho Chi Minh City",
              addressRegion: "District 1",
              addressCountry: "VN",
            },
            openingHours: "Mo-Su 09:00-19:00",
            priceRange: "350,000 - 1,700,000 VND",
          }),
        }}
      />
    </footer>
  );
}
