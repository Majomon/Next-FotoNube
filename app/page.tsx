import Header from "@/components/header"
import HeroCarousel from "@/components/hero-carousel"
import FeaturesSection from "@/components/features-section"
import HowItWorksSection from "@/components/how-it-works-section"
import DiscoverSection from "@/components/discover-section"
import CTASection from "@/components/cta-section"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import NewsletterSection from "@/components/newsletter-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="relative z-10">
        <HeroCarousel />
      </div>
      <div className="relative z-10">
        <FeaturesSection />
      </div>
      <div className="relative z-10">
        <HowItWorksSection />
      </div>
      <div className="relative z-10">
        <DiscoverSection />
      </div>
      <div className="relative z-10">
        <CTASection />
      </div>
      <div className="relative z-10">
        <TestimonialsSection />
      </div>
      <div className="relative z-10">
        <FAQSection />
      </div>
      <div className="relative z-10">
        <NewsletterSection />
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  )
}
