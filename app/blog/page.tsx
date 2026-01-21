// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Calendar, Clock } from "lucide-react"
// import Link from "next/link"

// const blogPosts = [
//   {
//     id: 1,
//     title: "10 Mẹo Học Lập Trình Hiệu Quả Cho Sinh Viên",
//     excerpt: "Khám phá những phương pháp học tập hiệu quả giúp bạn nắm vững kiến thức lập trình nhanh chóng",
//     category: "Học Tập",
//     date: "15/01/2025",
//     readTime: "5 phút",
//     image: "/students-learning-programming.jpg",
//   },
//   {
//     id: 2,
//     title: "Xu Hướng Công Nghệ 2025: Điều Sinh Viên IT Cần Biết",
//     excerpt: "Tổng hợp những xu hướng công nghệ mới nhất và cơ hội nghề nghiệp trong năm 2025",
//     category: "Công Nghệ",
//     date: "12/01/2025",
//     readTime: "8 phút",
//     image: "/technology-trends-2025.png",
//   },
//   {
//     id: 3,
//     title: "Cách Xây Dựng Portfolio Ấn Tượng Cho Developer",
//     excerpt: "Hướng dẫn chi tiết cách tạo portfolio chuyên nghiệp để thu hút nhà tuyển dụng",
//     category: "Nghề Nghiệp",
//     date: "10/01/2025",
//     readTime: "6 phút",
//     image: "/developer-portfolio.png",
//   },
// ]

// export default function BlogPage() {
//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header />
//       <main className="flex-1">
//         {/* Page Header */}
//         <section className="border-b border-border bg-card py-12">
//           <div className="container mx-auto px-4">
//             <h1 className="mb-4 text-balance text-4xl font-bold">Blog</h1>
//             <p className="text-pretty text-lg text-muted-foreground">
//               Tin tức, kiến thức và kinh nghiệm học tập từ cộng đồng TLU HUB
//             </p>
//           </div>
//         </section>

//         {/* Blog Posts */}
//         <section className="py-12">
//           <div className="container mx-auto px-4">
//             <div className="grid gap-8 lg:grid-cols-2">
//               {blogPosts.map((post) => (
//                 <Link key={post.id} href={`/blog/${post.id}`}>
//                   <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
//                     <div className="relative aspect-video overflow-hidden">
//                       <img
//                         src={post.image || "/placeholder.svg"}
//                         alt={post.title}
//                         className="h-full w-full object-cover transition-transform group-hover:scale-105"
//                       />
//                       <Badge className="absolute left-4 top-4">{post.category}</Badge>
//                     </div>
//                     <CardHeader>
//                       <CardTitle className="line-clamp-2 text-2xl group-hover:text-primary">{post.title}</CardTitle>
//                       <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4" />
//                           <span>{post.date}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Clock className="h-4 w-4" />
//                           <span>{post.readTime}</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   )
// }
