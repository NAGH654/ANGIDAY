import React, { useState, useRef, useEffect } from "react";
import { Send, X, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomerSideBar from "@layout/SideBar";

// Mock data for demo
const mockMessages = [
  {
    id: 1,
    content: "Xin chào! Tôi có thể tư vấn cho bạn những địa điểm ẩm thực tuyệt vời.",
    sender: "ai",
    timestamp: "10:30",
  },
  {
    id: 2,
    content: "Chào bạn! Tôi đang tìm một nhà hàng Nhật Bản ngon ở quận 1",
    sender: "user",
    timestamp: "10:32",
  },
  {
    id: 3,
    content: "Tôi khuyến nghị bạn thử Sushi Hokkaido và Pizza 4P's. Cả hai đều có đánh giá rất tốt và nằm trong khu vực quận 1.",
    sender: "ai",
    timestamp: "10:33",
  },
];

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      content: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        content: "Cảm ơn bạn đã chia sẻ! Tôi sẽ tìm kiếm thông tin phù hợp và phản hồi sớm nhất có thể.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <CustomerSideBar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-20 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Chat Window */}
          <div className="bg-white rounded-2xl shadow-xl border border-white/60 overflow-hidden max-w-2xl mx-auto h-[600px] flex flex-col">
            {/* Window Header */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  AI
                </div>
                <div>
                  <p className="font-medium text-white text-xs leading-tight">AI Assistant</p>
                  <p className="text-[10px] text-white/70 leading-none">Đang hoạt động</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                  <Minus size={14} className="text-white" />
                </button>
                <button 
                  onClick={() => navigate(-1)}
                  className="w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-xs">
                    {message.sender === "ai" && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          AI
                        </div>
                        <span className="text-xs text-gray-500">AI Assistant</span>
                      </div>
                    )}
                    
                    <div
                      className={`px-3 py-2 rounded-xl text-sm ${
                        message.sender === "user"
                          ? "bg-blue-500 text-white rounded-br-sm"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                      }`}
                    >
                      <p className="leading-relaxed">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user" ? "text-blue-100" : "text-gray-400"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        AI
                      </div>
                      <span className="text-xs text-gray-500">AI Assistant đang nhập...</span>
                    </div>
                    <div className="bg-white border border-gray-200 text-gray-800 rounded-xl rounded-bl-sm px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  rows="1"
                  style={{
                    minHeight: "36px",
                    maxHeight: "100px",
                  }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
                  }}
                />
                
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-2 rounded-full transition-all ${
                    newMessage.trim()
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send size={16} />
                </button>
              </div>
              
              <p className="text-xs text-gray-400 mt-2 text-center">
                AI Assistant có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;