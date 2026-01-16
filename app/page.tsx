import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { AboutSection } from "@/components/about-section"
import { FeaturedDocuments } from "@/components/featured-documents"
import { FeaturedCourses } from "@/components/featured-courses"
import { CategoryGrid } from "@/components/category-grid"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { AIChatbot } from "@/components/ai-chatbot"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fef5f7]">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <Suspense fallback={<div className="py-16 text-center">Đang tải...</div>}>
          <FeaturedDocuments />
          {/* <FeaturedCourses /> */}
          {/* <CategoryGrid /> */}
        </Suspense>
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  )
}
