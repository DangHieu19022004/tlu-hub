"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  BookOpen,
  Loader2
} from "lucide-react"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Spinner, ButtonSpinner } from "@/components/ui/spinner"

interface PurchasedDocument {
  id: string
  title: string
  description?: string
  date: string
  price: number
  subject?: string
  type: number
  accessLevel: number
  viewsCount: number
  storageLink: string
}

interface PurchasedDocumentsListProps {
  documents: PurchasedDocument[]
  studentId: string
  loading?: boolean
}

export function PurchasedDocumentsList({ documents, studentId, loading = false }: PurchasedDocumentsListProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  /**
   * Get document access link - Check quyền truy cập rồi trả về link drive
   * API: GET /api/Document/access-link?studentId=...&documentId=...
   * Response: { accessLink: "https://drive.google.com/..." }
   */
  const handleViewDocument = async (documentId: string) => {
    setDownloadingId(documentId)
    try {
      const response = await api.getDocumentAccessLink(studentId, documentId)
      
      // Backend trả về { accessLink: "..." } hoặc { data: "..." }
      const link = (response as any).accessLink || response.data
      
      if (link) {
        // Mở link Google Drive trong tab mới
        window.open(link, "_blank")
        toast({
          title: "Thành công",
          description: "Đang mở tài liệu...",
        })
      } else {
        throw new Error("Không nhận được link tài liệu")
      }
    } catch (error: any) {
      console.error("Failed to get document access link:", error)
      toast({
        title: "Lỗi",
        description: error.message || "Không thể mở tài liệu. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setDownloadingId(null)
    }
  }

  if (loading) {
    return <Spinner size="lg" text="Đang tải tài liệu..." className="py-8" />
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-8">
        <BookOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
        <p className="text-muted-foreground mb-4">Bạn chưa mua tài liệu nào</p>
        <Button variant="outline" onClick={() => router.push("/resources")}>
          Khám phá tài liệu
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            {/* Left side - Icon and Info */}
            <div className="flex gap-3 flex-1 min-w-0">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 
                  className="font-semibold text-base mb-1 truncate hover:text-primary cursor-pointer"
                  onClick={() => router.push(`/documents/${doc.id}`)}
                >
                  {doc.title}
                </h4>
                {doc.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {doc.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  {doc.subject && (
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {doc.subject}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {doc.date}
                  </span>
                  {doc.viewsCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {doc.viewsCount} lượt xem
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right side - Price and Actions */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <Badge variant="outline" className="text-primary font-semibold">
                {doc.price.toLocaleString("vi-VN")} đ
              </Badge>
              <Button 
                size="sm" 
                className="w-full min-w-[120px] bg-primary hover:bg-primary/90"
                onClick={() => handleViewDocument(doc.id)}
                disabled={downloadingId === doc.id}
              >
                {downloadingId === doc.id ? (
                  <>
                    <ButtonSpinner className="mr-1" />
                    Đang mở...
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-1" />
                    Xem tài liệu
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
