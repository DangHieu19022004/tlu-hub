'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react'

export function Toaster() {
  const { toasts } = useToast()

  const getIcon = (variant?: string | null) => {
    switch (variant) {
      case 'destructive':
        return <XCircle className="h-5 w-5" />
      case 'success':
        return <CheckCircle2 className="h-5 w-5" />
      case 'warning':
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getVariantStyles = (variant?: string | null) => {
    switch (variant) {
      case 'destructive':
        return 'bg-red-50 border-red-200 text-red-900'
      case 'success':
        return 'bg-green-50 border-green-200 text-green-900'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900'
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900'
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className={`
              ${getVariantStyles(props.variant)}
              border-2 shadow-2xl
              backdrop-blur-sm
              transition-all duration-300 ease-in-out
              hover:scale-105 hover:shadow-xl
              animate-in slide-in-from-top-5 fade-in-0
              data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-full
            `}
            style={{
              animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="flex items-start gap-3 w-full">
              <div className="shrink-0 mt-0.5">
                {getIcon(props.variant)}
              </div>
              <div className="flex-1 space-y-1">
                {title && <ToastTitle className="font-bold text-base">{title}</ToastTitle>}
                {description && (
                  <ToastDescription className="text-sm opacity-90">
                    {description}
                  </ToastDescription>
                )}
              </div>
              {action}
            </div>
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
