"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import DocumentActions from "@/components/document-actions"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Spinner } from "@/components/ui/spinner"
import { 
  Download, 
  Share2, 
  Eye, 
  Calendar, 
  User, 
  Star, 
  Heart, 
  MessageSquare,
  FileText,
  Code,
  BarChart3,
  Building2,
  Tag,
  BookOpen,
  Clock,
  DollarSign,
  Shield,
  ChevronRight,
  Home
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import type { Document, DocumentType, AccessLevel } from "@/lib/types"
import { useAuth } from "@/lib/auth-context"

// Helper functions
const getDocumentTypeLabel = (type: DocumentType): { label: string; color: string } => {
  switch (type) {
    case 0: return { label: "Bài giảng", color: "bg-blue-100 text-blue-700 border-blue-200" }
    case 1: return { label: "Bài tập", color: "bg-green-100 text-green-700 border-green-200" }
    case 2: return { label: "Đề thi", color: "bg-red-100 text-red-700 border-red-200" }
    case 3: return { label: "Tài liệu tham khảo", color: "bg-purple-100 text-purple-700 border-purple-200" }
    default: return { label: "Khác", color: "bg-gray-100 text-gray-700 border-gray-200" }
  }
}

const getAccessLevelLabel = (level: AccessLevel): { label: string; icon: JSX.Element; color: string } => {
  switch (level) {
    case 0: return { 
      label: "Công khai", 
      icon: <Eye className="w-4 h-4" />, 
      color: "bg-green-100 text-green-700 border-green-200" 
    }
    case 1: return { 
      label: "Sinh viên", 
      icon: <User className="w-4 h-4" />, 
      color: "bg-blue-100 text-blue-700 border-blue-200" 
    }
    case 2: return { 
      label: "VIP", 
      icon: <Star className="w-4 h-4" />, 
      color: "bg-yellow-100 text-yellow-700 border-yellow-200" 
    }
    default: return { 
      label: "Không xác định", 
      icon: <Shield className="w-4 h-4" />, 
      color: "bg-gray-100 text-gray-700 border-gray-200" 
    }
  }
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

const formatDate = (dateString?: string): string => {
  if (!dateString) return "Không rõ"
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    })
  } catch {
    return dateString
  }
}

const formatPrice = (price?: number): string => {
  if (price === undefined || price === null) return "Miễn phí"
  if (price === 0) return "Miễn phí"
  return new Intl.NumberFormat("vi-VN", { 
    style: "currency", 
    currency: "VND" 
  }).format(price)
}

