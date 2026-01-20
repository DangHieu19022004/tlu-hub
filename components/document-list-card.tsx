import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Code, BarChart3, BookOpen, Building2, Eye } from "lucide-react"
import type { Document, DocumentType } from "@/lib/types"

interface DocumentListCardProps {
  document: Document
}

const getDocumentIcon = (type: DocumentType) => {
  switch (type) {
    case 0: return FileText
    case 1: return Code
    case 2: return BarChart3
    case 3: return BookOpen
    default: return Building2
  }
}

const formatPrice = (price?: number): string => {
  if (price === undefined || price === null || price === 0) return "Miễn phí"
  return new Intl.NumberFormat("vi-VN", { 
    style: "currency", 
    currency: "VND" 
  }).format(price)
}

export function DocumentListCard({ document }: DocumentListCardProps) {
  const Icon = getDocumentIcon(document.type)

  return (
    <Link href={`/documents/${document.documentID}`} className="block">
      <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer border border-gray-200 bg-white">
        <CardContent className="px-8 py-2">
          <div className="flex items-center justify-between gap-6">
            {/* Left: Title & Description */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base line-clamp-1 group-hover:text-primary transition-colors mb-1.5">
                {document.title}
              </h3>
              {document.description && (
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {document.description}
                </p>
              )}
            </div>
            
            {/* Right: Meta Info & Price */}
            <div className="flex flex-col items-end justify-center gap-1 flex-shrink-0">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {document.subject && (
                  <span>
                    <span className="font-semibold text-foreground"></span> {document.subject}
                  </span>
                )}
              </div>
              <span className="text-base font-bold text-primary">
                {formatPrice(document.price)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
