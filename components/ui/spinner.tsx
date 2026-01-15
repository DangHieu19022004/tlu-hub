import { cn } from "@/lib/utils"
import Image from "next/image"

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "overlay" | "inline" | "logo"
  text?: string
  className?: string
  fullScreen?: boolean
}

export function Spinner({ 
  size = "md", 
  variant = "default",
  text,
  className,
  fullScreen = false
}: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
    xl: "h-16 w-16 border-4",
  }

  // Logo variant - dùng cho page loading
  if (variant === "logo") {
    const containerClass = fullScreen 
      ? "flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5"
      : "flex items-center justify-center py-12"

    return (
      <div className={cn(containerClass, className)}>
        <div className="text-center space-y-6">
          {/* Animated logo container */}
          <div className="relative mx-auto w-24 h-24">
            <div
              className="absolute inset-0 rounded-full bg-primary/20"
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
            <h3 className="text-xl font-semibold text-foreground">
              {text || "Đang tải..."}
            </h3>
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

  // Inline variant - dùng trong buttons
  if (variant === "inline") {
    return (
      <div
        className={cn("rounded-full border-white/30 border-t-white", sizeClasses[size])}
        style={{ animation: "spin 1s linear infinite" }}
      />
    )
  }

  // Overlay variant - dùng cho full screen với overlay
  if (variant === "overlay") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <div className="flex flex-col items-center gap-4">
            <div
              className={cn(
                "rounded-full border-gray-200 border-t-primary",
                sizeClasses[size]
              )}
              style={{ animation: "spin 1s linear infinite" }}
            />
            {text && (
              <p className="text-sm font-medium text-foreground">{text}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Default variant - spinner đơn giản
  const containerClass = fullScreen
    ? "flex min-h-screen items-center justify-center"
    : "flex items-center justify-center"

  return (
    <div className={cn(containerClass, className)}>
      <div className="flex flex-col items-center gap-3">
        <div
          className={cn(
            "rounded-full border-gray-200 border-t-primary",
            sizeClasses[size]
          )}
          style={{ animation: "spin 1s linear infinite" }}
        />
        {text && (
          <p
            className="text-sm font-medium text-muted-foreground"
            style={{ animation: "fadeIn 0.5s ease-in, pulse 2s ease-in-out infinite" }}
          >
            {text}
          </p>
        )}
      </div>
    </div>
  )
}

// Component đặc biệt cho loading trong button
export function ButtonSpinner({ className }: { className?: string }) {
  return (
    <Spinner 
      size="sm" 
      variant="inline"
      className={className}
    />
  )
}

// Component đặc biệt cho page loading
export function PageSpinner({ text }: { text?: string }) {
  return (
    <Spinner 
      variant="logo"
      text={text}
      fullScreen
    />
  )
}
