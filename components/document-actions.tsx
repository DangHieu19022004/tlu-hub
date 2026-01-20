"use client"

import { Button } from "./ui/button"
import { Download, CheckCircle, Eye } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface DocumentActionsProps {
  documentId: string | number
  price?: number | string
  isPurchased?: boolean // Thêm prop để biết user đã mua chưa
  currentBalance?: number // Số dư hiện tại của user
}

export default function DocumentActions({ documentId, price, isPurchased = false, currentBalance = 0 }: DocumentActionsProps) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [purchased, setPurchased] = useState(isPurchased)
  const [viewingDoc, setViewingDoc] = useState(false)
  
  // Check if document is free (price = 0)
  const documentPrice = typeof price === 'string' ? parseFloat(price) : (price || 0)
  const isFreeDocument = documentPrice === 0

  /**
   * View purchased document - Xem tài liệu đã mua
   * API: GET /api/Document/access-link?studentId=...&documentId=...
   */
  const handleViewDocument = async () => {
    if (!user) {
      toast({
        title: "Vui lòng đăng nhập",
        description: "Bạn cần đăng nhập để xem tài liệu",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setViewingDoc(true)
    try {
      const studentId = user.studentId ?? user.email
      const response = await api.getDocumentAccessLink(studentId, String(documentId))
      
      // Backend trả về { accessLink: "..." }
      const link = (response as any).accessLink || response.data
      
      if (link) {
        // Mở link Google Drive trong tab mới
        window.open(link, "_blank")
        toast({
          title: "Đang mở tài liệu",
          description: "Tài liệu sẽ mở trong tab mới",
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
      setViewingDoc(false)
    }
  }

  /**
   * Purchase document - Mua tài liệu bằng coin
   * API: POST /api/Student/PurchaseDocument/{studentId}/{documentId}
   * Response: { success: boolean, message: string }
   */
  const handlePurchase = async () => {
    if (!user) {
      toast({
        title: "Vui lòng đăng nhập",
        description: "Bạn cần đăng nhập để mua tài liệu",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // Check balance trước khi mua
    const documentPrice = typeof price === 'string' ? parseFloat(price) : (price || 0)
    if (currentBalance < documentPrice) {
      toast({
        title: "Số dư không đủ",
        description: `Bạn cần ${documentPrice.toLocaleString("vi-VN")} đ để mua tài liệu này. Số dư hiện tại: ${currentBalance.toLocaleString("vi-VN")} đ. Vui lòng nạp thêm tiền.`,
        variant: "destructive",
      })
      return
    }
    
    setLoading(true)
    try {
      const studentId = user.studentId ?? user.email
      const response = await api.purchaseDocument(studentId, String(documentId))
      
      // Check response success
      if (response.success) {
        // Mua thành công - set purchased = true
        setPurchased(true)
        toast({
          title: "Mua tài liệu thành công!",
          description: response.message || "Bạn đã có thể xem tài liệu này.",
          variant: "default",
        })
        
        // Reload trang sau 1.5 giây để cập nhật trạng thái
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        throw new Error(response.message || "Mua tài liệu thất bại")
      }
    } catch (err: any) {
      console.error('Purchase failed', err)
      toast({
        title: "Mua thất bại",
        description: err.message || "Không thể mua tài liệu. Vui lòng kiểm tra số dư và thử lại.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Nếu tài liệu miễn phí hoặc đã mua
  if (isFreeDocument || purchased) {
    return (
      <div className="space-y-3">
        <Button 
          className="w-full bg-pink-500 hover:bg-primary text-white h-12 hover:cursor-pointer" 
          onClick={handleViewDocument}
          disabled={viewingDoc}
        >
          {viewingDoc ? (
            <>
              <Download className="w-5 h-5 mr-2 animate-pulse" />
              Đang mở...
            </>
          ) : (
            <>
              <Eye className="w-5 h-5 mr-2" />
              Xem tài liệu
            </>
          )}
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          {isFreeDocument ? "Tài liệu miễn phí" : "Bạn đã sở hữu tài liệu này"}
        </p>
      </div>
    )
  }

  // Chưa mua và không miễn phí - hiển thị button mua
  return (
    <div>
      <Button 
        className="w-full  bg-pink-500 hover:bg-primary text-white mb-3 h-12 hover:cursor-pointer" 
        onClick={handlePurchase} 
        disabled={loading}
      >
        <Download className="w-5 h-5 mr-2" />
        {loading ? 'Đang xử lý...' : 'Mua ngay'}
      </Button>
    </div>
  )
}
