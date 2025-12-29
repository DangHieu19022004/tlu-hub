"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    studentId: user?.studentId || "",
    major: "",
  })
  
  useEffect(() => {
    setMounted(true)
    if (!user) {
      router.push("/login")
    }
  }, [user, router])
  
  if (!mounted || !user) {
    return null
  }

  const [notifications, setNotifications] = useState({
    emailCourse: true,
    emailPromotion: false,
    pushCourse: true,
    pushMessage: true,
  })

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Cập nhật thành công!",
      description: "Thông tin cá nhân đã được cập nhật.",
    })
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Đổi mật khẩu thành công!",
      description: "Mật khẩu của bạn đã được thay đổi.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <section className="border-b border-border bg-card py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Cài Đặt Tài Khoản</h1>
            <p className="text-muted-foreground">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 lg:grid-cols-4">
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={user.image} />
                        <AvatarFallback>{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <h3 className="mt-4 font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <Button className="mt-4 w-full bg-transparent" variant="outline">
                        Đổi ảnh đại diện
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <Tabs defaultValue="profile" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
                    <TabsTrigger value="security">Bảo mật</TabsTrigger>
                    <TabsTrigger value="notifications">Thông báo</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile">
                    <Card>
                      <CardHeader>
                        <CardTitle>Thông Tin Cá Nhân</CardTitle>
                        <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="name">Họ và tên</Label>
                              <Input
                                id="name"
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="studentId">Mã sinh viên</Label>
                              <Input id="studentId" value={profileData.studentId} disabled />
                            </div>
                          </div>
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" value={profileData.email} disabled />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Số điện thoại</Label>
                              <Input
                                id="phone"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="major">Chuyên ngành</Label>
                            <Input
                              id="major"
                              value={profileData.major}
                              onChange={(e) => setProfileData({ ...profileData, major: e.target.value })}
                            />
                          </div>
                          <Button type="submit">Lưu thay đổi</Button>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="security">
                    <Card>
                      <CardHeader>
                        <CardTitle>Bảo Mật</CardTitle>
                        <CardDescription>Quản lý mật khẩu và bảo mật tài khoản</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handlePasswordChange} className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                            <Input id="currentPassword" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">Mật khẩu mới</Label>
                            <Input id="newPassword" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                            <Input id="confirmPassword" type="password" />
                          </div>
                          <Button type="submit">Đổi mật khẩu</Button>
                        </form>
                        <Separator className="my-6" />
                        <div className="space-y-4">
                          <h3 className="font-semibold">Xác thực hai yếu tố</h3>
                          <p className="text-sm text-muted-foreground">
                            Tăng cường bảo mật tài khoản với xác thực hai yếu tố
                          </p>
                          <Button variant="outline">Kích hoạt 2FA</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notifications">
                    <Card>
                      <CardHeader>
                        <CardTitle>Cài Đặt Thông Báo</CardTitle>
                        <CardDescription>Quản lý cách bạn nhận thông báo</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="mb-4 font-semibold">Thông báo Email</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Cập nhật khóa học</p>
                                <p className="text-sm text-muted-foreground">Nhận email về khóa học mới và cập nhật</p>
                              </div>
                              <Switch
                                checked={notifications.emailCourse}
                                onCheckedChange={(checked) =>
                                  setNotifications({ ...notifications, emailCourse: checked })
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Khuyến mãi</p>
                                <p className="text-sm text-muted-foreground">Nhận email về ưu đãi và khuyến mãi</p>
                              </div>
                              <Switch
                                checked={notifications.emailPromotion}
                                onCheckedChange={(checked) =>
                                  setNotifications({ ...notifications, emailPromotion: checked })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="mb-4 font-semibold">Thông báo Push</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Tiến độ khóa học</p>
                                <p className="text-sm text-muted-foreground">Nhắc nhở về tiến độ học tập</p>
                              </div>
                              <Switch
                                checked={notifications.pushCourse}
                                onCheckedChange={(checked) =>
                                  setNotifications({ ...notifications, pushCourse: checked })
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Tin nhắn</p>
                                <p className="text-sm text-muted-foreground">Thông báo tin nhắn mới</p>
                              </div>
                              <Switch
                                checked={notifications.pushMessage}
                                onCheckedChange={(checked) =>
                                  setNotifications({ ...notifications, pushMessage: checked })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <Button>Lưu cài đặt</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
