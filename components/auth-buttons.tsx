"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { UserDropdown } from "@/components/user-dropdown"
import { memo } from "react"

function AuthButtonsComponent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="h-10 w-24 animate-pulse bg-gray-200 rounded"></div>
    )
  }

  if (user) {
    return <UserDropdown user={user} />
  }

  return (
    <Button className="shadow-sm bg-primary text-primary-foreground hover:bg-accent hover:text-white font-semibold" asChild>
      <Link href="/login" prefetch={true}>Đăng Nhập</Link>
    </Button>
  )
}

export const AuthButtons = memo(AuthButtonsComponent)