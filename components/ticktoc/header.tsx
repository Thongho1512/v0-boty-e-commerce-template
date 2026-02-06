"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, ChevronDown } from "lucide-react";
import { SakuraIcon } from "./sakura-icon";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();

  const prefix = `/${locale}`;

  const navItems = [
    { label: t("home"), href: prefix },
    { label: t("pricing"), href: `${prefix}/pricing` },
    { label: t("booking"), href: `${prefix}/booking` },
    { label: t("hairstyle"), href: `${prefix}/hairstyle` },
    { label: t("faq"), href: `${prefix}/faq` },
    { label: t("gallery"), href: `${prefix}/gallery` },
    { label: t("contact"), href: `${prefix}/contact` },
  ];

  const planDropdown = {
    women: [
      { label: t("womenBasic"), href: `${prefix}/plans/kimono-nu-co-ban` },
      { label: t("womenLace"), href: `${prefix}/plans/kimono-nu-ren` },
      { label: t("womenHoumongi"), href: `${prefix}/plans/kimono-houmongi` },
      { label: t("womenFurisode"), href: `${prefix}/plans/kimono-furisode` },
    ],
    men: [
      { label: t("menBasic"), href: `${prefix}/plans/kimono-nam-co-ban` },
      { label: t("menHakama"), href: `${prefix}/plans/kimono-nam-hakama` },
    ],
    kids: [
      { label: t("kids35"), href: `${prefix}/plans/kimono-tre-em-3-5` },
      { label: t("kids7"), href: `${prefix}/plans/kimono-tre-em-7` },
    ],
  };

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href={prefix} className="flex items-center gap-2">
          <SakuraIcon className="h-7 w-7 text-primary" />
          <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
            Ticktoc Kimono
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href={prefix}
            className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary ticktoc-transition rounded-md hover:bg-secondary"
          >
            {t("home")}
          </Link>

          {/* Plans Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary ticktoc-transition rounded-md hover:bg-secondary">
                {t("plans")}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link href={`${prefix}/plans`} className="font-medium">
                  {t("plans")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>{t("women")}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {planDropdown.women.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>{t("men")}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {planDropdown.men.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>{t("kids")}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {planDropdown.kids.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary ticktoc-transition rounded-md hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href={`${prefix}/booking`} className="hidden sm:block">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              {t("booking")}
            </Button>
          </Link>
          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md"
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile plan links */}
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">
              {t("plans")}
            </div>
            <Link
              href={`${prefix}/plans`}
              onClick={() => setMobileOpen(false)}
              className="px-6 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary rounded-md"
            >
              {t("plans")}
            </Link>
            <div className="px-6 py-1.5 text-xs text-muted-foreground">{t("women")}</div>
            {planDropdown.women.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-9 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary rounded-md"
              >
                {item.label}
              </Link>
            ))}
            <div className="px-6 py-1.5 text-xs text-muted-foreground">{t("men")}</div>
            {planDropdown.men.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-9 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary rounded-md"
              >
                {item.label}
              </Link>
            ))}
            <div className="px-6 py-1.5 text-xs text-muted-foreground">{t("kids")}</div>
            {planDropdown.kids.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-9 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary rounded-md"
              >
                {item.label}
              </Link>
            ))}

            <Link href={`${prefix}/booking`} onClick={() => setMobileOpen(false)} className="mt-3">
              <Button className="w-full bg-primary text-primary-foreground">
                {t("booking")}
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
