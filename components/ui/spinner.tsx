import { cn } from "@/lib/utils"

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
}

export function Spinner({ 
  size = "md", 
  text,
  className 
}: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  }

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        className={cn(
          "rounded-full border-muted border-t-primary",
          sizeClasses[size]
        )}
        style={{ animation: "spin 1s linear infinite" }}
      />
      {text && (
        <p className="text-sm font-medium text-muted-foreground">
          {text}
        </p>
      )}
    </div>
  )
}

// Spinner modal overlay cho API calls
export function SpinnerModal({ 
  isOpen, 
  text = "Đang xử lý..." 
}: { 
  isOpen: boolean
  text?: string 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background/95 rounded-lg p-6 shadow-xl border">
        <Spinner size="lg" text={text} />
      </div>
    </div>
  )
}

// Spinner inline cho buttons
export function ButtonSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-4 w-4 rounded-full border-2 border-white/30 border-t-white",
        className
      )}
      style={{ animation: "spin 1s linear infinite" }}
    />
  )
}

// Page loading spinner - fullscreen
export function PageSpinner({ text }: { text?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner size="lg" text={text || "Đang tải..."} />
    </div>
  )
}
