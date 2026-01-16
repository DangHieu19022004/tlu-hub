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
      className="text-sm text-foreground hover:text-primary font-medium transition-all duration-200 ease-in-out hover:scale-105 cursor-pointer"
    >
      {children}
    </a>
  )
}
