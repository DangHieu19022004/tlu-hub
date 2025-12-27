'use client'

import { motion } from 'framer-motion'
import { Construction, ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function UnderDevelopment() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative mx-auto w-32 h-32 mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-xl opacity-60" />
          <div className="relative bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-8 shadow-2xl">
            <Construction className="h-16 w-16 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-2 rounded-full border border-blue-100 mb-4">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Đang Phát Triển</span>
            <Sparkles className="h-4 w-4 text-purple-500" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Tính năng đang được xây dựng
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Chúng tôi đang nỗ lực hoàn thiện trang này để mang đến trải nghiệm tốt nhất cho bạn. 
            Hãy quay lại sau nhé! 🚀
          </p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">Đang hoàn thiện...</p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Về Trang Chủ
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
