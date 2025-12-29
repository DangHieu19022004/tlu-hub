import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedCourses } from "@/components/featured-courses"
import { CategoryGrid } from "@/components/category-grid"
import { CourseCategories } from "@/components/course-categories"
import { AIChatbot } from "@/components/ai-chatbot"

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fef5f7]">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="w-full flex justify-center py-12 px-4 sm:px-10 border-b border-border bg-gradient-to-b from-white to-[#fff0f3]">
          <div className="w-full max-w-[1100px]">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                Khóa Học <span className="text-primary">Chất Lượng</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Khám phá hàng trăm khóa học từ cơ bản đến nâng cao, được thiết kế đặc biệt cho sinh viên TLU
              </p>
            </div>
          </div>
        </section>

        <CourseCategories />
        <FeaturedCourses />
        <CategoryGrid />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  )
}
