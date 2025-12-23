"use client"

import Link from "next/link"
import { Download, ArrowRight, FileText, Code, BarChart3, Building2 } from "lucide-react"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"

// FAKE DATA - Keep as fallback with new design
const MOCK_DOCUMENTS = [
  {
    id: 1,
    title: "Đề thi Giải tích 1 - K62",
    department: "Khoa Công Trình",
    downloads: 342,
    type: "PDF",
    icon: FileText,
    colorClass: "text-primary/40 group-hover:text-primary/60",
    bgClass: "from-red-50 to-pink-100"
  },
  {
    id: 2,
    title: "Bài giảng Lập trình C++",
    department: "Khoa CNTT",
    downloads: 856,
    type: "DOCX",
    icon: Code,
    colorClass: "text-secondary/40 group-hover:text-secondary/60",
    bgClass: "from-blue-50 to-cyan-100"
  },
  {
    id: 3,
    title: "Giáo trình Kinh tế vi mô",
    department: "Khoa Kinh Tế",
    downloads: 120,
    type: "PDF",
    icon: BarChart3,
    colorClass: "text-orange-500/40 group-hover:text-orange-500/60",
    bgClass: "from-orange-50 to-amber-100"
  },
  {
    id: 4,
    title: "Sức bền vật liệu 2",
    department: "Khoa Cơ Khí",
    downloads: 561,
    type: "PDF",
    icon: Building2,
    colorClass: "text-purple-500/40 group-hover:text-purple-500/60",
    bgClass: "from-purple-50 to-fuchsia-100"
  },
]

export function FeaturedDocuments() {
  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedDocuments() {
      setLoading(true)
      try {
        const docs = await api.searchDocuments("")
        if (docs && Array.isArray(docs)) {
          setDocuments(docs.slice(0, 4))
        } else if (docs && docs.results) {
          setDocuments(docs.results.slice(0, 4))
        } else {
          setDocuments(MOCK_DOCUMENTS)
        }
      } catch (err) {
        console.warn("Failed to load featured documents, using fallback", err)
        setDocuments(MOCK_DOCUMENTS)
      } finally {
        setLoading(false)
      }
    }
    void loadFeaturedDocuments()
  }, [])

  const displayDocs = documents.length > 0 ? documents : MOCK_DOCUMENTS

  if (loading) {
    return (
      <section className="w-full flex justify-center pb-8 px-4 sm:px-10">
        <div className="w-full max-w-[1100px]">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <div className="w-full flex justify-center pt-12 px-4 sm:px-10">
        <div className="w-full max-w-[1100px] flex items-end justify-between px-4 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-foreground text-3xl font-black leading-tight tracking-[-0.015em] mb-1">
              Tài liệu nổi bật <span className="text-primary">🔥</span>
            </h2>
            <p className="text-gray-500 font-medium">
              Những tài liệu được quan tâm nhất tuần qua
            </p>
          </div>
          <Link
            className="text-secondary font-bold text-sm flex items-center gap-1 hover:text-blue-600 transition-colors bg-blue-50 px-4 py-2 rounded-full"
            href="/resources"
          >
            Xem tất cả
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      <div className="w-full flex justify-center pb-8 px-4 sm:px-10">
        <div className="w-full max-w-[1100px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {displayDocs.map((doc: any, idx: number) => {
              const mockDoc = MOCK_DOCUMENTS[idx % MOCK_DOCUMENTS.length]
              const Icon = mockDoc.icon
              
              return (
                <Link key={doc.id} href={`/documents/${doc.id}`}>
                  <div className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-md hover:shadow-xl hover:shadow-red-100/50 transition-all cursor-pointer">
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                      <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${mockDoc.bgClass} group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className={`w-16 h-16 ${mockDoc.colorClass} transition-colors`} />
                      </div>
                      <div className="absolute top-3 right-3 bg-white backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-black shadow-sm text-red-500 border border-red-100">
                        {mockDoc.type}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 px-2 pt-1">
                      <h3 className="text-foreground text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                        {doc.title || mockDoc.title}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium">
                        {mockDoc.department}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto px-2 pb-2 pt-3 border-t border-dashed border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white">
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                        </div>
                        <span className="text-xs font-bold text-gray-600 truncate max-w-[80px]">
                          Sinh viên TLU
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs font-medium bg-gray-50 px-2 py-1 rounded-md">
                        <Download className="w-4 h-4" />
                        <span>{mockDoc.downloads}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
