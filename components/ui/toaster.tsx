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

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        const variant = props.variant as string | undefined
        const isComingSoon = variant === 'coming-soon'
        const isDestructive = variant === 'destructive'
        return (
          <Toast key={id} duration={props.duration || 5000} {...props} className={isDestructive ? "border-l-4 border-red-500 bg-red-50 shadow-lg" : "border-l-4 border-l-pink-400 bg-gradient-to-r from-pink-50 to-white shadow-lg"}>
            <div className="grid gap-1">
              {title && <ToastTitle className="text-gray-800 font-semibold">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-gray-600">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
