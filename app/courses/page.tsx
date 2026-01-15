"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIChatbot } from "@/components/ai-chatbot"
import { DocumentUploadForm } from "@/components/document-upload-form"
import { MyDocumentsList } from "@/components/my-documents-list"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, FileText, Upload } from "lucide-react"
import { api } from "@/lib/api"
import { Document } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { Spinner } from "@/components/ui/spinner"

export default function MyDocumentsPage() {
  const { toast } = useToast()
  const { user, isLoading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<"list" | "upload">("list")
  const [myDocuments, setMyDocuments] = useState<Document[]>([])
  const [editingDocument, setEditingDocument] = useState<Document | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) {
      return
    }
    
    if (!user) {
      setLoading(false)
      return
    }
    
    loadMyDocuments(user.studentId)
  }, [user, authLoading])

  const loadMyDocuments = async (studentId: string) => {
    setLoading(true)
    try {
      const response = await api.getStudentDocuments(studentId)
      if (response.data) {
        setMyDocuments(response.data)
      }
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể tải danh sách tài liệu",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUploadSuccess = () => {
    setActiveTab("list")
    setEditingDocument(undefined)
    
    if (user?.studentId) {
      loadMyDocuments(user.studentId)
    }
  }

  const handleEdit = (document: Document) => {
    setEditingDocument(document)
    setActiveTab("upload")
  }

  const handleDelete = (documentId: string) => {
    setMyDocuments((prev) => prev.filter((doc) => doc.documentID !== documentId))
  }

  const handleCancelEdit = () => {
    setEditingDocument(undefined)
    setActiveTab("list")
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#fef5f7]">
        <Header />
        <main className="flex-1">
          <Spinner size="lg" text="Đang tải..." fullScreen />
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col bg-[#fef5f7]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <FileText className="h-16 w-16 text-gray-300 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-700">Vui lòng đăng nhập</h2>
            <p className="text-gray-500">
              Bạn cần đăng nhập để quản lý tài liệu của mình
            </p>
            <Button onClick={() => window.location.href = "/login"}>
              Đăng nhập ngay
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fef5f7]">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="w-full flex justify-center py-12 px-4 sm:px-10 border-b border-border bg-gradient-to-b from-white to-[#fff0f3]">
          <div className="w-full max-w-[1100px]">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                Quản Lý <span className="text-primary">Tài Liệu</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Đăng tải, chỉnh sửa và chia sẻ tài liệu học tập của bạn với cộng đồng TLU
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full flex justify-center py-12 px-4 sm:px-10">
          <div className="w-full max-w-[1100px]">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "list" | "upload")}>
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="list" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Tài liệu của tôi
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    {editingDocument ? "Chỉnh sửa" : "Đăng tải mới"}
                  </TabsTrigger>
                </TabsList>

                {activeTab === "list" && (
                  <Button onClick={() => {
                    setEditingDocument(undefined)
                    setActiveTab("upload")
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Đăng tải tài liệu
                  </Button>
                )}
              </div>

              <TabsContent value="list" className="mt-0">
                {loading ? (
                  <Spinner size="md" text="Đang tải tài liệu..." className="py-12" />
                ) : (
                  <MyDocumentsList
                    documents={myDocuments}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </TabsContent>

              <TabsContent value="upload" className="mt-0">
                <DocumentUploadForm
                  document={editingDocument}
                  onSuccess={handleUploadSuccess}
                  onCancel={handleCancelEdit}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatbot />
    </div>
  )
}

