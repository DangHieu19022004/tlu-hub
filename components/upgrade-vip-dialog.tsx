"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Check, Loader2, Sparkles, AlertCircle, X } from "lucide-react"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface UpgradeVIPDialogProps {
  studentId: string
  currentBalance: number
  isVIP?: boolean
  vipEndDate?: string | null
  onSuccess?: () => void
  onCancel?: () => void
}

const VIP_PRICE = 199000 // 199,000 VNĐ
const VIP_DURATION_DAYS = 365

const VIP_BENEFITS = [
  "Truy cập không giới hạn tất cả tài liệu VIP",
  "Ưu tiên hỗ trợ 24/7",
  "Tải xuống không giới hạn",
  "Không có quảng cáo",
  "Truy cập sớm tài liệu mới",
  "Badge VIP đặc biệt",
]

export function UpgradeVIPDialog({
  studentId,
  currentBalance,
  isVIP = false,
  vipEndDate = null,
  onSuccess,
  onCancel,
}: UpgradeVIPDialogProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [upgraded, setUpgraded] = useState(false)

  const hasEnoughBalance = currentBalance >= VIP_PRICE

  /**
   * Upgrade to VIP - Nâng cấp VIP bằng coin của hệ thống
   * API: PUT /api/Student/UpgradeToVIP/{studentId}
   */
  const handleUpgrade = async () => {
    if (!hasEnoughBalance) {
      toast({
        title: "Số dư không đủ",
        description: `Bạn cần ${VIP_PRICE.toLocaleString("vi-VN")} đ để nâng cấp VIP. Hãy nạp thêm tiền vào tài khoản.`,
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      await api.upgradeToVIP(studentId)

      setUpgraded(true)
      toast({
        title: "Nâng cấp VIP thành công!",
        description: `Bạn đã trở thành thành viên VIP trong ${VIP_DURATION_DAYS} ngày.`,
      })

      // Sau 2 giây, gọi callback success
      setTimeout(() => {
        onSuccess?.()
      }, 2000)
    } catch (err: any) {
      console.error("Upgrade to VIP failed:", err)
      toast({
        title: "Nâng cấp thất bại",
        description: err.message || "Không thể nâng cấp VIP. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // If already VIP
  if (isVIP && !upgraded) {
    return (
      <Card className="w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full"
          onClick={onCancel}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <Crown className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl">Bạn đã là VIP!</CardTitle>
          <CardDescription>
            {vipEndDate
              ? `Thành viên VIP đến ${formatDate(vipEndDate)}`
              : "Bạn đang sử dụng gói VIP"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 p-4">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-600" />
              Quyền lợi VIP của bạn
            </h4>
            <ul className="space-y-2">
              {VIP_BENEFITS.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline" onClick={onCancel}>
            Đóng
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Success screen
  if (upgraded) {
    return (
      <Card className="w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full"
          onClick={onCancel}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center animate-bounce">
            <Crown className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Chúc mừng bạn!
          </CardTitle>
          <CardDescription>
            Bạn đã trở thành thành viên VIP
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Thời hạn VIP:</span>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                {VIP_DURATION_DAYS} ngày
              </Badge>
            </div>
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-600" />
              Quyền lợi của bạn
            </h4>
            <ul className="space-y-2">
              {VIP_BENEFITS.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600" 
            onClick={onSuccess}
          >
            Bắt đầu trải nghiệm VIP
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Upgrade screen
  return (
    <Card className="w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 rounded-full z-10"
        onClick={onCancel}
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
          <Crown className="h-10 w-10 text-white" />
        </div>
        <CardTitle className="text-2xl">Nâng cấp VIP</CardTitle>
        <CardDescription>
          Trải nghiệm đầy đủ tính năng cao cấp của TLU Hub
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Card */}
        <div className="rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 p-6 text-center">
          <div className="text-3xl font-bold text-yellow-900 mb-1">
            {formatCurrency(VIP_PRICE)}
          </div>
          <div className="text-sm text-yellow-700">
            {VIP_DURATION_DAYS} ngày sử dụng
          </div>
        </div>

        {/* Balance Check */}
        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Số dư hiện tại:</span>
            <span className="font-semibold">{formatCurrency(currentBalance)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Giá VIP:</span>
            <span className="font-semibold">-{formatCurrency(VIP_PRICE)}</span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Số dư sau nâng cấp:</span>
            <span className={`font-bold ${hasEnoughBalance ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(Math.max(0, currentBalance - VIP_PRICE))}
            </span>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-600" />
            Quyền lợi VIP
          </h4>
          <ul className="space-y-2">
            {VIP_BENEFITS.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Warning if insufficient balance */}
        {!hasEnoughBalance && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-red-900">Số dư không đủ</p>
                <p className="text-xs text-red-700">
                  Bạn cần nạp thêm {formatCurrency(VIP_PRICE - currentBalance)} để nâng cấp VIP.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Hủy
        </Button>
        <Button
          onClick={handleUpgrade}
          disabled={loading || !hasEnoughBalance}
          className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Đang xử lý...
            </>
          ) : (
            <>
              <Crown className="h-4 w-4 mr-2" />
              Nâng cấp ngay
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
