import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { endPoint } from "@routes/router";
import OnboardingPage from "../OnboardingPage";

const AuthLayout = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const view = searchParams.get("view") || "login";

  const titles = {
    login: {
      title: "Chào mừng trở lại",
      subtitle: "Đăng nhập để tiếp tục hành trình ẩm thực của bạn",
    },
    register: {
      title: "Tạo tài khoản",
      subtitle: "Tham gia cùng hàng ngàn người yêu ẩm thực ngay hôm nay",
    },
    forgotPassword: {
      title: "Quên mật khẩu?",
      subtitle:
        "Không sao! Hãy nhập email, chúng tôi sẽ gửi liên kết đặt lại mật khẩu cho bạn.",
    },
  };

  const { title, subtitle } = titles[view] || titles.login;
  const isRegister = view === "register";

  const handleRegisterSuccess = () => {
    setShowOnboarding(true);
  };

  if (showOnboarding) return <OnboardingPage />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full opacity-5"></div>
      <div className="absolute top-32 right-32 w-24 h-24 bg-pink-500 rounded-full opacity-5"></div>
      <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-pink-500 rounded-full opacity-5"></div>
      <div className="absolute bottom-20 right-1/4 w-36 h-36 bg-pink-500 rounded-full opacity-5"></div>

      {/* Content box (rộng hơn khi register) */}
      <div
        className={[
          "bg-white rounded-2xl shadow-2xl z-10",
          isRegister
            ? "w-full max-w-md p-8"
            : "w-full max-w-md p-8",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
            <span className="text-white text-4xl font-bold">F</span>
          </div>
        </div>

        {/* Title */}
        <h2
          className={`font-bold text-center text-gray-800 mb-2 ${
            isRegister ? "text-3xl" : "text-4xl"
          }`}
        >
          {title}
        </h2>
        <p
          className={`text-center text-gray-500 mb-6 ${
            view === "forgotPassword" ? "text-sm leading-relaxed mb-8" : ""
          }`}
        >
          {subtitle}
        </p>

        {/* Tabs */}
        {(view === "login" || view === "register") && (
          <div className="bg-gray-100 rounded-lg p-1 flex justify-between mb-6">
            <Link
              to={endPoint.LOGIN}
              className={`w-1/2 py-2 text-sm font-semibold rounded-md text-center transition-all duration-300 ${
                view === "login"
                  ? "bg-white text-gray-800 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Đăng nhập
            </Link>
            <Link
              to={endPoint.REGISTER}
              className={`w-1/2 py-2 text-sm font-semibold rounded-md text-center transition-all duration-300 ${
                view === "register"
                  ? "bg-white text-gray-800 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Đăng ký
            </Link>
          </div>
        )}

        {/* Child form (nếu là register sẽ nhận onRegisterSuccess) */}
        {React.cloneElement(
          children,
          isRegister ? { onRegisterSuccess: handleRegisterSuccess } : {}
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
