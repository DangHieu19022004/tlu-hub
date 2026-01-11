export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Điều khoản sử dụng</h1>
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Chấp nhận điều khoản</h2>
          <p className="text-gray-700 mb-4">
            Khi sử dụng TLU Hub, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu dưới đây.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">2. Sử dụng dịch vụ</h2>
          <p className="text-gray-700 mb-4">
            Bạn được phép:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Tải lên và chia sẻ tài liệu học tập hợp pháp</li>
            <li>Tải xuống tài liệu cho mục đích học tập cá nhân</li>
            <li>Tương tác với cộng đồng một cách lịch sự</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">3. Nội dung bị cấm</h2>
          <p className="text-gray-700 mb-4">
            Nghiêm cấm các hành vi:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Chia sẻ nội dung vi phạm bản quyền</li>
            <li>Tải lên tài liệu có nội dung không phù hợp</li>
            <li>Sử dụng dịch vụ cho mục đích thương mại trái phép</li>
            <li>Gian lận hoặc lợi dụng hệ thống</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">4. Trách nhiệm người dùng</h2>
          <p className="text-gray-700 mb-4">
            Bạn hoàn toàn chịu trách nhiệm về nội dung mà mình tải lên. TLU Hub có quyền xóa bất kỳ nội dung nào vi phạm điều khoản.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">5. Thay đổi điều khoản</h2>
          <p className="text-gray-700 mb-4">
            Chúng tôi có quyền cập nhật điều khoản này bất cứ lúc nào. Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận điều khoản mới.
          </p>

          <p className="text-gray-600 mt-8">
            Cập nhật lần cuối: Tháng 1, 2026
          </p>
        </div>
      </div>
    </div>
  )
}
