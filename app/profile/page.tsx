"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import {
  Mail,
  Wallet,
  CreditCard,
  BookOpen,
  Download,
  TrendingUp,
  Settings,
  LogOut,
  Crown,
  Calendar,
  FileText,
  History,
  Edit,
  Eye,
  EyeOff,
} from "lucide-react"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  
  // Profile state (loaded from API when available) - MOVED BEFORE early return
  const [profileData, setProfileData] = useState<any>({
    isVIP: false,
    vipEndDate: null,
    balance: 0,
    totalSpent: 0,
    purchasedDocs: [],
    freeDocs: [],
  })

  useEffect(() => {
    setMounted(true)
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Load profile data from API - MOVED BEFORE early return
  useEffect(() => {
    if (!user) return // Don't fetch if no user yet
    
    async function loadProfileDocs() {
      setLoading(true)
      try {
        // Fetch purchased documents for the current user
        const studentIdToUse = user!.studentId ?? user!.email
        console.log("👤 Current user:", user)
        console.log("🔑 Student ID to use:", studentIdToUse)
        
        const resp = await api.getStudentDocuments(studentIdToUse)
        console.log("📚 Student documents response:", resp)
        
        if (resp) {
          // Map API response to our state format
          // Response format: { documentID, title, description, type, price, accessLevel, storageLink, uploadDate, subject, tags, viewsCount }
          const documents = Array.isArray(resp) ? resp : (resp.documents || resp.data || [])
          
          setProfileData({
            isVIP: resp.isVIP ?? false,
            vipEndDate: resp.vipEndDate ?? null,
            balance: resp.balance ?? 0,
            totalSpent: resp.totalSpent ?? 0,
            purchasedDocs: documents.map((doc: any) => ({
              id: doc.documentID || doc.id,
              title: doc.title || "Tài liệu",
              description: doc.description || "",
              date: doc.uploadDate ? new Date(doc.uploadDate).toLocaleDateString("vi-VN") : new Date().toLocaleDateString("vi-VN"),
              price: doc.price || 0,
              subject: doc.subject || "",
              type: doc.type, // 0 = free, 1 = paid (assumption)
              accessLevel: doc.accessLevel, // 0 = public, 1 = premium, etc.
              viewsCount: doc.viewsCount || 0,
              storageLink: doc.storageLink || "",
            })),
            freeDocs: [], // Free docs would come from a different endpoint or filter
          })
          setLoading(false)
          return
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("⚠️ Failed loading profile documents from API", err)
      }
      
      setLoading(false)
      // Fallback: empty state instead of mock data (shows user has no purchased documents yet)
      setProfileData((prev: any) => ({
        ...prev,
        purchasedDocs: [],
        freeDocs: [],
      }))
    }
    void loadProfileDocs()
  }, [user])

  if (!mounted || !user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB.')
        return
      }
      
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
        alert('Định dạng file không hỗ trợ. Vui lòng chọn file JPG hoặc PNG.')
        return
      }
      
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      // TODO: Upload file to server
      console.log('Avatar file selected:', file.name, 'Size:', (file.size / 1024 / 1024).toFixed(2) + 'MB')
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-background to-muted/20 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Profile Header */}
          <Card className="mb-8 border-2">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                  <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    {profileData.isVIP ? (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        <Crown className="h-3 w-3 mr-1" />
                        VIP
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Miễn phí</Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                  </div>

                  {!profileData.isVIP && (
                    <Button className="mt-2" size="sm">
                      <Crown className="h-4 w-4 mr-2" />
                      Nâng cấp VIP
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Finance Section */}
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  Tài chính
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-gradient-to-br from-primary to-primary/80 p-6 text-white">
                  <p className="text-sm opacity-90">Số dư hiện tại</p>
                  <p className="text-3xl font-bold mt-1">{profileData.balance.toLocaleString("vi-VN")} đ</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button className="w-full" variant="default">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Nạp tiền
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <History className="h-4 w-4 mr-2" />
                    Lịch sử
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tổng chi tiêu</span>
                    <span className="font-semibold">{profileData.totalSpent.toLocaleString("vi-VN")} đ</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Stats */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Thống kê học tập
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{profileData.purchasedDocs.length}</p>
                    <p className="text-sm text-muted-foreground">Tài liệu đã mua</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{profileData.freeDocs.length}</p>
                    <p className="text-sm text-muted-foreground">Tài liệu miễn phí</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <Download className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">
                      {profileData.purchasedDocs.length + profileData.freeDocs.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Tổng tài liệu</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purchased Documents */}
            <Card className="md:col-span-2 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Tài liệu đã mua
                </CardTitle>
                <CardDescription>Danh sách tài liệu bạn đã mua từ TLU Hub</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-3 text-muted-foreground">Đang tải...</span>
                  </div>
                ) : profileData.purchasedDocs.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="text-muted-foreground">Bạn chưa mua tài liệu nào</p>
                    <Button className="mt-4" variant="outline" onClick={() => router.push("/resources")}>
                      Khám phá tài liệu
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {profileData.purchasedDocs.map((doc: any) => (
                      <div
                        key={doc.id}
                        className="p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => router.push(`/documents/${doc.id}`)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          {/* Left side - Icon and Info */}
                          <div className="flex gap-3 flex-1 min-w-0">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-base mb-1 truncate">{doc.title}</h4>
                              {doc.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                  {doc.description}
                                </p>
                              )}
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                {doc.subject && (
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="h-3 w-3" />
                                    {doc.subject}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {doc.date}
                                </span>
                                {doc.viewsCount > 0 && (
                                  <span className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {doc.viewsCount} lượt xem
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Right side - Price and Download */}
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <Badge variant="secondary" className="text-sm font-semibold">
                              {doc.price.toLocaleString("vi-VN")} đ
                            </Badge>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full"
                              onClick={(e) => {
                                e.stopPropagation()
                                // TODO: Implement download with api.getDocumentAccess()
                                console.log("Download document:", doc.id, doc.storageLink)
                              }}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Tải xuống
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Free Documents */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4 text-primary" />
                  Tài liệu miễn phí
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profileData.freeDocs.map((doc: any) => (
                    <div key={doc.id} className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <p className="font-medium text-sm">{doc.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{doc.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <div className="md:col-span-2 lg:col-span-3 space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" />
                Cài đặt tài khoản
              </h2>
              
              {/* Main Layout Container - Force horizontal layout */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Side - Two components stacked vertically */}
                <div className="flex-1 lg:flex-[2] space-y-6">
                  {/* Component 1: Personal Information */}
                  <Card className="shadow-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        Thông tin
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="username">Tên người dùng</Label>
                          <div className="relative">
                            <Input id="username" defaultValue="User#123" className="pr-10" />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            >
                              <Edit className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dob">Ngày sinh</Label>
                          <div className="relative">
                            <Input id="dob" type="date" defaultValue="2004-06-20" className="pr-10" />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="gender">Giới tính</Label>
                          <div className="relative">
                            <Input id="gender" defaultValue="Nam" className="pr-10" />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            >
                              <Edit className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Địa chỉ</Label>
                          <div className="relative">
                            <Input id="address" defaultValue="Đông Đa - Hà Nội" className="pr-10" />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            >
                              <Edit className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Component 2: Email & Password */}
                  <Card className="shadow-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        Email tài khoản & Mật khẩu
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Input id="email" type="email" defaultValue={user.email} className="pr-10" />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            >
                              <Edit className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="new-password">Mật khẩu mới</Label>
                          <div className="relative">
                            <Input
                              id="new-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••••••••"
                              className="pr-10"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                          <div className="relative">
                            <Input
                              id="confirm-password"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="••••••••••••••"
                              className="pr-10"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <Button className="w-full bg-primary hover:bg-primary/90 text-white">CẬP NHẬT THÔNG TIN</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Side - Avatar Component */}
                <div className="w-full lg:w-96 lg:flex-shrink-0">
                  <Card className="h-full shadow-sm flex flex-col">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-semibold text-center flex items-center justify-center gap-2">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        Hình ảnh đại diện
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-center space-y-6">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="relative group">
                          <Avatar className="h-32 w-32 border-4 border-primary/20 shadow-lg transition-all duration-300 group-hover:border-primary/40">
                            <AvatarImage 
                              src={avatarPreview || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                              className="object-cover"
                            />
                            <AvatarFallback className="text-4xl bg-gradient-to-br from-primary/20 to-primary/10">
                              {user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          {avatarPreview && (
                            <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="w-full space-y-3">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg"
                            className="hidden"
                            id="avatar-upload"
                            onChange={handleAvatarChange}
                          />
                          <Button
                            className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
                            onClick={() => document.getElementById('avatar-upload')?.click()}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Đổi Avatar
                          </Button>
                          <p className="text-xs text-muted-foreground text-center leading-relaxed">
                            Chọn ảnh từ máy tính<br />
                            <span className="font-medium">(JPG, PNG tối đa 5MB)</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>              <Separator className="my-6" />

              <div className="flex justify-center">
                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
