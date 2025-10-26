import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle, XCircle, AlertTriangle, ArrowRight } from "lucide-react";
import HourglassSpinner from "@components/HourglassSpinner";
import { useVerifyEmailQuery } from "@redux/api/Auth/authApi";
import { endPoint } from "@routes/router"; 

export default function VerifyEmailPage() {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const navigate = useNavigate();

  const { data, isFetching, isError, error } = useVerifyEmailQuery(token, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => setMounted(true), []);

  const currentState = useMemo(() => {
    if (!token) return "noToken";
    if (isFetching) return "loading";
    if (isError) return "error";
    return data?.isSuccess ? "success" : "error";
  }, [token, isFetching, isError, data]);

  useEffect(() => {
    if (currentState !== "success") return;
    setCountdown(3);
    const itv = setInterval(
      () => setCountdown((v) => (v <= 1 ? 0 : v - 1)),
      1000
    );
    const to = setTimeout(
      () => navigate(endPoint.LOGIN, { replace: true }),
      3000
    );
    return () => {
      clearInterval(itv);
      clearTimeout(to);
    };
  }, [currentState, navigate]);

  const errMsg =
    error?.data?.message ||
    data?.message ||
    "Token không hợp lệ hoặc đã hết hạn.";

  // ===== No token =====
  if (currentState === "noToken") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center p-6">
        <div
          className={`max-w-md w-full transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden ring-1 ring-black/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 rounded-full -mr-16 -mt-16 opacity-50" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200 rounded-full -ml-12 -mb-12 opacity-50" />
            <div className="relative flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Thiếu mã xác thực
            </h1>
            <p className="text-gray-600 text-center leading-relaxed mb-6">
              Vui lòng mở email và bấm lại liên kết có tham số{" "}
              <code className="bg-amber-100 text-amber-800 px-2 py-1 rounded font-mono text-sm">
                ?token=...
              </code>
            </p>
            <Link
              to="/"
              className="block w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ===== Main card (loading / success / error) =====
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-6">
        <div
          className={`max-w-md w-full transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-9 relative overflow-hidden ring-1 ring-black/5">
            {/* Loading */}
            {currentState === "loading" && (
              <>
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-full -mr-16 -mt-16 opacity-50" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200 rounded-full -ml-12 -mb-12 opacity-50" />
                <div className="relative flex justify-center mb-2">
                  <HourglassSpinner size={90} />
                </div>
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-3">
                  Đang xác thực email…
                </h1>
                <p className="text-gray-600 text-center">
                  Vui lòng chờ trong giây lát
                </p>
                <div className="mt-6 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 rounded-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400" />
                </div>
              </>
            )}

            {/* Success */}
            {currentState === "success" && (
              <>
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full -mr-16 -mt-16 opacity-50" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-200 rounded-full -ml-12 -mb-12 opacity-50" />
                <div className="relative flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping">
                      <div className="w-20 h-20 bg-emerald-400 rounded-full opacity-20" />
                    </div>
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
                  Xác thực thành công!
                </h1>
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  Bạn có thể đăng nhập ngay bây giờ.
                </p>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-5 border border-emerald-100">
                  <div className="flex items-center justify-center gap-2 text-emerald-700">
                    <ArrowRight className="w-5 h-5 animate-pulse" />
                    <p className="text-sm font-medium">
                      Đang chuyển về trang đăng nhập trong{" "}
                      <span className="text-xl font-bold">{countdown}</span>{" "}
                      giây...
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Error */}
            {currentState === "error" && (
              <>
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200 rounded-full -mr-16 -mt-16 opacity-50" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-200 rounded-full -ml-12 -mb-12 opacity-50" />
                <div className="relative flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 animate-pulse">
                      <div className="w-20 h-20 bg-rose-400 rounded-full opacity-20" />
                    </div>
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <XCircle className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent mb-2">
                  Xác thực thất bại
                </h1>
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  {errMsg}
                </p>
                <Link
                  to="/auth?view=please-verify"
                  className="block w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
                >
                  Quay lại trang hướng dẫn
                </Link>
              </>
            )}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {currentState === "loading" && (
              <>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                />
              </>
            )}
            {currentState === "success" && (
              <>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <div
                  className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                />
              </>
            )}
            {currentState === "error" && (
              <>
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
                <div
                  className="w-2 h-2 bg-red-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </>
  );
}
