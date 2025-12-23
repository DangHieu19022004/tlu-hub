import Link from "next/link"
import Image from "next/image"
import { Mail, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-red-50 py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-5 max-w-xs">
          <div className="flex items-center gap-2">
            <div className="h-10 flex items-center justify-center">
              <Image
                alt="TLU Hub Footer Logo"
                src="/logo.png"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Nền tảng chia sẻ tài liệu phi lợi nhuận dành cho sinh viên Đại học Thủy Lợi. Cùng nhau học tập, cùng nhau tiến bộ.
          </p>
          <div className="flex gap-3 mt-2">
            <Link
              className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-blue-600 transition-all"
              href="#"
            >
              <Globe className="w-5 h-5" />
            </Link>
            <Link
              className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-primary transition-all"
              href="#"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-16">
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-foreground text-lg">
              Khám phá
            </h4>
            <Link
              className="text-sm text-gray-600 hover:text-primary font-medium"
              href="/resources"
            >
              Tài liệu mới
            </Link>
            <Link
              className="text-sm text-gray-600 hover:text-primary font-medium"
              href="/courses"
            >
              Môn học phổ biến
            </Link>
            <Link
              className="text-sm text-gray-600 hover:text-primary font-medium"
              href="/resources"
            >
              Bảng xếp hạng
            </Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-foreground text-lg">
              Hỗ trợ
            </h4>
            <Link
              className="text-sm text-gray-600 hover:text-primary font-medium"
              href="/resources"
            >
              Hướng dẫn đăng tải
            </Link>
            <Link
              className="text-sm text-gray-600 hover:text-primary font-medium"
              href="/blog"
            >
              Quy định cộng đồng
            </Link>
            <Link
              className="text-sm text-gray-600 hover:text-primary font-medium"
              href="/contact"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 mt-12 pt-8 border-t border-gray-100 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs text-gray-400 font-medium">
          © 2024 TLU Hub. Designed for Students.
        </p>
        <p className="text-xs text-gray-400 font-medium mt-2 md:mt-0">
          Made with ❤️ by TLU Students
        </p>
      </div>
    </footer>
  )
}
