"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Clock, Award, TrendingUp, PlayCircle, Download, Star, Settings } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// TODO: Fetch from API
const enrolledCourses: any[] = []
const recentActivity: any[] = []
const achievements: any[] = []

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!mounted || !user) {
    return null
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Dashboard Header */}
        <section className="border-b border-border bg-card py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="mb-1 text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                  <Badge className="mt-2">{user.isVIP ? 'VIP' : 'Sinh viên TLU'}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/profile">
                    <Settings className="mr-2 h-4 w-4" />
                    Cài đặt
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Khóa học đang học</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                  <p className="text-xs text-muted-foreground">Tổng số khóa học</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Giờ học</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Tháng này</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Chứng chỉ</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Đã hoàn thành</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Số dư tài khoản</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.balance?.toLocaleString() || 0} đ</div>
                  <p className="text-xs text-muted-foreground">Số dư hiện tại</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="courses" className="space-y-6">
              <TabsList>
                <TabsTrigger value="courses">Khóa học của tôi</TabsTrigger>
                <TabsTrigger value="activity">Hoạt động</TabsTrigger>
                <TabsTrigger value="achievements">Thành tích</TabsTrigger>
              </TabsList>

              <TabsContent value="courses" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Khóa học đang học</h2>
                  <Button variant="outline" asChild>
                    <Link href="/courses">Khám phá thêm</Link>
                  </Button>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  {enrolledCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative aspect-video w-full sm:w-48">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <CardHeader>
                            <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
                            <CardDescription>Giảng viên: {course.instructor}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1">
                            <div className="space-y-3">
                              <div>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Tiến độ</span>
                                  <span className="font-semibold">{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} />
                              </div>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>
                                  {course.completedLessons}/{course.totalLessons} bài học
                                </span>
                                <span>{course.lastAccessed}</span>
                              </div>
                              <Button className="w-full" asChild>
                                <Link href={`/courses/${course.id}`}>
                                  <PlayCircle className="mr-2 h-4 w-4" />
                                  Tiếp tục học
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <h2 className="text-2xl font-bold">Hoạt động gần đây</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            {activity.type === "course" && <BookOpen className="h-5 w-5 text-primary" />}
                            {activity.type === "certificate" && <Award className="h-5 w-5 text-primary" />}
                            {activity.type === "download" && <Download className="h-5 w-5 text-primary" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <h2 className="text-2xl font-bold">Thành tích</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <Card key={index} className={achievement.unlocked ? "" : "opacity-50"}>
                        <CardHeader>
                          <div
                            className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${
                              achievement.unlocked ? "bg-primary/10" : "bg-muted"
                            }`}
                          >
                            <Icon
                              className={`h-6 w-6 ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`}
                            />
                          </div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {achievement.unlocked ? (
                            <Badge>Đã mở khóa</Badge>
                          ) : (
                            <Badge variant="outline">Chưa mở khóa</Badge>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
