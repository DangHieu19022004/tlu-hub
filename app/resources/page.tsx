'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect } from "react"
import { toast } from "@/hooks/use-toast"

export default function ResourcesPage() {
  useEffect(() => {
    toast({
      title: "Coming soon !!!",
      description: "Tính năng này đang được phát triển",
      variant: "coming-soon"
    })
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-[#fef5f7]">
      <Header />
      <main className="flex-1"></main>
      <Footer />
    </div>
  )
}
