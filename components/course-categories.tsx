import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, FileText, Code, Briefcase, Palette, ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    icon: BookOpen,
    title: "Tài Liệu Miễn Phí",
    description: "Slide bài giảng, đề cương môn học",
    count: "200+ tài liệu",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Video,
    title: "Video Bài Giảng",
    description: "Video hướng dẫn chi tiết",
    count: "150+ video",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: FileText,
    title: "Bài Tập Lớn",
    description: "Đề bài và hướng dẫn làm bài",
    count: "100+ bài tập",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Code,
    title: "Lập Trình",
    description: "Khóa học lập trình từ cơ bản đến nâng cao",
    count: "80+ khóa học",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Briefcase,
    title: "Kỹ Năng Mềm",
    description: "Phát triển kỹ năng nghề nghiệp",
    count: "50+ khóa học",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Palette,
    title: "Thiết Kế",
    description: "Thiết kế đồ họa và UI/UX",
    count: "40+ khóa học",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
]

export function CourseCategories() {
  return (
    <section className="border-b border-border py-20">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">Khám Phá Danh Mục</h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Tìm kiếm tài liệu và khóa học phù hợp với nhu cầu học tập của bạn
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.title} className="group transition-all hover:shadow-lg">
                <CardHeader>
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.bgColor}`}
                  >
                    <Icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">{category.count}</span>
                    <Button variant="ghost" size="sm" className="gap-1 group-hover:gap-2 transition-all" asChild>
                      <Link href="/courses">
                        Xem thêm
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
