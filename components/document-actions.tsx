"use client"

import { Button } from "./ui/button"
import { Download } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"

export default function DocumentActions({ documentId, price }: { documentId: string | number; price?: number | string }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handlePurchase = async () => {
    if (!user) {
      alert('Vui lòng đăng nhập để mua tài liệu')
      return
    }
    setLoading(true)
    try {
      const payload = {
        documentId,
        studentId: user.studentId ?? user.email, // Use studentId if available
      }
      const resp = await api.purchaseDocument(payload)
      // resp handling depends on backend - show success message or redirect to download link
      // eslint-disable-next-line no-console
      console.log('purchase response', resp)
      alert('Mua tài liệu thành công')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Purchase failed', err)
      alert('Mua thất bại. Vui lòng thử lại sau.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white mb-3 h-12" onClick={handlePurchase} disabled={loading}>
        <Download className="w-5 h-5 mr-2" />
        {loading ? 'Đang xử lý...' : 'Mua ngay'}
      </Button>
    </div>
  )
}
