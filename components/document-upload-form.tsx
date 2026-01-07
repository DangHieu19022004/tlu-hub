"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Loader2 } from "lucide-react"
import { api } from "@/lib/api"
import { Document, DocumentType, AccessLevel } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface DocumentUploadFormProps {
  document?: Document
  onSuccess?: () => void
  onCancel?: () => void
}

export function DocumentUploadForm({ document, onSuccess, onCancel }: DocumentUploadFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: document?.title || "",
    description: document?.description || "",
    type: document?.type?.toString() || "0",
    price: document?.price?.toString() || "0",
    accessLevel: document?.accessLevel?.toString() || "0",
    storageLink: document?.storageLink || "",
    subject: document?.subject || "",
    tags: document?.tags || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tiêu đề tài liệu",
        variant: "destructive",
      })
      return
    }

    if (!formData.storageLink.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập link lưu trữ tài liệu",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const payload = {
        ...formData,
        type: parseInt(formData.type),
        price: parseFloat(formData.price),
        accessLevel: parseInt(formData.accessLevel),
      }

      if (document) {
        // Update existing document
        await api.updateDocument({
          ...payload,
          documentID: document.documentID,
          uploadDate: document.uploadDate,
          viewsCount: document.viewsCount,
        } as Document)
        
        toast({
          title: "Thành công",
          description: "Cập nhật tài liệu thành công",
        })
      } else {
        // Create new document
        await api.createDocument(payload)
        
        toast({
          title: "Thành công",
          description: "Tải lên tài liệu thành công",
        })
      }

      onSuccess?.()
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể tải lên tài liệu",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{document ? "Chỉnh Sửa Tài Liệu" : "Đăng Tải Tài Liệu Mới"}</CardTitle>
        <CardDescription>
          {document ? "Cập nhật thông tin tài liệu của bạn" : "Chia sẻ tài liệu học tập với cộng đồng TLU"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề *</Label>
            <Input
              id="title"
              placeholder="Ví dụ: Bài giảng OOP - Chapter 1"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              placeholder="Mô tả chi tiết về tài liệu..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={loading}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Loại tài liệu</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                disabled={loading}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Bài giảng</SelectItem>
                  <SelectItem value="1">Bài tập</SelectItem>
                  <SelectItem value="2">Đề thi</SelectItem>
                  <SelectItem value="3">Tài liệu tham khảo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessLevel">Quyền truy cập</Label>
              <Select
                value={formData.accessLevel}
                onValueChange={(value) => setFormData({ ...formData, accessLevel: value })}
                disabled={loading}
              >
                <SelectTrigger id="accessLevel">
                  <SelectValue placeholder="Chọn quyền" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Công khai</SelectItem>
                  <SelectItem value="1">Sinh viên</SelectItem>
                  <SelectItem value="2">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Môn học</Label>
              <Input
                id="subject"
                placeholder="Ví dụ: Lập trình hướng đối tượng"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Giá (VNĐ)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="storageLink">Link lưu trữ *</Label>
            <Input
              id="storageLink"
              placeholder="https://drive.google.com/... hoặc link khác"
              value={formData.storageLink}
              onChange={(e) => setFormData({ ...formData, storageLink: e.target.value })}
              disabled={loading}
              required
            />
            <p className="text-xs text-gray-500">
              Link Google Drive, Dropbox, OneDrive hoặc nền tảng lưu trữ khác
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="oop, java, programming (phân cách bằng dấu phẩy)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              disabled={loading}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {document ? "Cập Nhật" : "Đăng Tải"}
                </>
              )}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                Hủy
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
