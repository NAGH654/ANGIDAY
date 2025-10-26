import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { ttlStorage } from "@utils/ttlStorage"; // 👈 thêm

function buildInboxUrl(email) {
  if (!email) return "https://mail.google.com"; // fallback
  const domain = email.split("@")[1]?.toLowerCase() || "";

  // Gmail: Account Chooser + prefill Email
  if (domain.includes("gmail") || domain.includes("googlemail")) {
    const cont = encodeURIComponent("https://mail.google.com/mail/");
    return `https://accounts.google.com/AccountChooser?Email=${encodeURIComponent(
      email
    )}&continue=${cont}`;
  }
  // Outlook / Hotmail / Live (consumer)
  if (
    ["outlook.com", "hotmail.com", "live.com", "msn.com"].some((d) =>
      domain.endsWith(d)
    )
  ) {
    return "https://outlook.live.com/mail/0/";
  }
  // Yahoo
  if (domain.endsWith("yahoo.com") || domain.endsWith("yahoo.com.vn")) {
    return "https://mail.yahoo.com/";
  }
  // iCloud
  if (
    domain.endsWith("icloud.com") ||
    domain.endsWith("me.com") ||
    domain.endsWith("mac.com")
  ) {
    return "https://www.icloud.com/mail";
  }
  // Proton
  if (domain.endsWith("proton.me") || domain.endsWith("protonmail.com")) {
    return "https://mail.proton.me/u/0/inbox";
  }
  // Zoho
  if (domain.endsWith("zoho.com") || domain.endsWith("zohomail.com")) {
    return "https://mail.zoho.com";
  }
  // Fallback: thử mail.<domain>
  return `https://mail.${domain}`;
}

export default function PleaseVerifyPage() {
  const [mounted, setMounted] = useState(false);
  const [params] = useSearchParams();
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

  // Khi người dùng bấm "Mở hộp thư..." → dọn email tạm ngay (không để quá lâu)
  const handleOpenInbox = () => {
    ttlStorage.remove("lastRegisterEmail");
  };

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

                <a
                  href={buildInboxUrl(email)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleOpenInbox} // 👈 xóa ngay khi dùng
                  className="mt-4 inline-block w-full text-center bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                >
                  Mở hộp thư Gmail
                </a>

                <div className="mt-3 text-xs text-gray-500">
                  Không phải email này?
                  <button
                    type="button"
                    className="ml-1 hover:underline hover:brightness-75 text-pink-600"
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
              </div>
            </div>
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
