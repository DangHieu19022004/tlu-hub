"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Send, Bot, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickQuestions = ["Thông tin về ký túc xá", "Học bổng sinh viên", "Tài liệu môn OOP", "Khóa học miễn phí"]

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Xin chào! Tôi là trợ lý ảo của TLU HUB. Tôi có thể giúp bạn tìm thông tin về trường, tài liệu học tập và khóa học. Bạn cần hỗ trợ gì?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const tooltipTimerRef = useRef<NodeJS.Timeout | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (showTooltip) {
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current)
      }
      tooltipTimerRef.current = setTimeout(() => {
        setShowTooltip(false)
      }, 5000)
    }

    return () => {
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current)
      }
    }
  }, [showTooltip])

  const handleSend = async (message?: string) => {
    const messageToSend = message || input
    if (!messageToSend.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(messageToSend),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("ký túc xá") || lowerQuestion.includes("ktx")) {
      return "TLU có 3 khu ký túc xá với đầy đủ tiện nghi: KTX A (dành cho nam), KTX B (dành cho nữ), và KTX C (hỗn hợp). Giá thuê từ 500.000đ - 1.200.000đ/tháng tùy loại phòng. Bạn có thể đăng ký KTX qua phòng Công tác sinh viên."
    }

    if (lowerQuestion.includes("học bổng")) {
      return "TLU có nhiều loại học bổng: Học bổng khuyến khích học tập (dựa vào điểm GPA), học bổng tài năng, học bổng doanh nghiệp. Điều kiện: GPA >= 3.2, không có môn nào dưới 2.0. Thời gian đăng ký thường vào đầu mỗi học kỳ."
    }

    if (lowerQuestion.includes("tài liệu") || lowerQuestion.includes("oop") || lowerQuestion.includes("lập trình")) {
      return "Bạn có thể tìm tài liệu học tập tại mục 'Tài Liệu' trên website. Chúng tôi có slide bài giảng, đề cương, bài tập mẫu cho hầu hết các môn. Một số tài liệu miễn phí, một số cần thanh toán. Bạn muốn tìm tài liệu môn nào cụ thể?"
    }

    if (lowerQuestion.includes("khóa học") || lowerQuestion.includes("course")) {
      return "TLU HUB có hơn 500 khóa học về Lập trình, Thiết kế, Kỹ năng mềm, Kinh doanh. Nhiều khóa học miễn phí cho sinh viên TLU. Bạn có thể xem danh sách đầy đủ tại mục 'Khóa Học' hoặc cho tôi biết bạn quan tâm lĩnh vực nào?"
    }

    if (lowerQuestion.includes("liên hệ") || lowerQuestion.includes("admin") || lowerQuestion.includes("hỗ trợ")) {
      return "Bạn có thể liên hệ với admin qua: Email: contact@tluhub.edu.vn, Hotline: 024 1234 5678, hoặc qua trang 'Liên Hệ' trên website. Chúng tôi sẽ phản hồi trong vòng 24h."
    }

    return "Cảm ơn câu hỏi của bạn! Tôi có thể giúp bạn về: thông tin trường (ký túc xá, học bổng), tài liệu học tập, khóa học, hoặc liên hệ admin. Bạn có thể hỏi cụ thể hơn được không?"
  }

  const handleOpenChat = () => {
    setIsOpen(true)
    setShowTooltip(false)
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current)
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
          {showTooltip && (
            <div className="absolute bottom-full right-0 mb-2 w-56 md:w-64 rounded-lg bg-white p-3 shadow-lg border border-border animate-in fade-in slide-in-from-bottom-2">
              <p className="text-sm text-foreground">Xin chào, tôi là TLU Assistant, tôi có thể giúp gì cho bạn?</p>
              <div className="absolute bottom-0 right-6 h-0 w-0 translate-y-full border-8 border-transparent border-t-white"></div>
            </div>
          )}
          <Button
            size="lg"
            className="h-16 w-16 md:h-20 md:w-20 rounded-full shadow-lg transition-all hover:scale-110 p-3 overflow-hidden bg-blue-500"
            onClick={handleOpenChat}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Image src="/chatbot.png" alt="Chatbot" width={80} height={80} className="h-full w-full object-contain" />
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed inset-x-0 bottom-0 md:bottom-6 md:right-6 md:left-auto z-50 flex h-[100dvh] md:h-[600px] w-full md:w-[400px] flex-col shadow-2xl md:rounded-lg rounded-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-blue-500 overflow-hidden p-2">
                <Image
                  src="/chatbot.png"
                  alt="TLU Assistant"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <CardTitle className="text-base md:text-lg">TLU Assistant</CardTitle>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  Đang hoạt động
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col gap-4 overflow-hidden p-3 md:p-4">
            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  {message.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[75%] md:max-w-[80%] rounded-2xl px-3 md:px-4 py-2",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Câu hỏi gợi ý:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer transition-colors hover:bg-accent text-xs"
                      onClick={() => handleSend(question)}
                    >
                      <Sparkles className="mr-1 h-3 w-3" />
                      {question}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Nhập câu hỏi của bạn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button size="icon" onClick={() => handleSend()} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
