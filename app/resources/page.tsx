"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { api } from "@/lib/api"

// FAKE DATA - Keep as fallback
const MOCK_RESOURCES = [
  {
    id: 1,
    title: "Slide Bài Giảng - Lập Trình Hướng Đối Tượng",
    description: "Tài liệu slide đầy đủ cho môn OOP, bao gồm lý thuyết và ví dụ",
    type: "Slide",
    subject: "Lập Trình",
    downloads: 1234,
    views: 5678,
    isFree: true,
    date: "15-11-2024",
    thumbnail: "/doc-tourism-thesis.jpg",
  },
  {
    id: 2,
    title: "Đề Cương Môn Cấu Trúc Dữ Liệu",
    description: "Đề cương chi tiết, nội dung ôn tập và câu hỏi thường gặp",
    type: "Đề Cương",
    subject: "Lập Trình",
    downloads: 987,
    views: 3456,
    isFree: true,
    date: "12-11-2024",
    thumbnail: "/doc-electrical-engineering.jpg",
  },
  {
    id: 3,
    title: "Bài Tập Lớn - Xây Dựng Website E-commerce",
    description: "Đề bài và hướng dẫn chi tiết cho BTL môn Web",
    type: "Bài Tập",
    subject: "Web Development",
    downloads: 456,
    views: 2345,
    isFree: false,
    price: "49.000đ",
    date: "10-11-2024",
    thumbnail: "/doc-pharmacy-quiz.jpg",
  },
  {
    id: 4,
    title: "Video Hướng Dẫn - React Hooks",
    description: "Series video hướng dẫn sử dụng React Hooks trong dự án thực tế",
    type: "Video",
    subject: "Lập Trình",
    downloads: 789,
    views: 4567,
    isFree: false,
    price: "99.000đ",
    date: "08-11-2024",
    thumbnail: "/doc-internship-report.jpg",
  },
]

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState("")

  useEffect(() => {
    async function loadResources() {
      setLoading(true)
      try {
        const docs = await api.searchDocuments(searchKeyword)
        if (docs && Array.isArray(docs)) {
          setResources(docs)
        } else if (docs && docs.results) {
          setResources(docs.results)
        } else {
          setResources(MOCK_RESOURCES)
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("Failed to load resources, using fallback", err)
        setResources(MOCK_RESOURCES)
      } finally {
        setLoading(false)
      }
    }
    void loadResources()
  }, [searchKeyword])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const keyword = formData.get("search") as string
    setSearchKeyword(keyword)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border bg-card py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <h1 className="mb-4 text-balance text-4xl font-bold">Tài Liệu Học Tập</h1>
            <p className="text-pretty text-lg text-muted-foreground mb-6">
              Truy cập tài liệu học tập miễn phí và trả phí chất lượng cao
            </p>
            
            {/* Search Box */}
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  name="search"
                  type="text"
                  placeholder="Tìm kiếm tài liệu..."
                  className="pl-10 h-12"
                  defaultValue={searchKeyword}
                />
                <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2">
                  Tìm kiếm
                </Button>
              </div>
            </form>
          </div>
        </section>

        {loading ? (
          <section className="py-16 lg:py-24">
            <div className="container mx-auto max-w-7xl px-4 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </section>
        ) : (
          <>
            {/* Resources Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Tài Liệu Miễn Phí</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {resources
                  .filter((r: any) => r.isFree)
                  .map((resource: any) => (
                    <Card
                      key={resource.id}
                      className="group hover:shadow-lg transition-all duration-300 border-gray-200 overflow-hidden"
                    >
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={resource.thumbnail || "/placeholder.svg"}
                            alt={resource.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Badge className="absolute top-3 left-3 bg-emerald-500 hover:bg-emerald-600 text-white border-0">
                            {resource.date}
                          </Badge>
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary">{resource.type}</Badge>
                          </div>
                        </div>

                        <div className="p-4">
                          <Badge variant="outline" className="mb-2">
                            {resource.subject}
                          </Badge>
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{resource.description}</p>

                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Download className="h-4 w-4" />
                              <span>{resource.downloads}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{resource.views}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Link href={`/documents/${resource.id}`} className="flex-1">
                              <Button variant="outline" className="w-full bg-transparent">
                                <Eye className="mr-2 h-4 w-4" />
                                Xem
                              </Button>
                            </Link>
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                              <Download className="mr-2 h-4 w-4" />
                              Tải về
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Tài Liệu Trả Phí</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {resources
                  .filter((r: any) => !r.isFree)
                  .map((resource: any) => (
                    <Card
                      key={resource.id}
                      className="group hover:shadow-lg transition-all duration-300 border-gray-200 overflow-hidden"
                    >
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={resource.thumbnail || "/placeholder.svg"}
                            alt={resource.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Badge className="absolute top-3 left-3 bg-emerald-500 hover:bg-emerald-600 text-white border-0">
                            {resource.date}
                          </Badge>
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary">{resource.type}</Badge>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{resource.subject}</Badge>
                            <span className="font-bold text-blue-600">{resource.price}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{resource.description}</p>

                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Download className="h-4 w-4" />
                              <span>{resource.downloads}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{resource.views}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Link href={`/documents/${resource.id}`} className="flex-1">
                              <Button variant="outline" className="w-full bg-transparent">
                                <Eye className="mr-2 h-4 w-4" />
                                Xem
                              </Button>
                            </Link>
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Mua Ngay</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
