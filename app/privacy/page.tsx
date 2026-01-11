export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Chính sách bảo mật</h1>
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Thu thập thông tin</h2>
          <p className="text-gray-700 mb-4">
            TLU Hub chỉ thu thập thông tin cần thiết như mã sinh viên, email để phục vụ mục đích cung cấp dịch vụ tài liệu học tập.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">2. Sử dụng thông tin</h2>
          <p className="text-gray-700 mb-4">
            Thông tin của bạn chỉ được sử dụng để:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Xác thực tài khoản người dùng</li>
            <li>Cung cấp dịch vụ tải và chia sẻ tài liệu</li>
            <li>Thống kê và cải thiện trải nghiệm người dùng</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">3. Bảo mật thông tin</h2>
          <p className="text-gray-700 mb-4">
            Chúng tôi cam kết bảo mật thông tin cá nhân của bạn và không chia sẻ với bên thứ ba khi chưa có sự đồng ý.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">4. Quyền của người dùng</h2>
          <p className="text-gray-700 mb-4">
            Bạn có quyền yêu cầu xóa hoặc chỉnh sửa thông tin cá nhân của mình bất cứ lúc nào.
          </p>

          <p className="text-gray-600 mt-8">
            Cập nhật lần cuối: Tháng 1, 2026
          </p>
        </div>
      </div>
    </div>
  )
}
