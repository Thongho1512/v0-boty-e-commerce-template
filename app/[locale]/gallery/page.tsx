"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { galleryImages } from "@/lib/data";
import { FadeIn } from "@/components/ticktoc/fade-in";
import { PageBreadcrumb } from "@/components/ticktoc/page-breadcrumb";
import { X } from "lucide-react";

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const tNav = useTranslations("nav");
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageBreadcrumb items={[{ label: tNav("gallery") }]} />

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

        {/* Masonry-like Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 pb-16">
          {galleryImages.map((img, i) => (
            <FadeIn key={img.src} delay={i * 0.04}>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="mb-4 w-full block relative overflow-hidden rounded-xl group cursor-pointer"
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  width={600}
                  height={i % 3 === 0 ? 800 : i % 3 === 1 ? 600 : 700}
                  className="w-full h-auto object-cover group-hover:scale-105 ticktoc-transition rounded-xl"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 ticktoc-transition rounded-xl" />
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightbox(null);
            if (e.key === "ArrowRight")
              setLightbox((lightbox + 1) % galleryImages.length);
            if (e.key === "ArrowLeft")
              setLightbox(
                (lightbox - 1 + galleryImages.length) % galleryImages.length
              );
          }}
          // biome-ignore lint/a11y/useSemanticElements: lightbox overlay
          role="dialog"
          aria-label="Image lightbox"
          tabIndex={0}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-background hover:text-primary ticktoc-transition z-10"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full">
            <Image
              src={galleryImages[lightbox].src || "/placeholder.svg"}
              alt={galleryImages[lightbox].alt}
              width={1200}
              height={900}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg animate-scale-fade-in"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </main>
  );
}
