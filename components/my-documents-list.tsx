"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Document, DocumentType, AccessLevel } from "@/lib/types"
import { Edit, Trash2, Download, Eye, Calendar, DollarSign } from "lucide-react"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"

interface MyDocumentsListProps {
  documents: Document[]
  onEdit?: (document: Document) => void
  onDelete?: (documentId: string) => void
}

const documentTypeLabels = {
  [DocumentType.Lecture]: "Bài giảng",
  [DocumentType.Exercise]: "Bài tập",
  [DocumentType.Exam]: "Đề thi",
  [DocumentType.Reference]: "Tham khảo",
}

const accessLevelLabels = {
  [AccessLevel.Public]: "Công khai",
  [AccessLevel.Student]: "Sinh viên",
  [AccessLevel.VIP]: "VIP",
}

const accessLevelColors = {
  [AccessLevel.Public]: "bg-green-100 text-green-800",
  [AccessLevel.Student]: "bg-blue-100 text-blue-800",
  [AccessLevel.VIP]: "bg-purple-100 text-purple-800",
}

export function MyDocumentsList({ documents, onEdit, onDelete }: MyDocumentsListProps) {
  const { toast } = useToast()
  const { user } = useAuth()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  const handleDelete = async (documentId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa tài liệu này?")) {
      return
    }

    setDeletingId(documentId)
    try {
      await api.deleteDocument(documentId)
      toast({
        title: "Thành công",
        description: "Đã xóa tài liệu",
      })
      onDelete?.(documentId)
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể xóa tài liệu",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  const handleGetAccessLink = async (documentId: string, studentId: string) => {
    setDownloadingId(documentId)
    try {
      const response = await api.getDocumentAccessLink(studentId, documentId)
      if (response.data) {
        window.open(response.data, "_blank")
        toast({
          title: "Thành công",
          description: "Đang mở link tải xuống",
        })
      }
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể lấy link tải xuống",
        variant: "destructive",
      })
    } finally {
      setDownloadingId(null)
    }
  }

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-gray-500">Bạn chưa có tài liệu nào</p>
          <p className="text-sm text-gray-400 mt-2">Hãy đăng tải tài liệu đầu tiên của bạn!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {documents.map((doc) => (
        <Card key={doc.documentID} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <CardTitle className="text-lg">{doc.title}</CardTitle>
                <CardDescription className="mt-2">
                  {doc.description || "Không có mô tả"}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">{documentTypeLabels[doc.type]}</Badge>
                <Badge className={accessLevelColors[doc.accessLevel]}>
                  {accessLevelLabels[doc.accessLevel]}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {doc.subject && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">📚 Môn:</span>
                  <span className="font-medium">{doc.subject}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="font-medium">
                  {doc.price === 0 ? "Miễn phí" : `${doc.price.toLocaleString()} VNĐ`}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-gray-500" />
                <span>{doc.viewsCount || 0} lượt xem</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{new Date(doc.uploadDate).toLocaleDateString("vi-VN")}</span>
              </div>
            </div>
            
            {doc.tags && (
              <div className="mt-4 flex flex-wrap gap-2">
                {doc.tags.split(",").map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(doc)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Sửa
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(doc.documentID)}
              disabled={deletingId === doc.documentID}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {deletingId === doc.documentID ? "Đang xóa..." : "Xóa"}
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                if (!user?.studentId) {
                  toast({
                    title: "Lỗi",
                    description: "Vui lòng đăng nhập để tải tài liệu",
                    variant: "destructive",
                  })
                  return
                }
                
                handleGetAccessLink(doc.documentID, user.studentId)
              }}
              disabled={downloadingId === doc.documentID}
            >
              <Download className="h-4 w-4 mr-1" />
              {downloadingId === doc.documentID ? "Đang tải..." : "Tải xuống"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
