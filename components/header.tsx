"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState, Suspense } from "react"
import { cn } from "@/lib/utils"
import { AuthButtons } from "@/components/auth-buttons"
import { AuthButtonsSkeleton } from "@/components/auth-buttons-skeleton"
import { ComingSoonLink } from "@/components/coming-soon-link"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-12 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="TLU Hub Logo" 
                width={90} 
                height={28} 
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className={cn(
                "text-sm font-bold transition-colors",
                isActive("/") && pathname === "/"
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
              )}
            >
              Trang chủ
            </Link>
            <ComingSoonLink>
              Tài liệu
            </ComingSoonLink>
            <ComingSoonLink>
              Đăng tải
            </ComingSoonLink>
            <ComingSoonLink>
              Giới thiệu
            </ComingSoonLink>
          </nav>

          {/* Search & Auth */}
          <div className="flex items-center gap-4">
            
            <div className="hidden items-center gap-2 md:flex">
              <Suspense fallback={<AuthButtonsSkeleton />}>
                <AuthButtons />
              </Suspense>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/") && pathname === "/" ? "text-primary font-semibold" : "text-foreground",
                )}
              >
                Trang Chủ
              </Link>
              <ComingSoonLink>
                Tài Liệu
              </ComingSoonLink>
              <ComingSoonLink>
                Khóa Học
              </ComingSoonLink>
              <ComingSoonLink>
                Blog
              </ComingSoonLink>
              <ComingSoonLink>
                Liên Hệ
              </ComingSoonLink>
              <div className="flex flex-col gap-2 pt-4">
                <AuthButtons />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
