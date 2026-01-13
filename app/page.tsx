'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookOpen, FileText, Users, Sparkles, Clock, Rocket, GraduationCap, BookMarked, Lightbulb, Presentation, Calendar, Timer, Zap } from 'lucide-react'
import Image from "next/image"

export default function HomePage() {
  // Ngày đích: Mùng 1 Tết 2026 (17/02/2026)
  const launchDate = new Date('2026-02-17T00:00:00')

  // State ban đầu là 0 để tránh hiển thị sai số ngày trước khi tính toán xong
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Hàm tính toán tách riêng để gọi ngay lập tức
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = launchDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        // Xử lý khi đã đến Tết
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Gọi ngay lập tức 1 lần để không bị delay 1 giây đầu tiên
    calculateTimeLeft()

    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const documentTypes = [
    {
      title: "Kho đề ôn thi thực chiến",
      description: "Tổng hợp đề ôn tập. Có đáp án chi tiết tự tin điểm A",
      icon: GraduationCap
    },
    {
      title: "Giáo trình chuẩn và mới",
      description: "Không cần mang sách nặng. Truy cập giáo trình file mềm và tài liệu tham khảo mọi lúc mọi nơi.",
      icon: BookMarked
    },
    {
      title: "Bí kíp giải bài tập",
      description: "Ngân hàng câu hỏi ôn tập, bài giải mẫu giúp bạn gỡ rối những bài toán hóc búa nhất.",
      icon: Lightbulb
    },
    {
      title: "Note tay & Slide bài giảng",
      description: "Slide bài giảng gốc từ thầy cô và vở ghi chép 'xịn sò' từ các tiền bối đi trước.",
      icon: Presentation
    }
  ]

  const targetAudience = [
    {
      title: "Chiến thần ôn thi",
      description: "Đang trong giai đoạn nước rút, cần tài liệu trọng tâm để ôn cấp tốc và đạt điểm cao."
    },
    {
      title: "Thợ săn học bổng",
      description: "Muốn nghiên cứu sâu, tìm tòi các tài liệu nâng cao để chinh phục GPA tuyệt đối."
    },
    {
      title: "Người truyền lửa",
      description: "Đã học xong và muốn chia sẻ lại tài liệu quý giá của mình để giúp đỡ các khoá sau."
    },
    {
      title: "Tân sinh viên TLU",
      description: "Còn bỡ ngỡ với môi trường đại học, cần tìm nguồn tài liệu uy tín để bắt nhịp nhanh chóng."
    }
  ]

  const faqs = [
    {
      question: "Tài liệu có miễn phí không?",
      answer: "Hoàn toàn miễn phí! Tất cả tài liệu đều được chia sẻ miễn phí bởi cộng đồng sinh viên TLU."
    },
    {
      question: "Làm sao để đóng góp tài liệu?",
      answer: "Sau khi đăng ký, bạn có thể upload tài liệu qua trang Upload. Tài liệu sẽ được kiểm duyệt trước khi công khai."
    },
    {
      question: "Ai có thể truy cập?",
      answer: "Tất cả sinh viên Đại học Thủy Lợi đều có thể truy cập và sử dụng nền tảng."
    },
    {
      question: "Tài liệu có chất lượng không?",
      answer: "Có! Mọi tài liệu đều được kiểm tra chất lượng kĩ lưỡng bởi đội ngũ quản trị uy tín"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#fef5f7]">
      <Header />
      
      <main className="flex-1">
        <section className="w-full flex justify-center py-8 px-4 sm:px-10">
          <div className="w-full max-w-[1200px]">
            <div className="@container">
              <div className="@[480px]:p-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-[2rem] items-center justify-center p-8 text-center shadow-2xl shadow-red-500/20 border-4 border-white overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(rgba(20, 10, 15, 0.6), rgba(20, 10, 15, 0.85)), url('/bg.webp')`
                  }}
                >
                  <div className="relative z-10 flex flex-col gap-3 max-w-4xl">
                    <motion.div 
                      className="mx-auto w-36 h-auto"
                      animate={{ 
                        y: [0, -15, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Image
                        alt="TLU Hub Logo"
                        src="/logo.png"
                        width={144}
                        height={144}
                        className="w-full drop-shadow-2xl"
                        priority
                      />
                    </motion.div>

                    <div className="flex flex-col gap-2">
                      <h1 className="text-white text-3xl font-black !leading-[1.2] tracking-[-0.033em] @[480px]:text-5xl drop-shadow-lg">
                        Kho tài liệu chung cho <br />
                        <span className="bg-gradient-to-r from-[#5dade2] via-[#7ac8f1] to-[#b5e5ff] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(90,173,226,0.65)]">
                          Sinh viên Đại học Thủy Lợi
                        </span>
                      </h1>

                      <h2 className="text-gray-100 text-sm font-normal leading-relaxed @[480px]:text-base max-w-2xl mx-auto drop-shadow-md">
                        Nền tảng chia sẻ tri thức mở, nơi bạn tìm thấy mọi đề thi, giáo trình và bài giảng chất lượng cao từ cộng đồng TLU.
                      </h2>
                    </div>

                    <div className="flex items-center justify-center gap-3 flex-wrap mt-3 mb-1">
                      <span className="text-white text-base md:text-lg font-bold">Website sẽ ra mắt trong:</span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto my-4">
                      {[
                        { label: 'Ngày', value: timeLeft.days },
                        { label: 'Giờ', value: timeLeft.hours },
                        { label: 'Phút', value: timeLeft.minutes },
                        { label: 'Giây', value: timeLeft.seconds }
                      ].map((item) => (
                        <div key={item.label} className="flex flex-col items-center gap-2">
                          <div className="relative w-full aspect-square max-w-[110px] md:max-w-[130px] flex items-center justify-center rounded-2xl bg-white shadow-lg shadow-accent/20 border-2 border-accent/30 p-2">
                            <span className="text-3xl md:text-4xl lg:text-5xl font-black text-primary tabular-nums">
                              {String(item.value).padStart(2, '0')}
                            </span>
                          </div>
                          <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-white/90">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="mt-6 w-full max-w-md mx-auto"
                    >
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          placeholder="Email của bạn..."
                          className="flex-1 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 px-5 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-all"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                        >
                          Nhận thông báo
                        </motion.button>
                      </div>
                    </motion.div> */}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full flex justify-center py-24 px-4 md:px-8 overflow-visible relative bg-gradient-to-br from-pink-100 to-pink-50">
          <div className="w-full max-w-[1400px] relative">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, type: "spring" }}
                viewport={{ once: true }}
                className="lg:col-span-5 relative z-30"
              >
                <div className="relative group max-w-sm mx-auto">
                  <div className="absolute -inset-8 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity" />
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <Image
                      src="/chibitlu1.png"
                      alt="Sinh viên TLU"
                      width={350}
                      height={400}
                      className="relative z-10 drop-shadow-2xl w-full h-auto"
                    />
                  </motion.div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-gradient-to-r from-transparent via-black/20 to-transparent rounded-full blur-xl" />
                </div>
              </motion.div>

              <div className="lg:col-span-7 space-y-6 relative z-20">
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6">
                    <span className="text-gray-800">Vũ khí săn <span className="text-primary">học bổng</span></span>                    
                  </h2>
                </motion.div>

                <div className="grid gap-4">
                  {documentTypes.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-4 rounded-3xl border border-accent/20 bg-white p-6 shadow-xl shadow-accent/10"
                      >
                        <div className="text-accent size-12 flex items-center justify-center bg-accent/10 rounded-2xl mb-1">
                          <Icon className="w-8 h-8" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h3 className="text-foreground text-xl font-bold">
                            {item.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 rounded-full blur-3xl opacity-20 -z-10" />
        </section>

        <section className="w-full flex justify-center py-24 px-4 md:px-8 bg-gradient-to-b from-white to-[#fff0f3] relative overflow-hidden">
          <div className="w-full max-w-[1400px] relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-black leading-tight">
                <span className="text-gray-800">Đồng hành cùng mọi mục tiêu</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative z-20">
              {targetAudience.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.03,
                    zIndex: 50
                  }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-br from-pink-400 via-blue-300 to-blue-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all h-full">
                    <div className="absolute -top-4 -right-4 w-14 h-14 rounded-xl bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all">
                      {index + 1}
                    </div>
                    <div className="pt-4">
                      <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-3 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full opacity-50" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: -50, rotate: -10 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1, type: "spring" }}
              viewport={{ once: true }}
              className="absolute -bottom-12 -right-12 lg:bottom-8 lg:right-16 z-10 hidden lg:block"
            >
              
            </motion.div>
          </div>

          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-300 via-white/40 to-pink-300 rounded-full blur-3xl opacity-20 -z-10" />
        </section>

        <section className="w-full flex justify-center py-24 px-4 md:px-8 relative overflow-hidden bg-gradient-to-br from-pink-100 to-pink-50">
          <div className="w-full max-w-[1400px] relative">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 relative z-20">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h2 className="text-3xl md:text-5xl font-black leading-tight">
                    <span className="text-gray-800">Câu hỏi thường gặp</span>
                  </h2>
                </motion.div>

                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-white/30 to-pink-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity" />
                      <div className="relative bg-gradient-to-br from-blue-50 via-white to-pink-50 rounded-2xl p-6 border-2 border-white shadow-xl group-hover:shadow-2xl transition-all">
                        <div className="flex items-start gap-5">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-white font-black text-xl shrink-0 shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 leading-snug">
                              {faq.question}
                            </h3>
                            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-br-2xl" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, type: "spring" }}
                viewport={{ once: true }}
                className="lg:col-span-5 relative z-30 hidden lg:block"
              >
                <div className="relative max-w-md mx-auto">
                  <div className="absolute -inset-10 bg-gradient-to-br from-blue-400 via-pink-300 to-pink-500 rounded-full blur-3xl opacity-40" />
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <Image
                      src="/chibitlu2.png"
                      alt="Sinh viên học tập"
                      width={380}
                      height={450}
                      className="relative z-10 drop-shadow-2xl w-full h-auto"
                    />
                  </motion.div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-36 h-8 bg-gradient-to-r from-transparent via-black/20 to-transparent rounded-full blur-xl" />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-300 via-white/30 to-blue-500 rounded-full blur-3xl opacity-20 -z-10" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-pink-300 via-white/30 to-pink-500 rounded-full blur-3xl opacity-20 -z-10" />
        </section>

        <section className="w-full flex justify-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full max-w-[800px] flex flex-col items-center text-center gap-8 p-8 border-2 border-dashed border-secondary/30 rounded-3xl bg-white"
          >
            <motion.div
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="size-16 bg-gradient-to-tr from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Rocket className="text-white w-10 h-10" />
            </motion.div>
            <h2 className="text-4xl font-black text-foreground leading-tight">
              Bạn đã sẵn sàng <br />
              <span className="text-primary">bứt phá điểm số?</span>
            </h2>
            <p className="text-gray-600 max-w-lg text-lg">
              Tham gia cộng đồng TLU Hub ngay hôm nay để không bỏ lỡ những tài liệu ôn thi cực chất.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-accent text-white h-14 px-10 rounded-full font-bold text-lg transition-all shadow-xl shadow-red-500/30"
            >
              Tham gia ngay
            </motion.button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
