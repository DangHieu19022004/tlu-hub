'use client'

import { toast } from "@/hooks/use-toast"

interface ComingSoonLinkProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function ComingSoonLink({
  children,
  title = "Coming soon !!!",
  description = "Tính năng này đang được phát triển"
}: ComingSoonLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    toast({
      title,
      description,
      variant: "coming-soon"
    })
  }

  return (
    <a 
      href="#" 
      onClick={handleClick}
      className="text-sm text-gray-600 hover:text-pink-500 font-medium transition-colors"
    >
      {children}
    </a>
  )
}
