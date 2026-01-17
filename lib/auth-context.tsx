"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { api } from "./api"
import type { LoginResponse } from "./types"
import { toast } from "@/hooks/use-toast"

interface User {
  studentId: string
  email: string
  name: string
  image: string
  isVIP: boolean
  balance: number
  gender: string
}

interface AuthContextType {
  user: User | null
  login: (studentId: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("tlu-hub-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("tlu-hub-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (studentId: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await api.login(studentId, password)

      // Parse response based on backend structure
      const userData: User = {
        studentId: response.user?.studentId || studentId,
        email: response.user?.email || `${studentId}@e.tlu.edu.vn`,
        name: response.user?.name || `Student ${studentId}`,
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${studentId}`,
        isVIP: response.user?.isVIP || false,
        balance: response.user?.balance || 0,
        gender: response.user?.gender || "unknown",
      }

      setUser(userData)
      localStorage.setItem("tlu-hub-user", JSON.stringify(userData))

      // Save token
      if (response.token) {
        localStorage.setItem("tlu-hub-token", response.token)
      }

      // Show success toast
      toast({
        variant: "success" as any,
        title: "Đăng nhập thành công!",
        description: `Chào mừng ${userData.name} quay lại TLU Hub`,
      })

      setIsLoading(false)
      return true
    } catch (error: any) {
      console.error("Login failed:", error)
      setIsLoading(false)
      
      // Show error toast with detailed message
      let errorMessage = "Đăng nhập thất bại. Vui lòng thử lại."
      
      if (error.status === 408) {
        errorMessage = "Server không phản hồi. Vui lòng kiểm tra backend hoặc kết nối mạng."
      } else if (error.status === 0) {
        errorMessage = "Không thể kết nối đến server. Vui lòng kiểm tra backend đã chạy chưa."
      } else if (error.status === 401 || error.status === 400) {
        errorMessage = "Mã sinh viên hoặc mật khẩu không chính xác"
      } else if (error.status >= 500) {
        errorMessage = "Lỗi server. Vui lòng thử lại sau."
      } else if (error.message) {
        errorMessage = error.message
      }

      toast({
        variant: "destructive",
        title: "Lỗi đăng nhập",
        description: errorMessage,
      })
      
      // Throw error with better message for UI
      throw new Error(errorMessage)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    
    // Always clear local state first
    const wasLoggedIn = !!user
    setUser(null)
    localStorage.removeItem("tlu-hub-user")
    localStorage.removeItem("tlu-hub-token")
    
    // Try to notify backend, but don't fail if it errors
    try {
      if (user?.studentId) {
        await api.logout(user.studentId)
      }
    } catch (error) {
      console.warn("Logout API call failed, but user is logged out locally:", error)
      // Don't throw - logout should always succeed on client side
    }
    
    // Show toast notification
    if (wasLoggedIn) {
      toast({
        variant: "default",
        title: "Đã đăng xuất",
        description: "Bạn đã đăng xuất khỏi TLU Hub",
      })
    }
    
    setIsLoading(false)
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
