"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [msv, setMsv] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Log để debug
      console.log("Attempting login with:", { msv, password })
      
      const success = await login(msv, password)

      if (success) {
        console.log("Login successful, redirecting...")
        router.push("/")
      } else {
        console.error("Login failed: Invalid credentials")
        setError("Mã sinh viên hoặc mật khẩu không đúng")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Đã xảy ra lỗi khi đăng nhập: " + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Đăng Nhập</CardTitle>
              <CardDescription>Đăng nhập vào TLU HUB bằng tài khoản sinh viên TLU</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="msv">Mã sinh viên</Label>
                  <Input
                    id="msv"
                    placeholder="225106****"
                    value={msv}
                    onChange={(e) => setMsv(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}
                
                <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Đang đăng nhập...
                    </span>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
