"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, Mail, Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  const { login, user, isLoading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const success = await login(formData.studentId, formData.password)
      if (success) {
        router.push("/dashboard")
      } else {
        setError("Mã sinh viên hoặc mật khẩu không chính xác")
      }
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  if (isLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fef5f7]">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
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
              <CardDescription className="text-base">
                Đăng nhập vào TLU Hub để truy cập tài liệu và khóa học
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-base font-semibold">
                    Mã sinh viên
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="studentId"
                      type="text"
                      placeholder="VD: 2251961779"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      className="pl-10 h-12 text-base"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-semibold">
                    Mật khẩu
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10 h-12 text-base"
                      required
                      disabled={loading}
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
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Ghi nhớ đăng nhập</span>
                  </label>
                  <Link href="#" className="text-primary hover:text-accent font-medium">
                    Quên mật khẩu?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Đang đăng nhập...
                    </>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  Chưa có tài khoản?{" "}
                  <Link href="/register" className="text-primary hover:text-accent font-semibold">
                    Đăng ký ngay
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-center text-gray-500">
                  Bằng cách đăng nhập, bạn đồng ý với{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Điều khoản dịch vụ
                  </Link>{" "}
                  và{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Chính sách bảo mật
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
