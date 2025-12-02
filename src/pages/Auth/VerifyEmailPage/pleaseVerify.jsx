import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { ttlStorage } from "@utils/ttlStorage";
import { endPoint } from "@routes/router";

export default function PleaseVerifyPage() {
  const [mounted, setMounted] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const emailFromQuery = params.get("email") || "";
  const [email, setEmail] = useState(emailFromQuery);

  useEffect(() => setMounted(true), []);

  // Nếu query không có email → thử lấy từ localStorage (tự xóa nếu đã hết hạn)
  useEffect(() => {
    if (!emailFromQuery) {
      const saved = ttlStorage.get("lastRegisterEmail") || "";
      setEmail(saved);
    }
  }, [emailFromQuery]);

  // Lưu email vào localStorage thường (không có TTL) để dùng khi verify
  useEffect(() => {
    const currentEmail = email || emailFromQuery || "";
    if (currentEmail) {
      localStorage.setItem("pendingVerificationEmail", currentEmail);
    }
  }, [email, emailFromQuery]);

  // Kiểm tra xem email đã được verify chưa (từ tab khác)
  useEffect(() => {
    // Lấy email hiện tại (ưu tiên query, sau đó localStorage, cuối cùng ttlStorage)
    const getCurrentEmail = () => {
      return email || emailFromQuery || localStorage.getItem("pendingVerificationEmail") || ttlStorage.get("lastRegisterEmail") || "";
    };

    const checkVerificationStatus = () => {
      try {
        const verifiedData = localStorage.getItem("emailVerified");
        if (verifiedData) {
          const parsed = JSON.parse(verifiedData);
          const currentEmail = getCurrentEmail();
          
          // Normalize email để so sánh (lowercase, trim)
          const normalizeEmail = (e) => (e || "").toLowerCase().trim();
          const verifiedEmail = normalizeEmail(parsed.email);
          const currentEmailNormalized = normalizeEmail(currentEmail);
          
          // Kiểm tra xem email đã được verify có khớp với email hiện tại không
          // Hoặc nếu không có email hiện tại, vẫn redirect nếu có flag verify
          if (verifiedEmail && (currentEmailNormalized === verifiedEmail || !currentEmailNormalized)) {
            // Xóa flag sau khi đã sử dụng
            localStorage.removeItem("emailVerified");
            localStorage.removeItem("pendingVerificationEmail");
            // Redirect về trang login
            navigate(endPoint.LOGIN, { replace: true });
            return true;
          }
        }
        return false;
      } catch (error) {
        console.error("Error checking verification status:", error);
        return false;
      }
    };

    // Kiểm tra ngay khi component mount
    checkVerificationStatus();

    // Lắng nghe storage event từ các tab khác
    const handleStorageChange = (e) => {
      if (e.key === "emailVerified") {
        checkVerificationStatus();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Polling để kiểm tra định kỳ (fallback nếu storage event không hoạt động)
    // Giảm interval xuống 1 giây để phản hồi nhanh hơn
    const pollingInterval = setInterval(() => {
      if (checkVerificationStatus()) {
        clearInterval(pollingInterval);
      }
    }, 1000); // Kiểm tra mỗi 1 giây

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(pollingInterval);
    };
  }, [email, emailFromQuery, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-6">
      <div
        className={`max-w-md w-full transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden ring-1 ring-black/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full -mr-16 -mt-16 opacity-50" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-200 rounded-full -ml-12 -mb-12 opacity-50" />

          <div className="relative flex justify-center mb-5">
            <div className="relative">
              <div className="absolute inset-0 animate-ping">
                <div className="w-20 h-20 bg-pink-400 rounded-full opacity-20" />
              </div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <Mail className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Vui lòng xác thực email
          </h1>

          <p className="text-gray-600 text-center leading-relaxed mb-6">
            Chúng tôi đã gửi <b>email xác minh</b> tới hộp thư
            {email ? (
              <>
                {" "}
                <span className="font-semibold"> {email}</span>
              </>
            ) : (
              " của bạn"
            )}
            . Hãy mở email và bấm liên kết <b>“Xác minh ở đây”</b> để hoàn tất.
          </p>

          <div className="bg-gradient-to-br from-pink-50 to-indigo-50 rounded-2xl p-5 border border-pink-100">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-pink-900 mb-1">Mẹo:</p>
                <p className="text-sm text-gray-700">
                  Kiểm tra mục{" "}
                  <span className="font-semibold">Spam / Quảng cáo</span> nếu
                  chưa thấy email.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-500 text-center">
            Không phải email này?{" "}
            <button
              type="button"
              className="ml-1 hover:underline hover:brightness-75 text-pink-600 font-medium"
              onClick={() => {
                const e = prompt(
                  "Nhập lại email để mở đúng hộp thư:",
                  email || ""
                );
                if (e) {
                  const v = e.trim();
                  setEmail(v);
                  // Cập nhật lại TTL khi user sửa tay (ví dụ 30 giây)
                  ttlStorage.set("lastRegisterEmail", v, 30 * 1000);
                }
              }}
            >
              Thay đổi
            </button>
          </div>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
            <CheckCircle className="w-5 h-5 text-pink-500" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          </div>

          <p className="text-xs text-gray-500 text-center">
            Liên kết xác minh thường có hiệu lực trong 24 giờ.
          </p>
        </div>

        <div className="flex justify-center gap-2 mt-4">
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
