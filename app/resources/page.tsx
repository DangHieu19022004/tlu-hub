"use client"

import { Suspense, useState, useCallback, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedDocuments } from "@/components/featured-documents"
import { AIChatbot } from "@/components/ai-chatbot"
import { DocumentListCard } from "@/components/document-list-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, FileText, Code, BarChart3, BookOpen, Building2, Eye, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { api } from "@/lib/api"
import type { Document, DocumentType } from "@/lib/types"
import Link from "next/link"
import { Spinner, ButtonSpinner } from "@/components/ui/spinner"
import { toast } from "@/hooks/use-toast"

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

export default function ResourcesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchKeyword, setSearchKeyword] = useState("")
  const [lastSearchKeyword, setLastSearchKeyword] = useState("")
  const [searchResults, setSearchResults] = useState<Document[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  
  // Pagination state for all documents
  const [allDocuments, setAllDocuments] = useState<Document[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(false)
  const pageSize = 10
  
  const handleComingSoon = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      toast({
        title: "Coming soon !!!",
        description: "Tính năng này đang được phát triển",
        variant: "coming-soon"
      })
    }

  // Load all documents with pagination
  const loadDocuments = useCallback(async (page: number) => {
    setIsLoadingDocuments(true)
    try {
      const response = await api.getAllDocuments(page, pageSize)
      setAllDocuments(response.documents)
      setCurrentPage(response.pageNumber)
      setTotalPages(response.totalPages)
      setTotalCount(response.totalCount)
    } catch (err) {
      console.error("Failed to load documents:", err)
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách tài liệu",
        variant: "destructive"
      })
    } finally {
      setIsLoadingDocuments(false)
    }
  }, [pageSize])

  // Load documents on mount
  useEffect(() => {
    loadDocuments(1)
  }, [loadDocuments])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      loadDocuments(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const performSearch = useCallback(async (keyword: string, updateUrl: boolean = true) => {
    if (!keyword.trim()) {
      setSearchResults([])
      setHasSearched(false)
      setLastSearchKeyword("")
      if (updateUrl) {
        router.push("/resources")
      }
      return
    }

    setIsSearching(true)
    setHasSearched(true)
    setLastSearchKeyword(keyword.trim())
    
    // Update URL with search query
    if (updateUrl) {
      router.push(`/resources?search=${encodeURIComponent(keyword.trim())}`, { scroll: false })
    }
    
    try {
      const response = await api.searchDocuments(keyword.trim(), 50)
      const docs = response?.data || response || []
      setSearchResults(Array.isArray(docs) ? docs : [])
    } catch (err) {
      console.error("Search failed:", err)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }, [router])
    
  // Auto search when query param exists
  useEffect(() => {
    const query = searchParams.get("search")
    if (query) {
      setSearchKeyword(query)
      performSearch(query, false) // Don't update URL since we're loading from URL
    }
  }, [searchParams, performSearch])

  const handleSearch = useCallback(async () => {
    performSearch(searchKeyword, true)
  }, [searchKeyword, performSearch])

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }, [handleSearch])

  return (
    <div className="flex min-h-screen flex-col bg-[#fef5f7]">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="w-full flex justify-center py-12 px-4 sm:px-10 border-b border-border bg-gradient-to-b from-white to-[#fff0f3]">
          <div className="w-full max-w-[1100px]">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                Tài Liệu <span className="text-primary">Học Tập</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Kho tàng tài liệu phong phú từ đề thi, giáo trình đến bài giảng chất lượng cao
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm theo tên tài liệu, môn học, từ khóa..."
                    className="pl-10 h-12 border-2 border-pink-400"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-accent cursor-pointer h-12"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <ButtonSpinner className="mr-2" />
                  ) : (
                    <Search className="h-5 w-5 mr-2" />
                  )}
                  Tìm kiếm
                </Button>
                <Button  
                  className="group rounded-xl border-1 border-primary bg-card p-3 h-12 transition-all hover:bg-primary hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
                  onClick={handleComingSoon}
                >
                  <Filter className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                </Button >
              </div>
            </div>
          </div>
        </section>

        {/* Search Results */}
        {hasSearched && (
          <section className="w-full flex justify-center py-8 px-4 sm:px-10">
            <div className="w-full max-w-[1100px]">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Kết quả tìm kiếm
                </h2>
                <p className="text-muted-foreground">
                  {isSearching 
                    ? "Đang tìm kiếm..." 
                    : `Tìm thấy ${searchResults.length} tài liệu cho "${lastSearchKeyword}"`
                  }
                </p>
              </div>


              {isSearching ? (
                <div className="flex items-center justify-center py-16">
                  <Spinner size="lg" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {searchResults.map((doc) => {
                    const typeInfo = getDocumentTypeLabel(doc.type)
                    const Icon = getDocumentIcon(doc.type)
                    
                    return (
                      <Link key={doc.documentID} href={`/documents/${doc.documentID}`}>
                        <Card className="group hover:shadow-xl hover:shadow-red-100/50 transition-all duration-300 cursor-pointer h-full border border-gray-100">
                          <CardContent className="p-3">
                            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-100 mb-3">
                              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 group-hover:scale-105 transition-transform duration-300">
                                <Icon className="w-16 h-16 text-primary/40 group-hover:text-primary/60 transition-colors" />
                              </div>
                              <Badge className={`absolute top-2 right-2 ${typeInfo.color} border text-xs font-semibold`}>
                                {typeInfo.label}
                              </Badge>
                            </div>
                            <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              {doc.title}
                            </h3>
                            {doc.subject && (
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                                {doc.subject}
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Eye className="w-3 h-3" />
                                <span>{doc.viewsCount?.toLocaleString() || 0}</span>
                              </div>
                              <span className="text-xs font-bold text-primary">
                                {formatPrice(doc.price)}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-100">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">Không tìm thấy tài liệu nào</p>
                  <p className="text-gray-400 text-sm">Thử tìm kiếm với từ khóa khác</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* All Documents List with Pagination */}
        {!hasSearched && (
          <section className="w-full flex justify-center py-8 px-4 sm:px-10">
            <div className="w-full max-w-[1100px]">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Tất cả tài liệu
                </h2>
              </div>

              {isLoadingDocuments ? (
                <div className="flex items-center justify-center py-16">
                  <Spinner size="lg" />
                </div>
              ) : allDocuments.length > 0 ? (
                <>
                  <div className="space-y-2 mb-8">
                    {allDocuments.map((doc) => (
                      <DocumentListCard key={doc.documentID} document={doc} />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || isLoadingDocuments}
                        className="h-9"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Trước
                      </Button>

                      <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, index) => {
                          const page = index + 1
                          // Show first page, last page, current page and adjacent pages
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePageChange(page)}
                                disabled={isLoadingDocuments}
                                className="h-9 min-w-[36px]"
                              >
                                {page}
                              </Button>
                            )
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <span key={page} className="px-2">
                                ...
                              </span>
                            )
                          }
                          return null
                        })}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || isLoadingDocuments}
                        className="h-9"
                      >
                        Sau
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-100">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">Chưa có tài liệu nào</p>
                  <p className="text-gray-400 text-sm">Vui lòng quay lại sau</p>
                </div>
              )}
            </div>
          </section>
        )}

        <Suspense fallback={<div className="py-16 text-center">Đang tải tài liệu...</div>}>
          <FeaturedDocuments />
        </Suspense>
      </main>
      <Footer />
      <AIChatbot />
    </div>
  )
}
