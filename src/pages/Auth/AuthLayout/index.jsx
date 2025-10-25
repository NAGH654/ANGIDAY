// src/pages/Auth/AuthLayout.jsx
import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { Building2, UserRound, X, ArrowLeft } from "lucide-react";
import { endPoint } from "@routes/router";
import OnboardingPage from "../OnboardingModal";

const TITLES = {
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
  "verify-email": {
    title: "Xác thực email",
    subtitle: "Đang xử lý liên kết xác thực của bạn…",
  },
  "please-verify": {
    title: "Vui lòng xác thực email",
    subtitle: "Chúng tôi đã gửi email xác thực. Hãy kiểm tra hộp thư của bạn.",
  },
  "restaurant-register": {
    title: "Đăng ký nhà hàng",
    subtitle: "Tạo hồ sơ nhà hàng để tiếp cận nhiều khách hàng hơn",
  },
};

const UI_BY_VIEW = {
  login: { showHeader: true, showTabs: true },
  register: { showHeader: true, showTabs: true },
  forgotPassword: { showHeader: true, showTabs: false },
  "verify-email": { showHeader: false, showTabs: false },
  "please-verify": { showHeader: false, showTabs: false },
  "restaurant-register": { showHeader: true, showTabs: false },
};

/* ---------------- Suggestion Card (panel/modal) ---------------- */

function SuggestionCard({ variant, onClose }) {
  const isToRestaurant = variant === "toRestaurant";
  const Icon = isToRestaurant ? Building2 : UserRound;
  const title = isToRestaurant
    ? "Bạn là chủ nhà hàng?"
    : "Không quản lý nhà hàng?";
  const desc = isToRestaurant
    ? "Tạo tài khoản quản lý nhà hàng để cập nhật menu, nhận đánh giá và tiếp cận khách hàng."
    : "Nếu bạn chỉ muốn khám phá & đánh giá quán ăn, hãy đăng ký tài khoản người dùng thường.";
  const cta = isToRestaurant ? "Đăng ký nhà hàng" : "Đăng ký người dùng";
  const href = isToRestaurant
    ? endPoint.RESTAURANT_REGISTER
    : endPoint.REGISTER;

  return (
    <div className="w-[340px] rounded-2xl shadow-2xl bg-white ring-1 ring-black/5 p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white">
            <Icon size={16} />
          </div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>
      <p className="text-sm text-gray-600 mt-2 mb-4">{desc}</p>
      <Link
        to={href}
        className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium text-white
                   bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:brightness-95"
      >
        {cta}
      </Link>
    </div>
  );
}

/** Panel nổi (desktop) + modal (mobile) — render ngoài layout bằng Portal */
function FloatingSuggestion({ view, mobileOpen, setMobileOpen }) {
  const variant = view === "register" ? "toRestaurant" : "toUser";

  // card: max-w-md = 28rem ⇒ half = 14rem. Đặt gap ~1rem → tổng 15rem.
  const DESKTOP_LEFT = "calc(50% + 15rem)";

  return createPortal(
    <>
      {/* Desktop: sát cạnh phải của card (ẩn trên màn nhỏ) */}
      <div
        className="hidden xl:block fixed top-1/3 -translate-y-1/3 z-40"
        style={{ left: DESKTOP_LEFT }}
      >
        <SuggestionCard variant={variant} />
      </div>

      {/* Mobile: modal */}
      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-x-4 top-[12%]">
            <div className="mx-auto max-w-md">
              <SuggestionCard
                variant={variant}
                onClose={() => setMobileOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}

/* ---------------- Main Auth Layout ---------------- */

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [mobileSuggestOpen, setMobileSuggestOpen] = useState(false);

  const view = searchParams.get("view") || "login";
  const { title, subtitle } = TITLES[view] || TITLES.login;
  const ui = UI_BY_VIEW[view] || UI_BY_VIEW.login;

  const handleRegisterSuccess = () => setShowOnboarding(true);
  if (showOnboarding) return <OnboardingPage />;

  const showSuggestion = view === "register" || view === "restaurant-register";

  const goBack = () => {
    if (
      typeof window !== "undefined" &&
      window.history &&
      window.history.length > 1
    ) {
      navigate(-1);
    } else {
      navigate(endPoint.HOMEPAGE, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* background bubbles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full opacity-5" />
      <div className="absolute top-32 right-32 w-24 h-24 bg-pink-500 rounded-full opacity-5" />
      <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-pink-500 rounded-full opacity-5" />
      <div className="absolute bottom-20 right-1/4 w-36 h-36 bg-pink-500 rounded-full opacity-5" />

      {/* Back (top-left) */}
      <button
        type="button"
        onClick={goBack}
        className="fixed left-4 top-4 z-50 group inline-flex items-center
                   px-3 py-2 rounded-full bg-white shadow-md hover:shadow-lg
                   transition-all duration-300 ring-1 ring-gray-300/60 hover:ring-pink-500/70"
        aria-label="Quay lại"
      >
        <ArrowLeft
          size={18}
          className="text-gray-600 group-hover:-translate-x-1 group-hover:text-pink-600 transition-transform duration-300"
        />
        <span className="ml-1 text-sm text-gray-700 font-medium group-hover:-translate-x-1 group-hover:text-pink-600 transition-transform duration-300">
          Quay lại
        </span>
      </button>

      {/* Main card */}
      <div className="bg-white rounded-2xl shadow-2xl z-10 w-full max-w-md p-6 sm:p-8">
        {ui.showHeader && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl shadow-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center">
                {view === "restaurant-register" ? (
                  <Building2 className="w-8 h-8 text-white" />
                ) : (
                  <span className="text-white text-4xl font-bold">F</span>
                )}
              </div>
            </div>
            <h2 className="font-bold text-center text-gray-800 mb-2 text-4xl">
              {title}
            </h2>
            <p
              className={`text-center text-gray-500 mb-6 ${
                view === "forgotPassword" ? "text-sm leading-relaxed mb-8" : ""
              }`}
            >
              {subtitle}
            </p>
          </>
        )}

        {ui.showTabs && (
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

        {React.isValidElement(children)
          ? React.cloneElement(
              children,
              view === "register"
                ? { onRegisterSuccess: handleRegisterSuccess }
                : {}
            )
          : children}

        {showSuggestion && (
          <div className="mt-5 xl:hidden text-center">
            <button
              onClick={() => setMobileSuggestOpen(true)}
              className="text-sm text-pink-600 hover:brightness-75 hover:underline"
            >
              Xem gợi ý đăng ký khác
            </button>
          </div>
        )}
      </div>

      {/* Panel nổi / Modal */}
      {showSuggestion && (
        <FloatingSuggestion
          view={view}
          mobileOpen={mobileSuggestOpen}
          setMobileOpen={setMobileSuggestOpen}
        />
      )}
    </div>
  );
};

export default AuthLayout;
