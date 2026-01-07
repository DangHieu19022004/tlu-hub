"use client"

import Link from "next/link"
import { Eye, ArrowRight, FileText, Code, BarChart3, Building, Eye2 } from "lucide-react"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import type { Document } from "@/lib/types"

export function FeaturedDocuments() {
  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedDocuments() {
      setLoading(true)
      try {
        const response = await api.getTopDocuments()
        const docs = response?.data || response || []
        setDocuments(Array.isArray(docs) ? docs.slice(0, 4) : [])
      } catch (err) {
        console.error("Failed to load featured documents:", err)
        setDocuments([])
      } finally {
        setLoading(false)
      }
    }
    void loadFeaturedDocuments()
  }, [])

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

  if (documents.length === 0) {
    return (
      <section className="w-full flex justify-center pb-8 px-4 sm:px-10">
        <div className="w-full max-w-[1100px]">
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Chưa có tài liệu nổi bật</p>
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
            className="text-primary font-bold text-sm flex items-center gap-1 hover:text-accent transition-colors bg-primary/10 px-4 py-2 rounded-full"
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
            {documents.map((doc: any) => {
              const getIcon = () => {
                switch (doc.type) {
                  case 0: return FileText
                  case 1: return Code
                  case 2: return BarChart3
                  default: return Building2
                }
              }
              const Icon = getIcon()
              
              return (
                <Link key={doc.documentID || doc.id} href={`/documents/${doc.documentID || doc.id}`}>
                  <div className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-md hover:shadow-xl hover:shadow-red-100/50 transition-all cursor-pointer">
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-16 h-16 text-primary/40 group-hover:text-primary/60 transition-colors" />
                      </div>
                      <div className="absolute top-3 right-3 bg-white backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-black shadow-sm text-red-500 border border-red-100">
                        PDF
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 px-2 pt-1">
                      <h3 className="text-foreground text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors font-sans">
                        {doc.title}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium">
                        {doc.subject || 'Tài liệu học tập'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto px-2 pb-2 pt-3 border-t border-dashed border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white">
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                        </div>
                        <span className="text-xs font-bold text-gray-600 truncate max-w-[80px]">
                          {doc.uploaderName || doc.uploader || doc.author || 'Sinh viên TLU'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs font-medium bg-gray-50 px-2 py-1 rounded-md">
                        <Eye className="w-4 h-4" />
                        <span>{doc.viewsCount || 0}</span>
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
