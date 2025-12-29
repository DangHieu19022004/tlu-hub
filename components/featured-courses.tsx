import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// TODO: Replace with API call to fetch courses
// This is temporary static data for UI demonstration
const courses = [
  {
    id: 1,
    title: "Lập Trình Web Từ Cơ Bản Đến Nâng Cao",
    instructor: "Nguyễn Văn A",
    price: 499000,
    originalPrice: 999000,
    rating: 4.8,
    students: 1234,
    duration: "12 giờ",
    image: "/web-development-coding.png",
    badge: "Bán Chạy",
    category: "Lập Trình",
  },
  {
    id: 2,
    title: "React & Next.js - Xây Dựng Ứng Dụng Hiện Đại",
    instructor: "Trần Thị B",
    price: 599000,
    originalPrice: 1199000,
    rating: 4.9,
    students: 856,
    duration: "15 giờ",
    image: "/react-nextjs-development.png",
    badge: "Mới",
    category: "Lập Trình",
  },
  {
    id: 3,
    title: "UI/UX Design với Figma",
    instructor: "Lê Văn C",
    price: 399000,
    originalPrice: 799000,
    rating: 4.7,
    students: 642,
    duration: "10 giờ",
    image: "/ui-ux-design-figma.jpg",
    badge: "Phổ Biến",
    category: "Thiết Kế",
  },
]

export function FeaturedCourses() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-foreground lg:text-4xl">Khóa Học Nổi Bật</h2>
            <p className="text-muted-foreground">Khám phá các khóa học được yêu thích nhất</p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex bg-transparent">
            <Link href="/courses">Xem Tất Cả</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">{course.badge}</Badge>
              </div>
              <div className="p-5">
                <div className="mb-2 text-sm text-primary">{course.category}</div>
                <h3 className="mb-3 line-clamp-2 font-semibold text-card-foreground">{course.title}</h3>
                <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground line-through">
                      {course.originalPrice.toLocaleString()}đ
                    </span>
                    <span className="text-lg font-bold text-primary">{course.price.toLocaleString()}đ</span>
                  </div>
                </div>
              </div>
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
