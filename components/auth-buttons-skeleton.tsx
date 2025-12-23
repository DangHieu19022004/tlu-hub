import { Button } from "@/components/ui/button"

export function AuthButtonsSkeleton() {
  return (
    <Button variant="ghost" className="shadow-sm opacity-50" disabled>
      Đăng Nhập
    </Button>
  )
}