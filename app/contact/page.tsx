"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Facebook, MessageSquare, Clock } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form:", formData)
    toast({
      title: "Đã gửi thành công!",
      description: "Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
    })
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border bg-card py-12">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-balance text-4xl font-bold">Liên Hệ</h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy để lại thông tin và chúng tôi sẽ phản hồi sớm nhất.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Gửi Tin Nhắn</CardTitle>
                    <CardDescription>Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại với bạn</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Họ và tên *</Label>
                          <Input
                            id="name"
                            placeholder="Nguyễn Văn A"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="email@tlu.edu.vn"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="category">Danh mục *</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Chọn danh mục" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">Câu hỏi chung</SelectItem>
                              <SelectItem value="course">Về khóa học</SelectItem>
                              <SelectItem value="resource">Về tài liệu</SelectItem>
                              <SelectItem value="technical">Hỗ trợ kỹ thuật</SelectItem>
                              <SelectItem value="partnership">Hợp tác</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Tiêu đề *</Label>
                          <Input
                            id="subject"
                            placeholder="Tiêu đề tin nhắn"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Nội dung *</Label>
                        <Textarea
                          id="message"
                          placeholder="Nhập nội dung tin nhắn của bạn..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full sm:w-auto">
                        Gửi Tin Nhắn
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông Tin Liên Hệ</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">contact@tluhub.edu.vn</p>
                        <p className="text-sm text-muted-foreground">support@tluhub.edu.vn</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Điện thoại</p>
                        <p className="text-sm text-muted-foreground">Hotline: 024 1234 5678</p>
                        <p className="text-sm text-muted-foreground">Zalo: 0912 345 678</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Địa chỉ</p>
                        <p className="text-sm text-muted-foreground">Trường Đại học Thủy Lợi</p>
                        <p className="text-sm text-muted-foreground">175 Tây Sơn, Đống Đa, Hà Nội</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Giờ làm việc</p>
                        <p className="text-sm text-muted-foreground">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                        <p className="text-sm text-muted-foreground">Thứ 7: 8:00 - 12:00</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Kết Nối Với Chúng Tôi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" asChild>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-5 w-5" />
                        Facebook: TLU HUB Official
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" asChild>
                      <a href="https://zalo.me" target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="h-5 w-5" />
                        Zalo: TLU HUB Support
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5">
                  <CardContent className="pt-6">
                    <h3 className="mb-2 font-semibold">Thời gian phản hồi</h3>
                    <p className="text-sm text-muted-foreground">
                      Chúng tôi cam kết phản hồi mọi yêu cầu trong vòng 24 giờ làm việc. Đối với các vấn đề khẩn cấp,
                      vui lòng gọi hotline để được hỗ trợ nhanh nhất.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-border bg-card py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">Câu Hỏi Thường Gặp</h2>
              <p className="text-muted-foreground">Một số câu hỏi phổ biến từ sinh viên</p>
            </div>
            <div className="mx-auto grid max-w-3xl gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Làm sao để đăng ký khóa học?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Bạn cần tạo tài khoản TLU HUB, sau đó truy cập trang khóa học và nhấn "Đăng Ký Ngay". Đối với khóa
                    học trả phí, bạn cần nạp tiền vào tài khoản hoặc thanh toán trực tiếp.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tài liệu miễn phí có giới hạn tải về không?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Không, tất cả tài liệu miễn phí đều không giới hạn số lần tải về. Bạn có thể tải về và sử dụng cho
                    mục đích học tập cá nhân.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Có chứng chỉ sau khi hoàn thành khóa học không?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Có, sau khi hoàn thành 100% nội dung khóa học và đạt điểm tối thiểu trong bài kiểm tra, bạn sẽ nhận
                    được chứng chỉ điện tử từ TLU HUB.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
