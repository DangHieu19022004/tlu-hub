"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { api } from "./api"
import type { LoginResponse } from "./types"

interface User {
  studentId: string
  email: string
  name: string
  image: string
  isVIP: boolean
  balance: number
}

interface AuthContextType {
  user: User | null
  login: (studentId: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
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
      }

      setUser(userData)
      localStorage.setItem("tlu-hub-user", JSON.stringify(userData))

      // Save token
      if (response.token) {
        localStorage.setItem("tlu-hub-token", response.token)
      }

      setIsLoading(false)
      return true
    } catch (error: any) {
      console.error("Login failed:", error)
      
      // Fallback to demo user for development
      if (
        process.env.NODE_ENV === "development" &&
        studentId === DEMO_USER.studentId &&
        password === DEMO_USER.password
      ) {
        const userData: User = {
          studentId: DEMO_USER.studentId,
          email: DEMO_USER.email,
          name: DEMO_USER.name,
          image: DEMO_USER.image,
          isVIP: false,
          balance: 0,
        }
        setUser(userData)
        localStorage.setItem("tlu-hub-user", JSON.stringify(userData))
        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return false
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      if (user?.studentId) {
        await api.logout(user.studentId)
      }
    } catch (error) {
      console.error("Logout API call failed:", error)
    } finally {
      setUser(null)
      localStorage.removeItem("tlu-hub-user")
      localStorage.removeItem("tlu-hub-token")
      setIsLoading(false)
    }
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
