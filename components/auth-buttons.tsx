"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { UserDropdown } from "@/components/user-dropdown"
import { useState, useEffect } from "react"

export function AuthButtons() {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch - render same content on server and initial client render
  if (!mounted) {
    return (
      <Button variant="ghost" className="shadow-sm bg-teal-200" asChild>
        <Link href="/login">Đăng Nhập</Link>
      </Button>
    )
  }

  if (user) {
    return <UserDropdown user={user} />
  }

  return (
    <Button variant="ghost" className="shadow-sm bg-teal-200" asChild>
      <Link href="/login">Đăng Nhập</Link>
    </Button>
  )
}