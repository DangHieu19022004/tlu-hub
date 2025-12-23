import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturedDocuments } from "@/components/featured-documents"
import { AboutSection } from "@/components/about-section"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fef5f7]">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturedDocuments />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
