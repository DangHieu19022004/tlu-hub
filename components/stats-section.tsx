import { FileText, Download, Users } from "lucide-react"

const stats = [
  { icon: FileText, value: "2,450+", label: "Tài liệu đã chia sẻ", color: "text-primary", bgColor: "bg-red-50", borderColor: "border-red-100", shadowColor: "shadow-red-100/50" },
  { icon: Download, value: "15,000+", label: "Lượt tải về", color: "text-secondary", bgColor: "bg-blue-50", borderColor: "border-blue-100", shadowColor: "shadow-blue-100/50" },
  { icon: Users, value: "850+", label: "Sinh viên tham gia", color: "text-orange-500", bgColor: "bg-orange-50", borderColor: "border-orange-100", shadowColor: "shadow-orange-100/50" },
]

export function StatsSection() {
  return (
    <section className="w-full flex justify-center py-5 px-4 sm:px-10 -mt-10 relative z-10">
      <div className="w-full max-w-[1000px]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-2 rounded-2xl p-6 border ${stat.borderColor} bg-white shadow-lg ${stat.shadowColor} hover:translate-y-[-4px] transition-transform duration-300`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 ${stat.bgColor} rounded-xl ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <p className="text-gray-600 text-base font-bold">
                  {stat.label}
                </p>
              </div>
              <p className={`${stat.color} tracking-tight text-4xl font-black pl-1`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
