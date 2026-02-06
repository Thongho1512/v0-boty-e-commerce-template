import { Suspense } from "react";
import { Header } from "@/components/ticktoc/header";
import { Hero } from "@/components/ticktoc/hero";
import { FeaturedPlans } from "@/components/ticktoc/featured-plans";
import { WhyUs } from "@/components/ticktoc/why-us";
import { Testimonials } from "@/components/ticktoc/testimonials";
import { CTABanner } from "@/components/ticktoc/cta-banner";
import { Footer } from "@/components/ticktoc/footer";

function LoadingHeader() {
  return <div className="h-16 bg-background border-b border-border" />;
}

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<LoadingHeader />}>
        <Header />
      </Suspense>
      <Hero />
      <FeaturedPlans />
      <WhyUs />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}
