import { Code, Palette, Video, Camera, TrendingUp, PenTool, DollarSign, Microscope } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// TODO: Static data - will be replaced with API categories
const categories = [
  { name: "Lập Trình", icon: Code, count: 63, color: "bg-primary/10 text-primary" },
  { name: "Thiết Kế", icon: Palette, count: 52, color: "bg-orange-100 text-orange-600" },
  { name: "Video & Ảnh", icon: Video, count: 48, color: "bg-purple-100 text-purple-600" },
  { name: "Nhiếp Ảnh", icon: Camera, count: 35, color: "bg-pink-100 text-pink-600" },
  { name: "Marketing", icon: TrendingUp, count: 42, color: "bg-accent/10 text-accent" },
  { name: "Viết Nội Dung", icon: PenTool, count: 28, color: "bg-yellow-100 text-yellow-600" },
  { name: "Tài Chính", icon: DollarSign, count: 31, color: "bg-emerald-100 text-emerald-600" },
  { name: "Khoa Học", icon: Microscope, count: 45, color: "bg-cyan-100 text-cyan-600" },
]

export function CategoryGrid() {
  return (
    <section className="border-b border-border bg-background py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-foreground lg:text-4xl">Danh Mục Hàng Đầu</h2>
            <p className="text-muted-foreground">Khám phá các khóa học phổ biến nhất</p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex bg-transparent">
            <Link href="/courses">Xem Tất Cả</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/courses?category=${category.name}`}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <div className={`mb-4 inline-flex rounded-lg p-3 ${category.color}`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-1 font-semibold text-card-foreground">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} Khóa học</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/courses">Xem Tất Cả</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
