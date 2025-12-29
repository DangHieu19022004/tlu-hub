import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedDocuments } from "@/components/featured-documents"
import { AIChatbot } from "@/components/ai-chatbot"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fef5f7]">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="w-full flex justify-center py-12 px-4 sm:px-10 border-b border-border bg-gradient-to-b from-white to-[#fff0f3]">
          <div className="w-full max-w-[1100px]">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                Tài Liệu <span className="text-primary">Học Tập</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Kho tàng tài liệu phong phú từ đề thi, giáo trình đến bài giảng chất lượng cao
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm theo mã môn, tên môn học..."
                    className="pl-10 h-12"
                  />
                </div>
                <Button size="lg" className="bg-primary hover:bg-accent">
                  <Search className="h-5 w-5 mr-2" />
                  Tìm kiếm
                </Button>
                <Button size="lg" variant="outline">
                  <Filter className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="py-16 text-center">Đang tải tài liệu...</div>}>
          <FeaturedDocuments />
        </Suspense>
      </main>
      <Footer />
      <AIChatbot />
    </div>
  )
}
