import { Button } from "@/components/ui/button"
import { BookOpen, CheckCircle, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section className="w-full flex justify-center py-12 bg-gradient-to-b from-white to-[#fff0f3]">
      <div className="w-full max-w-[1100px] flex flex-col px-4 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-primary w-fit">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Về chúng tôi
                </span>
              </div>
              <h2 className="text-foreground tracking-tight text-4xl font-black leading-tight">
                Tại sao chọn <span className="text-primary">TLU Hub</span>?
              </h2>
              <p className="text-gray-600 text-lg font-normal leading-relaxed max-w-[480px]">
                Nền tảng hỗ trợ học tập toàn diện dành riêng cho sinh viên Thủy Lợi. 
                Chúng tôi xây dựng môi trường chia sẻ tri thức mở, vui vẻ và hiệu quả.
              </p>
            </div>
            <Button className="flex items-center justify-center rounded-full h-12 px-8 bg-primary hover:bg-accent text-white text-base font-bold w-fit transition-all shadow-lg shadow-red-300">
              <span className="truncate">Tìm hiểu thêm</span>
            </Button>
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <div className="flex flex-col gap-4 rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-50">
              <div className="text-secondary size-12 flex items-center justify-center bg-blue-50 rounded-2xl mb-1">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-xl font-bold">
                  Đa dạng môn học
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Tài liệu phong phú từ các khoa Công trình, CNTT, Kinh tế và nhiều hơn nữa.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 rounded-3xl border border-green-100 bg-white p-6 shadow-xl shadow-green-50">
              <div className="text-green-500 size-12 flex items-center justify-center bg-green-50 rounded-2xl mb-1">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-xl font-bold">
                  Miễn phí hoàn toàn
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Không giới hạn lượt tải cho sinh viên, truy cập mọi lúc mọi nơi.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 rounded-3xl border border-primary/20 bg-white p-6 shadow-xl shadow-red-50 sm:col-span-2">
              <div className="text-primary size-12 flex items-center justify-center bg-red-50 rounded-2xl mb-1">
                <Users className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-xl font-bold">
                  Cộng đồng sinh viên
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Kết nối với hàng ngàn sinh viên khác. Tích điểm và nhận quyền lợi khi chia sẻ tài liệu hữu ích của bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
