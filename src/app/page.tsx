import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { GenderSection } from "@/components/landing/GenderSection";
import { TimelinePreview } from "@/components/landing/TimelinePreview";
import { ForWhoSection } from "@/components/landing/ForWhoSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { UrgencyBar } from "@/components/landing/UrgencyBar";
import { StickyCTA } from "@/components/landing/StickyCTA";

export default function Home() {
  return (
    <>
      <UrgencyBar />
      <Header />
      <main>
        <HeroSection />
        <GenderSection />
        <TimelinePreview />
        <ForWhoSection />
        <BenefitsSection />
        <StatsSection />
        <TestimonialsSection />
        <FAQSection />
        <PricingSection />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
