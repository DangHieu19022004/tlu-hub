import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"

export function CTASection() {
  return (
    <section className="w-full flex justify-center py-24 px-4 bg-secondary/5">
      <div className="w-full max-w-[800px] flex flex-col items-center text-center gap-8 p-8 border-2 border-dashed border-secondary/30 rounded-3xl bg-white">
        <div className="size-16 bg-gradient-to-tr from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
          <Rocket className="text-white w-10 h-10" />
        </div>
        <h2 className="text-4xl font-black text-foreground leading-tight">
          Bạn đã sẵn sàng <br />
          <span className="text-primary">bứt phá điểm số?</span>
        </h2>
        <p className="text-gray-600 max-w-lg text-lg">
          Tham gia cộng đồng TLU Hub ngay hôm nay để không bỏ lỡ những tài liệu ôn thi cực chất.
        </p>
        <div className="flex gap-4">
          <Button className="bg-primary hover:bg-accent text-white h-14 px-10 rounded-full font-bold text-lg transition-all shadow-xl shadow-red-500/30 hover:scale-105 active:scale-95">
            Tạo tài khoản miễn phí
          </Button>
        </div>
      </div>
    </section>
  )
}
