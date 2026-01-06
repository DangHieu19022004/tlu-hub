import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UnderDevelopment } from "@/components/under-development"

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fef5f7]">
      <Header />
      <main className="flex-1">
        <UnderDevelopment />
      </main>
      <Footer />
    </div>
  )
}
