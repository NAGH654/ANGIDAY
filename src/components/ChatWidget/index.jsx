import React, { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { 
  useGetChatMessagesQuery,
  useSendChatMessageMutation 
} from "@redux/api/Chat/chatApi";
import { 
  setCurrentConversation, 
  setIsTyping, 
  setIsOpen 
} from "@redux/features/chatSlice";
// import toast from "react-hot-toast"; // Uncomment when needed

// Mock messages for demo when backend is not available
const initialMockMessages = [
  {
    id: 1,
    content: "Xin chào! Tôi có thể tư vấn cho bạn những địa điểm ẩm thực tuyệt vời.",
    role: "assistant",
    createdAt: new Date(Date.now() - 60000).toISOString(),
  },
];

const ChatWidget = () => {
  const dispatch = useDispatch();
  const { currentConversationId, isTyping, isOpen } = useSelector((state) => state.chat);
  
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState(initialMockMessages);
  const [nextMessageId, setNextMessageId] = useState(2);
  const messagesEndRef = useRef(null);

  // API hooks - now enabled!
  const { data: apiMessages = [], refetch: refetchMessages } = useGetChatMessagesQuery(
    { limit: 100 },
    { skip: !isOpen } // Only load when chat is open
  );
  const [sendMessage] = useSendChatMessageMutation();
  
  // Use real API messages, fallback to local if no API data
  const messages = apiMessages.length > 0 ? apiMessages : localMessages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOpenChat = async () => {
    dispatch(setIsOpen(true));
    
    // Simple approach: just open chat and load messages
    if (!currentConversationId) {
      console.log("🔍 Opening chat - messages will be loaded automatically");
      dispatch(setCurrentConversation("chat_active"));
      // Messages will be loaded via useGetChatMessagesQuery hook
    }
  };

  const handleCloseChat = () => {
    dispatch(setIsOpen(false));
    // Keep conversation active for reuse
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentConversationId) return;

    const messageContent = newMessage;
    setNewMessage("");
    
    dispatch(setIsTyping(true));
    
    try {
      console.log("📤 Sending message via API:", messageContent);
      await sendMessage({ content: messageContent }).unwrap();
      console.log("✅ Message sent successfully");
      // Messages will be automatically refetched via invalidatesTags
      refetchMessages();
    } catch (error) {
      console.error("❌ Failed to send message via API:", error);
      
      // Fallback to local demo mode
      console.log("🔄 Falling back to demo mode");
      
      // Add user message immediately
      const userMessage = {
        id: nextMessageId,
        content: messageContent,
        role: "user",
        createdAt: new Date().toISOString(),
      };
      
      setLocalMessages(prev => [...prev, userMessage]);
      setNextMessageId(prev => prev + 1);

      // Simulate AI response
      setTimeout(() => {
        const aiResponses = [
          "Demo mode: Tôi có thể giúp bạn tìm kiếm nhà hàng phù hợp! Backend API đang gặp lỗi.",
          "Demo mode: Server đang bảo trì, nhưng tôi vẫn có thể tư vấn nhà hàng cho bạn!",
          "Demo mode: API không khả dụng hiện tại. Bạn có thể thử lại sau!",
        ];
        
        const aiMessage = {
          id: nextMessageId + 1,
          content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
          role: "assistant",
          createdAt: new Date().toISOString(),
        };
        
        setLocalMessages(prev => [...prev, aiMessage]);
        setNextMessageId(prev => prev + 2);
        dispatch(setIsTyping(false));
      }, 1500);
      return;
    } finally {
      dispatch(setIsTyping(false));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format message for display
  const formatMessage = (msg) => ({
    id: msg.id,
    content: msg.content || msg.message,
    sender: msg.role === "assistant" || msg.sender === "ai" ? "ai" : "user",
    timestamp: new Date(msg.createdAt || msg.timestamp || msg.sentAt).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
          aria-label="Mở chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="w-80 h-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xs">
                AI
              </div>
              <div>
                <h2 className="font-semibold text-white text-base leading-tight">AI Assistant</h2>
                <p className="text-xs text-white/75 leading-none">Đang hoạt động</p>
              </div>
            </div>
            
            <button 
              onClick={handleCloseChat}
              className="w-6 h-6 bg-white/40 hover:bg-white/60 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <X size={12} className="text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((message) => {
              const formattedMsg = formatMessage(message);
              return (
                <div
                  key={formattedMsg.id}
                  className={`flex ${formattedMsg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[220px]">
                    {formattedMsg.sender === "ai" && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          AI
                        </div>
                        <span className="text-[9px] text-gray-500">AI Assistant</span>
                      </div>
                    )}
                    
                    <div
                      className={`px-3 py-2 rounded-xl text-xs ${
                        formattedMsg.sender === "user"
                          ? "bg-blue-500 text-white rounded-br-sm"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
                      }`}
                    >
                      <p className="leading-relaxed">{formattedMsg.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          formattedMsg.sender === "user" ? "text-blue-100" : "text-gray-400"
                        }`}
                      >
                        {formattedMsg.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[220px]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      AI
                    </div>
                    <span className="text-[9px] text-gray-500">AI đang nhập...</span>
                  </div>
                  <div className="bg-white border border-gray-200 text-gray-800 rounded-xl rounded-bl-sm px-3 py-2 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-3">
            <div className="flex items-center gap-2">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                rows="1"
                style={{
                  minHeight: "32px",
                  maxHeight: "60px",
                }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 60) + "px";
                }}
              />
              
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || !currentConversationId || isTyping}
                className={`p-2 rounded-lg transition-all ${
                  newMessage.trim() && currentConversationId && !isTyping
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-md"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;