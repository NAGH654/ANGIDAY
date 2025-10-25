import React, { useState, useEffect } from "react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

export default function PleaseVerifyPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-6">
      <div
        className={`max-w-md w-full transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden ring-1 ring-black/5">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full -mr-16 -mt-16 opacity-50" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-200 rounded-full -ml-12 -mb-12 opacity-50" />

          {/* Icon */}
          <div className="relative flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 animate-ping">
                <div className="w-20 h-20 bg-pink-400 rounded-full opacity-20" />
              </div>
              <div className="absolute inset-0 animate-pulse">
                <div className="w-20 h-20 bg-indigo-400 rounded-full opacity-30" />
              </div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 duration-300">
                <Mail
                  className="w-10 h-10 text-white animate-bounce"
                  style={{ animationDuration: "2s" }}
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Vui lòng xác thực email
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-center leading-relaxed mb-6">
            Chúng tôi đã gửi một email có liên kết xác thực tới địa chỉ bạn đã
            đăng ký. Hãy mở email và bấm vào liên kết để hoàn tất kích hoạt tài
            khoản.
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
            <CheckCircle className="w-5 h-5 text-pink-500" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-pink-50 to-indigo-50 rounded-2xl p-5 border border-pink-100">
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-pink-900 mb-1">
                  Mẹo hữu ích:
                </p>
                <p className="text-sm text-gray-700">
                  Kiểm tra mục{" "}
                  <span className="font-semibold text-pink-700">
                    Spam/Quảng cáo
                  </span>{" "}
                  nếu không thấy trong Hộp thư đến.
                </p>
              </div>
            </div>

            {/* Gmail */}
            <div className="mt-4">
              <a
                href="https://mail.google.com"
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
              >
                Mở Gmail
              </a>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Thường mất 1–2 phút để email đến hộp thư của bạn
          </p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
          <div
            className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  );
}
