"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Star, Clock, Users, BookOpen, CheckCircle2, PlayCircle } from "lucide-react"

// Mock data - in real app, fetch from API
const courseData = {
  id: 1,
  title: "Lập Trình Web Cơ Bản",
  description:
    "Khóa học toàn diện về lập trình web từ cơ bản đến nâng cao. Bạn sẽ học HTML, CSS, JavaScript và các framework hiện đại để xây dựng website chuyên nghiệp.",
  category: "Lập Trình",
  level: "Cơ Bản",
  price: "Miễn Phí",
  rating: 4.8,
  students: 1234,
  duration: "8 tuần",
  image: "/web-development-coding-laptop.jpg",
  instructor: {
    name: "Nguyễn Văn A",
    avatar: "/professional-instructor-avatar.png",
    bio: "Giảng viên với 10 năm kinh nghiệm trong lĩnh vực phát triển web",
    courses: 15,
    students: 5000,
  },
  curriculum: [
    {
      title: "Giới thiệu về Web Development",
      lessons: [
        { title: "Tổng quan về Web", duration: "15 phút", type: "video" },
        { title: "Cài đặt môi trường", duration: "20 phút", type: "video" },
        { title: "HTML cơ bản", duration: "30 phút", type: "video" },
      ],
    },
    {
      title: "CSS và Styling",
      lessons: [
        { title: "CSS Fundamentals", duration: "25 phút", type: "video" },
        { title: "Flexbox và Grid", duration: "35 phút", type: "video" },
        { title: "Responsive Design", duration: "30 phút", type: "video" },
      ],
    },
    {
      title: "JavaScript Cơ Bản",
      lessons: [
        { title: "Biến và Kiểu dữ liệu", duration: "20 phút", type: "video" },
        { title: "Functions và Objects", duration: "30 phút", type: "video" },
        { title: "DOM Manipulation", duration: "40 phút", type: "video" },
      ],
    },
  ],
  reviews: [
    {
      id: 1,
      name: "Trần Văn B",
      avatar: "/male-student-avatar.png",
      rating: 5,
      date: "2 tuần trước",
      comment: "Khóa học rất chi tiết và dễ hiểu. Giảng viên giải thích rất rõ ràng!",
    },
    {
      id: 2,
      name: "Lê Thị C",
      avatar: "/female-student-avatar.png",
      rating: 4,
      date: "1 tháng trước",
      comment: "Nội dung hay, phù hợp cho người mới bắt đầu. Cần thêm bài tập thực hành.",
    },
  ],
  features: [
    "Video bài giảng chất lượng cao",
    "Tài liệu học tập đầy đủ",
    "Bài tập thực hành sau mỗi bài",
    "Hỗ trợ từ giảng viên",
    "Chứng chỉ hoàn thành",
    "Truy cập trọn đời",
  ],
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courseData // In real app: fetch based on params.id

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-card">
          <div className="container mx-auto px-3 sm:px-4 py-12">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge>{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <h1 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">{course.title}</h1>
                <p className="mb-6 text-pretty text-lg text-muted-foreground">{course.description}</p>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-muted-foreground">({course.students} đánh giá)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-5 w-5" />
                    <span>{course.students} học viên</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <Card>
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Button size="lg" className="gap-2">
                        <PlayCircle className="h-5 w-5" />
                        Xem giới thiệu
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4 text-center">
                      <span className="text-3xl font-bold text-primary">{course.price}</span>
                    </div>
                    <Button className="mb-4 w-full" size="lg">
                      Đăng Ký Ngay
                    </Button>
                    <div className="space-y-2 text-sm">
                      {course.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Tabs defaultValue="curriculum" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="curriculum">Nội dung</TabsTrigger>
                    <TabsTrigger value="instructor">Giảng viên</TabsTrigger>
                    <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
                  </TabsList>
                  <TabsContent value="curriculum" className="mt-6 space-y-4">
                    {course.curriculum.map((section, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-xl">{section.title}</CardTitle>
                          <CardDescription>{section.lessons.length} bài học</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-accent"
                              >
                                <div className="flex items-center gap-3">
                                  <PlayCircle className="h-5 w-5 text-muted-foreground" />
                                  <span className="font-medium">{lesson.title}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  <TabsContent value="instructor" className="mt-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="mb-2 text-xl font-bold">{course.instructor.name}</h3>
                            <p className="mb-4 text-muted-foreground">{course.instructor.bio}</p>
                            <div className="flex gap-6 text-sm">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-primary" />
                                <span>{course.instructor.courses} khóa học</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-primary" />
                                <span>{course.instructor.students} học viên</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="reviews" className="mt-6 space-y-4">
                    {course.reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={review.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{review.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="mb-2 flex items-center justify-between">
                                <h4 className="font-semibold">{review.name}</h4>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                              <div className="mb-2 flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-muted-foreground">{review.comment}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Tiến độ học tập</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>Hoàn thành</span>
                        <span className="font-semibold">0%</span>
                      </div>
                      <Progress value={0} />
                    </div>
                    <Button className="w-full bg-transparent" variant="outline">
                      Bắt Đầu Học
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
