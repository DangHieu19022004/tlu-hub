import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    role: "Sinh viên CNTT",
    content:
      "TLU HUB đã giúp tôi nâng cao kỹ năng lập trình rất nhiều. Các khóa học rất chất lượng và dễ hiểu. Tôi đã tìm được công việc mơ ước nhờ những kiến thức học được ở đây.",
    rating: 5,
    avatar: "/male-student-studying.png",
  },
  {
    id: 2,
    name: "Trần Thị B",
    role: "Sinh viên Thiết Kế",
    content:
      "Nền tảng tuyệt vời với nhiều tài liệu miễn phí. Giảng viên nhiệt tình và hỗ trợ tốt. Tôi đã học được rất nhiều kỹ năng thiết kế UI/UX từ các khóa học ở đây.",
    rating: 5,
    avatar: "/diverse-female-student.png",
  },
  {
    id: 3,
    name: "Lê Văn C",
    role: "Sinh viên Kinh Tế",
    content:
      "Các khóa học về marketing và kinh doanh rất thực tế và bổ ích. Tôi đã áp dụng được ngay vào công việc part-time của mình và thu được kết quả tốt.",
    rating: 5,
    avatar: "/male-business-student.jpg",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    role: "Sinh viên Ngoại Ngữ",
    content:
      "Giao diện thân thiện, dễ sử dụng. Cộng đồng học viên rất năng động và sẵn sàng giúp đỡ nhau. Tôi rất hài lòng với trải nghiệm học tập tại TLU HUB.",
    rating: 5,
    avatar: "/female-language-student.jpg",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground lg:text-4xl">Phản Hồi Từ Học Viên</h2>
          <p className="text-muted-foreground">Những gì học viên nói về chúng tôi</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-6 text-sm text-muted-foreground">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
