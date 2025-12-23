"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { api } from "./api"

interface User {
  email: string
  name: string
  image: string
  studentId?: string // Add studentId field
}

interface AuthContextType {
  user: User | null
  login: (studentId: string, password: string) => Promise<boolean> // Changed from email to studentId
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEMO_USER = {
  studentId: "2251961779",
  email: "user1@e.tlu.edu.vn",
  password: "123",
  name: "User1",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("tlu-hub-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (studentId: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Try server login first
      console.log("🔐 Calling API login with:", { studentId, password: "***" })
      const res: any = await api.login(studentId, password)
      console.log("✅ API login response (raw):", res)
      console.log("✅ API login response (stringified):", JSON.stringify(res, null, 2))
      console.log("✅ Response type:", typeof res)
      console.log("✅ Response keys:", res ? Object.keys(res) : "null")
      
      // IMPORTANT: Log to see what fields backend actually returns
      // Backend might return different field names than expected
      
      // Check if response indicates success
      // Try to be flexible with response format
      if (res !== null && res !== undefined) {
        console.log("✅ Response is not null/undefined, processing...")
        
        const userData: User = {
          studentId: res.user?.studentId ?? res.studentId ?? res.student_id ?? res.id ?? studentId,
          email: res.user?.email ?? res.email ?? `${studentId}@e.tlu.edu.vn`,
          name: res.user?.name ?? res.name ?? res.username ?? res.studentName ?? res.student_name ?? res.fullName ?? res.full_name ?? `Student ${studentId}`,
          image: res.user?.image ?? res.image ?? res.avatar ?? res.avatarUrl ?? DEMO_USER.image,
        }
        console.log("👤 Setting user data:", userData)
        setUser(userData)
        localStorage.setItem("tlu-hub-user", JSON.stringify(userData))
        
        // Save token if exists
        const token = res.token ?? res.accessToken ?? res.access_token ?? res.jwt ?? res.bearer
        if (token) {
          console.log("🔑 Saving token:", token.substring(0, 20) + "...")
          localStorage.setItem("tlu-hub-token", token)
        } else {
          console.warn("⚠️ No token found in response")
        }
        
        setIsLoading(false)
        return true
      } else {
        console.error("❌ Response is null or undefined")
      }
    } catch (err: any) {
      // If API fails (dev mode or server unreachable), fallback to demo credentials for local development
      // This keeps existing demo flow intact while wiring in real API usage when available.
      // Only allow fallback if credentials match demo user.
      // eslint-disable-next-line no-console
      console.warn("❌ API login failed:", {
        message: err.message,
        status: err.status,
        data: err.data
      })
      if (studentId === DEMO_USER.studentId && password === DEMO_USER.password) {
        console.log("✅ Using demo fallback")
        const userData = {
          studentId: DEMO_USER.studentId,
          email: DEMO_USER.email,
          name: DEMO_USER.name,
          image: DEMO_USER.image,
        }
        setUser(userData)
        localStorage.setItem("tlu-hub-user", JSON.stringify(userData))
        setIsLoading(false)
        return true
      }
    }
    setIsLoading(false)
    console.error("❌ Login failed - no valid response")
    return false
  }

  const logout = () => {
    // Attempt to call server logout - ignore errors
    try {
      void api.logout()
    } catch {}
    setUser(null)
    localStorage.removeItem("tlu-hub-user")
    localStorage.removeItem("tlu-hub-token")
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
