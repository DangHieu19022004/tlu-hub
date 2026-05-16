"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ExternalLink, Maximize, FileText } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { api } from "@/lib/api"
import type { Document } from "@/lib/types"

export default function DocumentFullViewer() {
  const params = useParams()
  const documentId = params.id as string
  
  const [document, setDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [iframeLoading, setIframeLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (!window.document.fullscreenElement) {
        iframeRef.current.requestFullscreen().catch(err => {
          console.error("Lỗi khi mở toàn màn hình:", err)
        })
      } else {
        window.document.exitFullscreen()
      }
    }
  }

  useEffect(() => {
    async function loadDocument() {
      setLoading(true)
      setError(null)
      try {
        const docData = await api.getDocumentById(documentId)
        setDocument(docData)
      } catch (err: any) {
        console.error("Failed to load document:", err)
        setError(err?.message || "Không thể tải tài liệu")
        setDocument(null)
      } finally {
        setLoading(false)
      }
    }
    if (documentId) {
      void loadDocument()
    }
  }, [documentId])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background items-center justify-center">
        <Spinner size="lg" text="Đang tải tài liệu..." />
      </div>
    )
  }

  if (error || !document) {
    return (
      <div className="flex min-h-screen flex-col bg-background items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <FileText className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Không tìm thấy tài liệu</h2>
          <p className="text-muted-foreground mb-6">{error || "Tài liệu này có thể đã bị xóa hoặc không tồn tại."}</p>
          <Link href="/resources">
            <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
              Về trang tài liệu
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-white border-b border-slate-200 px-4 h-12 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="text-sm font-medium text-slate-700 whitespace-nowrap">Xem tài liệu:</span>
          <span className="text-sm font-bold text-slate-900 truncate">{document.title}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {document.storageLink && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-slate-100"
              onClick={() => window.open(document.storageLink, '_blank')}
              title="Mở trong tab mới"
            >
              <ExternalLink className="h-4 w-4 md:h-5 md:w-5 text-slate-600" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-slate-100"
            onClick={handleFullscreen}
            title="Toàn màn hình"
          >
            <Maximize className="h-4 w-4 md:h-5 md:w-5 text-slate-600" />
          </Button>
        </div>
      </div>
      
      {/* Full Iframe Viewer */}
      <div className="flex-1 relative bg-slate-100">
        {document.storageLink ? (
          <>
            {iframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
                  <p className="text-sm text-slate-500">Đang tải tài liệu...</p>
                </div>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={document.storageLink}
              className="w-full h-full border-none bg-slate-100"
              allow="autoplay"
              onLoad={() => setIframeLoading(false)}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                <FileText className="w-12 h-12 text-slate-400" />
              </div>
              <p className="text-slate-500">Tài liệu không có sẵn</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
