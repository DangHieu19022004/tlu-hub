import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIChatbot } from "@/components/ai-chatbot"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fef5f7]">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="w-full flex justify-center py-12 px-4 sm:px-10 border-b border-border bg-gradient-to-b from-white to-[#fff0f3]">
          <div className="w-full max-w-[1100px]">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                Liên Hệ <span className="text-primary">Với Chúng Tôi</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Có câu hỏi hoặc cần hỗ trợ? Chúng tôi luôn sẵn sàng giúp đỡ bạn
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="w-full flex justify-center py-16 px-4 sm:px-10">
          <div className="w-full max-w-[1100px]">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Gửi Tin Nhắn</CardTitle>
                  <CardDescription>
                    Điền thông tin bên dưới và chúng tôi sẽ phản hồi trong vòng 24h
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Họ và tên</label>
                    <Input placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="email@tlu.edu.vn" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tiêu đề</label>
                    <Input placeholder="Vấn đề bạn muốn liên hệ" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nội dung</label>
                    <Textarea
                      placeholder="Mô tả chi tiết câu hỏi hoặc vấn đề của bạn..."
                      rows={5}
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-accent">
                    <Send className="mr-2 h-4 w-4" />
                    Gửi tin nhắn
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông Tin Liên Hệ</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <p className="text-gray-600">contact@tluhub.edu.vn</p>
                        <p className="text-gray-600">support@tluhub.edu.vn</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-accent/10">
                        <Phone className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Điện thoại</h4>
                        <p className="text-gray-600">024 1234 5678</p>
                        <p className="text-gray-600">0987 654 321</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Giờ Làm Việc</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-gray-600">
                      <p><strong>Thứ 2 - Thứ 6:</strong> 8:00 - 17:00</p>
                      <p><strong>Thứ 7:</strong> 8:00 - 12:00</p>
                      <p><strong>Chủ nhật:</strong> Nghỉ</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatbot />
    </div>
  )
}
