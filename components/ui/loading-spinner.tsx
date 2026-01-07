import { cn } from "@/lib/utils"
import Image from "next/image"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  text?: string
}

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
    xl: "h-16 w-16 border-4",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className="relative">
        {/* Outer ring */}
        <div
          className={cn(
            "rounded-full border-gray-200 animate-spin",
            sizeClasses[size]
          )}
          style={{
            borderTopColor: "transparent",
            borderRightColor: "transparent",
            animation: "spin 1s linear infinite",
          }}
        />
        
        {/* Inner dot */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        >
          <div
            className={cn(
              "rounded-full bg-primary",
              size === "sm" && "h-1 w-1",
              size === "md" && "h-2 w-2",
              size === "lg" && "h-3 w-3",
              size === "xl" && "h-4 w-4"
            )}
          />
        </div>
      </div>
      
      {text && (
        <p
          className="text-sm font-medium text-muted-foreground animate-pulse"
          style={{
            animation: "fadeIn 0.5s ease-in, pulse 2s ease-in-out infinite",
          }}
        >
          {text}
        </p>
      )}
    </div>
  )
}

// Elegant page loading component
export function PageLoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="text-center space-y-6">
        {/* Animated logo container */}
        <div className="relative mx-auto w-24 h-24">
          <div
            className="absolute inset-0 rounded-full bg-primary/20 animate-ping"
            style={{
              animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
          <div className="relative flex items-center justify-center w-24 h-24">
            <Image
              src="/logo.png"
              alt="TLU Hub Logo"
              width={96}
              height={96}
              className="w-full h-full object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Đang tải...</h3>
          <p className="text-sm text-muted-foreground">Vui lòng đợi trong giây lát</p>
        </div>

        {/* Progress bar */}
        <div className="w-48 mx-auto h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            style={{
              animation: "progressBar 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  )
}

// Button loading spinner
export function ButtonLoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex items-center justify-center">
        <div
          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
          style={{
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
      <span>Đang xử lý...</span>
    </div>
  )
}
