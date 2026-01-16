"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, Mail, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  const { login, user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && user) {
      router.push("/profile")
    }
  }, [mounted, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      await login(formData.studentId, formData.password)
      // Show success message briefly before redirect
      setSuccess(true)
      setTimeout(() => {
        // If login succeeds, user will be set and useEffect will redirect
      }, 800)
    } catch (err: any) {
      console.error("Login error:", err)
      const errorMessage = "Đăng nhập thất bại. Vui lòng thử lại."
      setError(errorMessage)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fef5f7]">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        {!mounted || isLoading || user ? (
          <Spinner size="lg" text="Đang tải..." />
        ) : (
        <div 
          className="w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          style={{
            animation: 'fadeInUp 0.6s ease-out',
          }}
        >
          <Card className="shadow-xl border-2">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20">
                <Image
                  src="/logo.png"
                  alt="TLU Hub Logo"
                  width={80}
                  height={80}
                  className="w-full"
                />
              </div>
              <CardTitle className="text-3xl font-bold text-primary">Đăng nhập</CardTitle>
              <CardDescription className="text-base space-y-1">
                <p>Hệ thống dành riêng cho sinh viên Trường Đại học Thủy Lợi, hãy đăng nhập bằng tài khoản sinh viên để tiếp tục.</p>
                <p>Nếu bạn là học sinh trường khác hãy <Link href="/contact" className="text-primary hover:underline">liên hệ với chúng tôi</Link>.</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div 
                    className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in-0 slide-in-from-top-2 duration-300"
                    style={{
                      animation: 'shake 0.5s ease-in-out',
                    }}
                  >
                    <XCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div 
                    className="bg-green-50 border-2 border-pink-200 text-pink-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in-0 slide-in-from-top-2 duration-300"
                    style={{
                      animation: 'successPulse 0.6s ease-in-out',
                    }}
                  >
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    <span className="font-semibold">Đăng nhập thành công! Đang chuyển hướng...</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-base font-semibold">
                    Mã sinh viên
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                    <Input
                      id="studentId"
                      type="text"
                      placeholder="VD: 2251961779"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      className="pl-12 h-12 text-base"
                      required
                      disabled={loading || success}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-semibold">
                    Mật khẩu
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-12 pr-10 h-12 text-base"
                      required
                      disabled={loading || success}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 w-4 h-4 accent-primary focus:ring-primary cursor-pointer" 
                    />
                    <span>Ghi nhớ đăng nhập</span>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-bold transition-all duration-300 hover:shadow-lg"
                  disabled={loading || success}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Đang xử lý...</span>
                    </div>
                  ) : success ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Thành công!</span>
                    </div>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </form>
              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-center text-gray-500">
                  Bằng cách đăng nhập, bạn đồng ý với{" "}
                  <Link 
                    href="/terms" 
                    className="text-primary hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      toast({
                        title: "Coming soon !!!",
                        description: "Chúng tôi đang hoàn thiện tính năng này",
                        variant: "coming-soon"
                      })
                    }}
                  >
                    Điều khoản dịch vụ
                  </Link>{" "}
                  và{" "}
                  <Link 
                    href="/privacy" 
                    className="text-primary hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      toast({
                        title: "Coming soon !!!",
                        description: "Chúng tôi đang hoàn thiện tính năng này",
                        variant: "coming-soon"
                      })
                    }}
                  >
                    Chính sách bảo mật
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
