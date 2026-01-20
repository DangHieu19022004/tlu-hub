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
import { getAvatarByGender } from "@/lib/utils"
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
  Loader2,
} from "lucide-react"
import { useEffect, useState } from "react"
import { api, ApiConfig } from "@/lib/api"
import { PurchasedDocumentsList } from "@/components/purchased-documents-list"
import { RechargeDialog } from "@/components/recharge-dialog"
import { UpgradeVIPDialog } from "@/components/upgrade-vip-dialog"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [showRechargeDialog, setShowRechargeDialog] = useState(false)
  const [showUpgradeVIPDialog, setShowUpgradeVIPDialog] = useState(false)
  
  // Profile state (loaded from API when available) - MOVED BEFORE early return
  const [profileData, setProfileData] = useState<any>({
    isVIP: false,
    vipEndDate: null,
    balance: 0,
    purchasedDocs: [],
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (!user) {
      router.push("/login")
    }
  }, [mounted, user, router])

  // Load profile data from API - MOVED BEFORE early return
  useEffect(() => {
    if (!mounted || !user) return // Wait for mount and user to be ready
    
    async function loadProfileData() {
      setLoading(true)
      try {
        const studentIdToUse = user.studentId ?? user.email
        
        if (ApiConfig.debug) {
          console.log("👤 Loading profile data for:", studentIdToUse)
        }
        
        // Load student info (balance, VIP status, etc.)
        const studentInfo = await api.getStudentInfo(studentIdToUse)
        
        // Load purchased documents
        const resp = await api.getStudentDocuments(studentIdToUse)
        const documents = Array.isArray(resp) ? resp : (resp.data || [])
        
        setProfileData({
          isVIP: studentInfo.isVIP,
          vipEndDate: studentInfo.vipEndDate ?? null,
          balance: studentInfo.balance,
          purchasedDocs: documents.map((doc: any) => ({
            id: doc.documentID || doc.id,
            title: doc.title || "Tài liệu",
            description: doc.description || "",
            date: doc.uploadDate ? new Date(doc.uploadDate).toLocaleDateString("vi-VN") : new Date().toLocaleDateString("vi-VN"),
            price: doc.price || 0,
            subject: doc.subject || "",
            type: doc.type,
            accessLevel: doc.accessLevel,
            viewsCount: doc.viewsCount || 0,
            storageLink: doc.storageLink || "",
          })),
        })
      } catch (err: any) {
        // Silently handle API errors - user will see empty state
        console.warn("⚠️ Could not load profile data:", err?.message || "Unknown error")
        
        // Set empty state on error
        setProfileData((prev: any) => ({
          ...prev,
          purchasedDocs: [],
        }))
      } finally {
        setLoading(false)
      }
    }
    void loadProfileData()
  }, [mounted, user])

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
                  <AvatarImage src={getAvatarByGender(user.gender, user.studentId)} />
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
                      <Badge className="bg-primary text-white" variant="secondary">Miễn phí</Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                  </div>

                  {!profileData.isVIP && (
                    <Button 
                      className="mt-2 cursor-pointer" 
                      size="sm"
                      onClick={() => setShowUpgradeVIPDialog(true)}
                    >
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
                  <p className="text-3xl font-bold mt-1 flex items-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 className="h-8 w-8" style={{ animation: 'spin 1s linear infinite' }} />
                        <span className="text-lg">Đang tải...</span>
                      </>
                    ) : (
                      <>{profileData.balance.toLocaleString("vi-VN")} đ</>
                    )}
                  </p>
                </div>

                <div className="grid gap-3">
                  <Button 
                    className="w-full cursor-pointer" 
                    variant="default"
                    onClick={() => setShowRechargeDialog(true)}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Nạp tiền
                  </Button>
                  {/* <Button className="w-full bg-transparent cursor-pointer" variant="outline">
                    <History className="h-4 w-4 mr-2" />
                    Lịch sử
                  </Button> */}
                </div>

                <Separator />
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{profileData.purchasedDocs.length}</p>
                    <p className="text-sm text-muted-foreground">Tài liệu đã mua</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <Download className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">
                      {profileData.purchasedDocs.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Tổng tài liệu</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purchased Documents */}
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Tài liệu đã mua
                </CardTitle>
                <CardDescription>Danh sách tài liệu bạn đã mua từ TLU Hub</CardDescription>
              </CardHeader>
              <CardContent>
                <PurchasedDocumentsList 
                  documents={profileData.purchasedDocs}
                  studentId={user.studentId || user.email}
                  loading={loading}
                />
              </CardContent>
            </Card>

            {/* Account Settings - Backend chưa có API */}
            {/* <div className="md:col-span-2 lg:col-span-3 space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" />
                Cài đặt tài khoản
              </h2>
              
              Main Layout Container - Force horizontal layout
              <div className="flex flex-col lg:flex-row gap-6">
                Left Side - Two components stacked vertically
                <div className="flex-1 lg:flex-[2] space-y-6">
                  Component 1: Personal Information
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

                  Component 2: Email & Password
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

                Right Side - Avatar Component
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
            </div> */}
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Recharge Dialog Modal */}
      {showRechargeDialog && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowRechargeDialog(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <RechargeDialog
              studentId={user.studentId || user.email}
              onSuccess={async () => {
                setShowRechargeDialog(false)
                // Reload profile data without full page reload
                try {
                  const studentIdToUse = user.studentId ?? user.email
                  const studentInfo = await api.getStudentInfo(studentIdToUse)
                  setProfileData((prev: any) => ({
                    ...prev,
                    balance: studentInfo.balance,
                  }))
                } catch (err) {
                  console.warn("Could not refresh balance:", err)
                }
              }}
              onCancel={() => setShowRechargeDialog(false)}
            />
          </div>
        </div>
      )}
      
      {/* Upgrade VIP Dialog Modal */}
      {showUpgradeVIPDialog && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowUpgradeVIPDialog(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <UpgradeVIPDialog
              studentId={user.studentId || user.email}
              currentBalance={profileData.balance}
              isVIP={profileData.isVIP}
              vipEndDate={profileData.vipEndDate}
              onSuccess={async () => {
                setShowUpgradeVIPDialog(false)
                // Reload profile data without full page reload
                try {
                  const studentIdToUse = user.studentId ?? user.email
                  const studentInfo = await api.getStudentInfo(studentIdToUse)
                  setProfileData((prev: any) => ({
                    ...prev,
                    isVIP: studentInfo.isVIP,
                    vipEndDate: studentInfo.vipEndDate,
                    balance: studentInfo.balance,
                  }))
                } catch (err) {
                  console.warn("Could not refresh profile:", err)
                }
              }}
              onCancel={() => setShowUpgradeVIPDialog(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
