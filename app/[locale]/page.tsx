import { Header } from "@/components/ticktoc/header";
import { Hero } from "@/components/ticktoc/hero";
import { FeaturedPlans } from "@/components/ticktoc/featured-plans";
import { WhyUs } from "@/components/ticktoc/why-us";
import { Testimonials } from "@/components/ticktoc/testimonials";
import { CTABanner } from "@/components/ticktoc/cta-banner";
import { Footer } from "@/components/ticktoc/footer";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <FeaturedPlans />
      <WhyUs />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}
