"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { UserDropdown } from "@/components/user-dropdown"
import { useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"

export function AuthButtons() {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toast({
      title: "Coming soon !!!",
      description: "Tính năng này đang được phát triển",
      variant: "coming-soon"
    })
  }

  // Prevent hydration mismatch - render same content on server and initial client render
  if (!mounted) {
    return (
      <Button 
        className="shadow-sm bg-primary text-primary-foreground hover:bg-accent hover:text-white font-semibold cursor-pointer"
        onClick={handleLoginClick}
      >
        Đăng Nhập
      </Button>
    )
  }

  if (user) {
    return <UserDropdown user={user} />
  }

  return (
    <Button 
      className="shadow-sm bg-primary text-primary-foreground hover:bg-accent hover:text-white font-semibold cursor-pointer"
      onClick={handleLoginClick}
    >
      Đăng Nhập
    </Button>
  )
}