export default function DocumentDetailPage() {
  const params = useParams()
  const documentId = params.id as string
  const { user } = useAuth()
  
  const [document, setDocument] = useState<Document | null>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [relatedDocuments, setRelatedDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPurchased, setIsPurchased] = useState(false)
  const [userBalance, setUserBalance] = useState(0)

  useEffect(() => {
    async function loadDocument() {
      setLoading(true)
      setError(null)
      try {
        const docData = await api.getDocumentById(documentId)
        setDocument(docData)
        
        // Load related documents based on subject or tags
        try {
          const topDocs = await api.getTopDocuments()
          const docs = topDocs?.data || topDocs || []
          // Filter out current document and limit to 3
          const related = (Array.isArray(docs) ? docs : [])
            .filter((d: any) => d.documentID !== documentId)
            .slice(0, 3)
          setRelatedDocuments(related)
        } catch (relErr) {
          console.error("Failed to load related documents:", relErr)
          setRelatedDocuments([])
        }
        
        // TODO: Fetch reviews from API when available
        setReviews([])
        
        // Check if user has purchased this document and load balance
        if (user) {
          try {
            const studentId = user.studentId ?? user.email
            
            // Load balance
            try {
              const studentInfo = await api.getStudentInfo(studentId)
              setUserBalance(studentInfo.balance || 0)
            } catch (balanceErr) {
              console.error("Failed to load balance:", balanceErr)
              setUserBalance(0)
            }
            
            // Check purchase status
            const purchasedDocs = await api.getStudentDocuments(studentId)
            const documents = Array.isArray(purchasedDocs) ? purchasedDocs : (purchasedDocs.data || [])
            const hasPurchased = documents.some((doc: any) => (doc.documentID || doc.id) === documentId)
            setIsPurchased(hasPurchased)
          } catch (err) {
            console.error("Failed to check purchase status:", err)
            setIsPurchased(false)
          }
        }
      } catch (err: any) {
        console.error("Failed to load document:", err)
        setError(err?.message || "Không thể tải tài liệu")
        setDocument(null)
      } finally {
        setLoading(false)
      }
    }
    void loadDocument()
  }, [documentId, user])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Spinner size="lg" text="Đang tải tài liệu..." fullScreen />
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !document) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <FileText className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Không tìm thấy tài liệu</h2>
            <p className="text-muted-foreground mb-6">{error || "Tài liệu này có thể đã bị xóa hoặc không tồn tại."}</p>
            <Link href="/resources">
              <Button className="bg-primary hover:bg-accent">
                <Home className="w-4 h-4 mr-2" />
                Về trang tài liệu
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const typeInfo = getDocumentTypeLabel(document.type)
  const accessInfo = getAccessLevelLabel(document.accessLevel)
  const DocIcon = getDocumentIcon(document.type)
  const tags = document.tags ? document.tags.split(',').map(t => t.trim()).filter(t => t) : []

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-card">
          <div className="container mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/resources" className="hover:text-primary transition-colors">
                Tài liệu
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium line-clamp-1">{document.title}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-8">
          {/* Document Title & Quick Stats */}
          <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-2xl shadow-sm p-6 mb-8 border border-border">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={`${typeInfo.color} border font-semibold px-3 py-1`}>
                <DocIcon className="w-3.5 h-3.5 mr-1.5" />
                {typeInfo.label}
              </Badge>
              <Badge className={`${accessInfo.color} border font-semibold px-3 py-1 flex items-center gap-1.5`}>
                {accessInfo.icon}
                {accessInfo.label}
              </Badge>
              {document.subject && (
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 border font-semibold px-3 py-1">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                  {document.subject}
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-black text-foreground mb-4 leading-tight">
              {document.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(document.uploadDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{document.viewsCount?.toLocaleString() || 0} lượt xem</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Cập nhật gần đây</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Document Preview & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Document Preview Card */}
              <Card className="overflow-hidden shadow-lg border-border">
                <CardContent className="p-0">
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-xl">
                        <DocIcon className="w-12 h-12 text-primary" />
                      </div>
                      <p className="text-foreground text-lg font-semibold mb-1">Xem trước tài liệu</p>
                      <p className="text-muted-foreground text-sm">Mua tài liệu để xem toàn bộ nội dung</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags Section */}
              {tags.length > 0 && (
                <Card className="shadow-sm border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-primary" />
                      <h3 className="font-bold text-foreground">Từ khóa</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Link key={index} href={`/resources?search=${encodeURIComponent(tag)}`}>
                          <Badge 
                            variant="outline" 
                            className="px-3 py-1.5 hover:bg-primary/10 hover:border-primary transition-colors cursor-pointer"
                          >
                            #{tag}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tabs: Description, Details, Reviews */}
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                  <TabsTrigger
                    value="description"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 font-semibold"
                  >
                    Mô tả
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 font-semibold"
                  >
                    Chi tiết
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 font-semibold"
                  >
                    Đánh giá
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <Card className="shadow-sm border-border">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-4">Mô tả tài liệu</h3>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {document.description || "Chưa có mô tả chi tiết cho tài liệu này."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="details" className="mt-6">
                  <Card className="shadow-sm border-border">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-6">Thông tin chi tiết</h3>
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column - Basic Info */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            Thông tin cơ bản
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between py-2.5 border-b border-border">
                              <span className="text-muted-foreground">Loại tài liệu:</span>
                              <span className="font-semibold text-foreground">{typeInfo.label}</span>
                            </div>
                            <div className="flex justify-between py-2.5 border-b border-border">
                              <span className="text-muted-foreground">Quyền truy cập:</span>
                              <span className="font-semibold text-foreground">{accessInfo.label}</span>
                            </div>
                            {document.subject && (
                              <div className="flex justify-between py-2.5 border-b border-border">
                                <span className="text-muted-foreground">Môn học:</span>
                                <span className="font-semibold text-foreground">{document.subject}</span>
                              </div>
                            )}
                            <div className="flex justify-between py-2.5 border-b border-border">
                              <span className="text-muted-foreground">Ngày đăng:</span>
                              <span className="font-semibold text-foreground">{formatDate(document.uploadDate)}</span>
                            </div>
                            <div className="flex justify-between py-2.5">
                              <span className="text-muted-foreground">Định dạng:</span>
                              <span className="font-semibold text-foreground">PDF</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Statistics */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            Thống kê
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between py-2.5 border-b border-border">
                              <span className="text-muted-foreground">Lượt xem:</span>
                              <span className="font-semibold text-foreground">{document.viewsCount?.toLocaleString() || 0}</span>
                            </div>
                            <div className="flex justify-between py-2.5 border-b border-border">
                              <span className="text-muted-foreground">Giá:</span>
                              <span className="font-semibold text-primary">{formatPrice(document.price)}</span>
                            </div>
                            <div className="flex justify-between py-2.5 border-b border-border">
                              <span className="text-muted-foreground">Trạng thái:</span>
                              <Badge className="bg-green-100 text-green-700 border-green-200">
                                Đang hoạt động
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <Card className="shadow-sm border-border">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-6">Đánh giá từ người dùng</h3>
                      
                      {/* Rating Summary */}
                      <div className="mb-6 pb-6 border-b border-border">
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <span className="text-xl font-bold text-foreground ml-2">5.0 trên 5</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Chưa có đánh giá nào</p>
                      </div>

                      {/* Write Review Button */}
                      <Button className="w-full mb-6 bg-primary hover:bg-accent text-primary-foreground">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Viết đánh giá đầu tiên
                      </Button>

                      {/* Reviews List */}
                      {reviews.length === 0 ? (
                        <div className="text-center py-12 bg-muted/30 rounded-lg">
                          <Star className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-muted-foreground">Chưa có đánh giá nào cho tài liệu này</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {reviews.map((review) => (
                            <div key={review.id} className="pb-6 border-b border-border last:border-b-0">
                              <div className="flex items-start gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <User className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <h5 className="font-semibold text-foreground">{review.author}</h5>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < review.rating
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "fill-gray-200 text-gray-200"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                                  <p className="text-xs text-muted-foreground">{review.date}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Related Documents */}
              {relatedDocuments.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-primary" />
                    Tài liệu liên quan
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedDocuments.map((doc) => {
                      const relatedTypeInfo = getDocumentTypeLabel(doc.type)
                      const RelatedIcon = getDocumentIcon(doc.type)
                      
                      return (
                        <Link key={doc.documentID} href={`/documents/${doc.documentID}`}>
                          <Card className="group hover:shadow-xl transition-all duration-300 h-full border-border hover:border-primary/50">
                            <CardContent className="p-0">
                              <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                  <RelatedIcon className="w-16 h-16 text-primary/40" />
                                </div>
                                <Badge className={`absolute top-3 left-3 ${relatedTypeInfo.color} border font-semibold`}>
                                  {relatedTypeInfo.label}
                                </Badge>
                                {doc.price === 0 && (
                                  <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 text-white border-0">
                                    Miễn phí
                                  </Badge>
                                )}
                              </div>
                              <div className="p-4">
                                <h4 className="font-semibold text-sm text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                  {doc.title}
                                </h4>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    <span>{doc.viewsCount?.toLocaleString() || 0}</span>
                                  </div>
                                  <div className="font-semibold text-primary">
                                    {formatPrice(doc.price)}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Pricing & Actions */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 shadow-xl border-border overflow-hidden">
                <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 p-6 border-b border-border">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2 font-medium">Giá tài liệu</p>
                    <div className="text-4xl font-black text-primary mb-1">
                      {formatPrice(document.price)}
                    </div>
                    {document.price > 0 && (
                      <p className="text-xs text-muted-foreground">Đã bao gồm VAT</p>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-3">
                  <DocumentActions 
                    documentId={document.documentID} 
                    price={document.price}
                    isPurchased={isPurchased}
                    currentBalance={userBalance}
                  />

                  <Button
                    variant="outline"
                    className="w-full h-12 border-border hover:bg-muted hover:border-primary/50 transition-all group"
                  >
                    <Heart className="w-5 h-5 mr-2 group-hover:text-red-500 transition-colors" />
                    Thêm vào yêu thích
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full h-12 border-border hover:bg-muted hover:border-primary/50 transition-all group"
                  >
                    <Share2 className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
                    Chia sẻ
                  </Button>

                  <div className="border-t border-border pt-6 mt-6">
                    <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Thông tin tài liệu
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Loại:</span>
                        <Badge className={`${typeInfo.color} border text-xs`}>
                          {typeInfo.label}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Truy cập:</span>
                        <Badge className={`${accessInfo.color} border text-xs flex items-center gap-1`}>
                          {accessInfo.icon}
                          {accessInfo.label}
                        </Badge>
                      </div>
                      {document.subject && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Môn học:</span>
                          <span className="font-semibold text-foreground">{document.subject}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Ngày đăng:</span>
                        <span className="font-medium text-foreground text-xs">{formatDate(document.uploadDate)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Lượt xem:</span>
                        <span className="font-semibold text-foreground">{document.viewsCount?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border mt-6 pt-6">
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      Hỗ trợ khách hàng
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Cần hỗ trợ về tài liệu này? Đội ngũ của chúng tôi luôn sẵn sàng giúp đỡ bạn.
                    </p>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                        Liên hệ hỗ trợ →
                      </Button>
                    </Link>
                  </div>

                  {/* Additional Info */}
                  <div className="border-t border-border mt-6 pt-6">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h5 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        Cam kết chất lượng
                      </h5>
                      <ul className="text-xs text-muted-foreground space-y-1.5">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>Nội dung chính xác, cập nhật</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>Hỗ trợ tải xuống nhanh chóng</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>Bảo mật thông tin người dùng</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
