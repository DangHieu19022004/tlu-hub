import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AIChatbot } from "@/components/ai-chatbot"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "TLU HUB - Nền tảng học tập trực tuyến",
  description: "Xây dựng kỹ năng với khóa học và tài liệu chất lượng cao tại TLU HUB",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <AIChatbot />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
