import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const IntroMessage = ({ isVisible, onClose }) => {
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const fullText = "Chào mừng bạn! Tôi có thể giúp bạn tìm kiếm nhà hàng, tư vấn ẩm thực. Click vào biểu tượng chat để bắt đầu!";

  useEffect(() => {
    if (isVisible) {
      setTypedText("");
      setIsTyping(true);
      
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          
          // Auto-hide after 5 seconds
          setTimeout(() => {
            onClose();
          }, 5000);
        }
      }, 50); // 50ms per character
      
      return () => clearInterval(typeInterval);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-xs animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <MessageCircle size={16} className="text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm mb-1">AI Assistant</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            {typedText}
            {isTyping && <span className="animate-pulse text-pink-500">|</span>}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
        >
          <X size={12} className="text-gray-500" />
        </button>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default IntroMessage;
