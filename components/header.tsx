"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState, Suspense, memo, useCallback } from "react"
import { cn } from "@/lib/utils"
import { AuthButtons } from "@/components/auth-buttons"
import { AuthButtonsSkeleton } from "@/components/auth-buttons-skeleton"
import { ComingSoonLink } from "./coming-soon-link"

function HeaderComponent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm will-change-transform">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-12 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="TLU Hub Logo" 
                width={90} 
                height={28}
                className="object-contain transition-transform duration-200 hover:scale-105"
                priority
                quality={90}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className={cn(
                "text-sm font-bold transition-all duration-200 ease-in-out hover:scale-105",
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
                "text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105",
                isActive("/resources")
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
              )}
            >
              Tài liệu
            </Link>
            {/* <Link
              href="/courses"
              className={cn(
                "text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105",
                isActive("/courses")
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
              )}
            >
              Đăng tải
            </Link> */}
            <ComingSoonLink>
              Đăng tải
            </ComingSoonLink>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105",
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
                Quản Lý Tài Liệu
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
              <div className="flex flex-col gap-2 pt-4 hover:cursor-pointer">
                <AuthButtons />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export const Header = memo(HeaderComponent)
