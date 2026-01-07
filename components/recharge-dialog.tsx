"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CreditCard, Wallet, AlertCircle, CheckCircle2, Loader2, X } from "lucide-react"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface RechargeDialogProps {
  studentId: string
  onSuccess?: () => void
  onCancel?: () => void
}

const QUICK_AMOUNTS = [50000, 100000, 200000, 500000, 1000000]

export function RechargeDialog({ studentId, onSuccess, onCancel }: RechargeDialogProps) {
  const { toast } = useToast()
  const [amount, setAmount] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  /**
   * Recharge account - Nạp tiền và đợi check thủ công
   * API: POST /api/Student/RechargeAccount/{studentId}?amount=...
   */
  const handleRecharge = async () => {
    const amountNum = parseFloat(amount)
    
    if (!amountNum || amountNum <= 0) {
      toast({
        title: "Số tiền không hợp lệ",
        description: "Vui lòng nhập số tiền lớn hơn 0",
        variant: "destructive",
      })
      return
    }

    if (amountNum < 10000) {
      toast({
        title: "Số tiền quá nhỏ",
        description: "Số tiền nạp tối thiểu là 10,000 VNĐ",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      await api.rechargeAccount(studentId, amountNum)
      
      setSubmitted(true)
      toast({
        title: "Gửi yêu cầu nạp tiền thành công!",
        description: "Yêu cầu của bạn đang được xử lý. Vui lòng chờ xác nhận từ quản trị viên.",
      })
      
      // Sau 3 giây, gọi callback success
      setTimeout(() => {
        onSuccess?.()
      }, 3000)
    } catch (err: any) {
      console.error("Recharge failed:", err)
      toast({
        title: "Gửi yêu cầu thất bại",
        description: err.message || "Không thể gửi yêu cầu nạp tiền. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString())
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value)
  }

  if (submitted) {
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
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Đã gửi yêu cầu!</CardTitle>
          <CardDescription>
            Yêu cầu nạp tiền của bạn đang được xử lý
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900">
                  Thông tin nạp tiền
                </p>
                <p className="text-sm text-blue-700">
                  Số tiền: <strong>{formatCurrency(parseFloat(amount))}</strong>
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  Quản trị viên sẽ xác nhận giao dịch trong vòng 24h. 
                  Vui lòng kiểm tra email hoặc số dư tài khoản của bạn.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={onCancel}>
            Đóng
          </Button>
        </CardFooter>
      </Card>
    )
  }

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
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-primary" />
          Nạp tiền vào tài khoản
        </CardTitle>
        <CardDescription>
          Nhập số tiền bạn muốn nạp vào tài khoản TLU Hub
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount">Số tiền (VNĐ)</Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              placeholder="Nhập số tiền"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pr-12"
              min="10000"
              step="10000"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              VNĐ
            </div>
          </div>
          {amount && parseFloat(amount) > 0 && (
            <p className="text-sm text-muted-foreground">
              = {formatCurrency(parseFloat(amount))}
            </p>
          )}
        </div>

        {/* Quick Amount Buttons */}
        <div className="space-y-2">
          <Label>Chọn nhanh</Label>
          <div className="grid grid-cols-3 gap-2">
            {QUICK_AMOUNTS.map((quickAmount) => (
              <Button
                key={quickAmount}
                type="button"
                variant={amount === quickAmount.toString() ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickAmount(quickAmount)}
                className="text-xs"
              >
                {(quickAmount / 1000).toLocaleString()}k
              </Button>
            ))}
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="rounded-lg bg-muted p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CreditCard className="h-4 w-4" />
            Hướng dẫn thanh toán
          </div>
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>1. Chuyển khoản đến:</p>
            <div className="pl-4 space-y-1">
              <p>• Ngân hàng: <strong>Vietcombank</strong></p>
              <p>• Số TK: <strong>1234567890</strong></p>
              <p>• Chủ TK: <strong>TLU Hub</strong></p>
            </div>
            <p>2. Nội dung: <strong>NAPTIEN {studentId}</strong></p>
            <p>3. Sau khi chuyển khoản, nhấn "Xác nhận nạp tiền"</p>
            <p>4. Quản trị viên sẽ xác nhận trong 24h</p>
          </div>
        </div>

        {/* Warning */}
        <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <p className="text-xs text-yellow-800">
              Vui lòng chuyển khoản đúng nội dung để được xử lý tự động nhanh hơn.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Hủy
        </Button>
        <Button 
          onClick={handleRecharge} 
          disabled={loading || !amount || parseFloat(amount) < 10000}
          className="flex-1"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Đang xử lý...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Xác nhận nạp tiền
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
