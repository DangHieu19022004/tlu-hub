import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="w-full flex justify-center py-5 px-4 sm:px-10">
      <div className="w-full max-w-[1200px] flex flex-col">
        <div className="@container">
          <div className="@[480px]:p-4">
            <div
              className="flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-[2rem] items-center justify-center p-8 text-center shadow-xl shadow-red-500/10 border-4 border-white"
              style={{
                backgroundImage: `linear-gradient(rgba(20, 10, 15, 0.5), rgba(20, 10, 15, 0.8)), url('/bg.webp')`
              }}
            >
              <div className="flex flex-col gap-4 max-w-4xl">
                <div className="mx-auto w-36 h-auto mb-2 animate-bounce">
                  <Image
                    alt="TLU Hub Logo Hero"
                    src="/logo.png"
                    width={144}
                    height={144}
                    className="w-full drop-shadow-lg"
                    priority
                  />
                </div>
                <h1 className="text-white text-4xl font-black !leading-[1.2] tracking-[-0.033em] @[480px]:text-6xl drop-shadow-lg">
                  Kho tài liệu chung cho <br />
                  <span className="bg-gradient-to-r from-[#5dade2] via-[#7ac8f1] to-[#b5e5ff] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(90,173,226,0.65)]">
                    Sinh viên Đại học Thủy Lợi
                  </span>
                </h1>
                <h2 className="text-gray-100 text-base font-normal leading-relaxed @[480px]:text-lg max-w-xl mx-auto drop-shadow-md">
                  Nền tảng chia sẻ tri thức mở, nơi bạn tìm thấy mọi đề thi, giáo trình và bài giảng chất lượng cao từ cộng đồng TLU.
                </h2>
              </div>
              
              <div className="w-full max-w-[640px] mt-4">
                <label className="flex flex-col w-full h-14 @[480px]:h-16 relative shadow-2xl shadow-blue-900/20 rounded-full">
                  <div className="flex w-full flex-1 items-stretch rounded-full h-full overflow-hidden bg-white ring-4 ring-white/20">
                    <div className="text-secondary flex bg-white items-center justify-center pl-6 pr-2 border-r-0">
                      <Search className="text-2xl" />
                    </div>
                    <Input
                      className="flex w-full min-w-0 flex-1 resize-none outline-none text-foreground bg-white h-full placeholder:text-gray-400 px-2 text-base font-medium border-0"
                      placeholder="Tìm kiếm mã môn, tên môn học (VD: CSE482)..."
                    />
                    <div className="flex items-center justify-center bg-white pr-2 pl-2">
                      <Button className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-full h-11 px-6 bg-primary hover:bg-accent text-white text-base font-bold transition-all shadow-md">
                        <span>Tìm kiếm</span>
                      </Button>
                    </div>
                  </div>
                </label>
                
                <div className="mt-4 text-white/90 text-sm flex flex-wrap gap-2 justify-center items-center">
                  <span className="font-bold">Gợi ý:</span>
                  <Link
                    className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors border border-white/20 backdrop-blur-sm"
                    href="#"
                  >
                    Giải tích 1
                  </Link>
                  <Link
                    className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors border border-white/20 backdrop-blur-sm"
                    href="#"
                  >
                    Vật lý đại cương
                  </Link>
                  <Link
                    className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors border border-white/20 backdrop-blur-sm"
                    href="#"
                  >
                    Triết học Mác - Lênin
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
