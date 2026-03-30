import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import PageMotion from "@/components/motion/PageMotion";
import AboutSection from "@/components/sections/AboutSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import GallerySection from "@/components/sections/GallerySection";
import HeroSection from "@/components/sections/HeroSection";
import ObjectStudySection from "@/components/sections/ObjectStudySection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <PageMotion />
      <SiteHeader />
      <main id="content" className="page-shell">
        <HeroSection />
        <AboutSection />
        <ObjectStudySection />
        <ServicesSection />
        <CaseStudiesSection />
        <FeaturesSection />
        <GallerySection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </>
  );
}
