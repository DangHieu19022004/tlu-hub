"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState, Suspense } from "react"
import { cn } from "@/lib/utils"
import { AuthButtons } from "@/components/auth-buttons"
import { AuthButtonsSkeleton } from "@/components/auth-buttons-skeleton"

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
                width={120} 
                height={48} 
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
            <Link
              href="/resources"
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/resources")
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
              )}
            >
              Tài liệu
            </Link>
            <Link
              href="/courses"
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/courses")
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
              )}
            >
              Đăng tải
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/contact")
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
              )}
            >
              Giới thiệu
            </Link>
          </nav>

          {/* Search & Auth */}
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Tìm kiếm..." className="w-64 pl-9" />
            </div>
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
              <Link
                href="/resources"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/resources") ? "text-primary font-semibold" : "text-foreground",
                )}
              >
                Tài Liệu
              </Link>
              <Link
                href="/courses"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/courses") ? "text-primary font-semibold" : "text-foreground",
                )}
              >
                Khóa Học
              </Link>
              <Link
                href="/blog"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/blog") ? "text-primary font-semibold" : "text-foreground",
                )}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/contact") ? "text-primary font-semibold" : "text-foreground",
                )}
              >
                Liên Hệ
              </Link>
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
