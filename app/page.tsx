'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookOpen, FileText, Users, Sparkles, Clock } from 'lucide-react'
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

  const features = [
    {
      icon: BookOpen,
      title: "Tài liệu đa dạng",
      description: "Đề thi, giáo trình, bài giảng từ mọi khoa"
    },
    {
      icon: FileText,
      title: "Dễ dàng tìm kiếm",
      description: "Tìm tài liệu theo môn học nhanh chóng"
    },
    {
      icon: Users,
      title: "Cộng đồng sinh viên",
      description: "Chia sẻ và học hỏi cùng nhau"
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
                  className="relative flex min-h-[580px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-[2rem] items-center justify-center p-8 text-center shadow-2xl shadow-red-500/20 border-4 border-white overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(rgba(20, 10, 15, 0.6), rgba(20, 10, 15, 0.85)), url('/bg.webp')`
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-2 w-2 rounded-full bg-blue-400/30"
                        animate={{
                          y: [0, -30, 0],
                          x: [0, Math.random() * 20 - 10, 0],
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2
                        }}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10 flex flex-col gap-6 max-w-4xl">
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

                    <div className="flex flex-col gap-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center gap-2 mx-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20"
                      >
                        <Sparkles className="h-4 w-4 text-yellow-300" />
                        <span className="text-white/90 text-sm font-medium">Sắp Ra Mắt</span>
                        <Sparkles className="h-4 w-4 text-yellow-300" />
                      </motion.div>

                      <h1 className="text-white text-4xl font-black !leading-[1.2] tracking-[-0.033em] @[480px]:text-6xl drop-shadow-lg">
                        Kho tài liệu chung cho <br />
                        <span className="bg-gradient-to-r from-[#5dade2] via-[#7ac8f1] to-[#b5e5ff] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(90,173,226,0.65)]">
                          Sinh viên Đại học Thủy Lợi
                        </span>
                      </h1>

                      <h2 className="text-gray-100 text-base font-normal leading-relaxed @[480px]:text-lg max-w-2xl mx-auto drop-shadow-md">
                        Nền tảng chia sẻ tri thức mở, nơi bạn tìm thấy mọi đề thi, giáo trình và bài giảng chất lượng cao từ cộng đồng TLU.
                      </h2>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="flex items-center justify-center gap-3 flex-wrap mt-6 mb-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Clock className="h-7 w-7 text-yellow-300" />
                      </motion.div>
                      <span className="text-white text-lg md:text-xl font-bold">Website sẽ ra mắt trong:</span>
                    </motion.div>

                    <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto my-8">
                      {[
                        { label: 'Ngày', value: timeLeft.days, color: 'from-pink-500 to-rose-500' },
                        { label: 'Giờ', value: timeLeft.hours, color: 'from-purple-500 to-indigo-500' },
                        { label: 'Phút', value: timeLeft.minutes, color: 'from-blue-500 to-cyan-500' },
                        { label: 'Giây', value: timeLeft.seconds, color: 'from-teal-500 to-emerald-500' }
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, scale: 0.5, y: 50 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: 0.5 + index * 0.1,
                            type: "spring",
                            stiffness: 200
                          }}
                          className="flex flex-col items-center gap-3"
                        >
                          <motion.div
                            animate={{ 
                              scale: [1, 1.08, 1],
                              boxShadow: [
                                '0 0 20px rgba(59, 130, 246, 0.5)',
                                '0 0 40px rgba(139, 92, 246, 0.8)',
                                '0 0 20px rgba(59, 130, 246, 0.5)'
                              ]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.2,
                              ease: "easeInOut"
                            }}
                            className={`relative w-full aspect-square max-w-[110px] md:max-w-[130px] flex items-center justify-center rounded-3xl bg-gradient-to-br ${item.color} backdrop-blur-md border-3 border-white shadow-2xl`}
                          >
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 to-transparent" />
                            
                            <span className="relative text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl">
                              {String(item.value).padStart(2, '0')}
                            </span>
                            
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-3xl"
                              animate={{
                                x: ['-100%', '200%']
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: index * 0.5,
                                repeatDelay: 1.5
                              }}
                            />
                            
                            <motion.div
                              className="absolute inset-0 rounded-3xl border-2 border-white/50"
                              animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.5, 0, 0.5]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.2
                              }}
                            />
                          </motion.div>
                          <motion.span 
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                            className="text-sm md:text-base lg:text-lg font-bold uppercase tracking-widest text-white drop-shadow-lg"
                          >
                            {item.label}
                          </motion.span>
                        </motion.div>
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

        <section className="w-full flex justify-center py-16 px-4">
          <div className="w-full max-w-[1200px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Những tính năng sắp ra mắt
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                TLU Hub sẽ mang đến trải nghiệm học tập tuyệt vời với nhiều tính năng hữu ích
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-red-50 h-full">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                      className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-200 group-hover:to-purple-200 transition-all"
                    >
                      <feature.icon className="h-8 w-8 text-blue-600" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full flex justify-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full max-w-[1200px] bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-12 text-center border-2 border-white shadow-xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center"
            >
              <Sparkles className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Hãy cùng chờ đón nhé!
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Chúng tôi đang hoàn thiện những tính năng tuyệt vời để mang đến trải nghiệm tốt nhất cho bạn
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
