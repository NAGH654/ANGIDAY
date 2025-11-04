import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation, useLoginWithGoogleMutation } from "@redux/api/Auth/authApi";
import { useLazyGetMeQuery } from "@redux/api/User/userApi";
import { setCredentials } from "@redux/features/authSlice";
import { toast } from "react-toastify";
import { endPoint } from "@routes/router";
import LoadingSpinner from "@components/LoadingSpinner";
import { ttlStorage } from "@utils/ttlStorage";

const InputField = ({
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
  disabled,
}) => {
  const [show, setShow] = useState(false);
  const inputType = type === "password" && show ? "text" : type;
  return (
    <div className="mb-4 relative">
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-10 py-3 text-sm text-gray-700 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-1 focus:ring-pink-500 
                   hover:border-pink-400 hover:shadow-md hover:shadow-pink-100
                   transition-all duration-300 disabled:opacity-60"
      />
      {Icon && (
        <Icon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
      )}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors disabled:opacity-60"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};

const AuthButton = ({ children, onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-lg 
               flex items-center justify-center gap-2 shadow-lg hover:brightness-90 
               hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] 
               transition-all duration-300 ease-out disabled:opacity-60"
  >
    {children}
  </button>
);

const SocialButton = ({ children, icon: Icon, className, disabled, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex items-center justify-center py-2.5 border border-gray-300 rounded-lg 
                text-sm font-semibold text-gray-700 bg-white 
                hover:bg-gray-50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] 
                transition-all duration-300 disabled:opacity-60 ${className}`}
  >
    {Icon && <Icon className="w-5 h-5 mr-2" />}
    {children}
  </button>
);

// === Helper: make safe expiry no matter backend ===
function ensureExpiry(tok, expUtc, expiresInSec) {
  const NOW = Date.now();

  // 1) expUtc hợp lệ & còn >30s
  if (expUtc) {
    const t = new Date(expUtc).getTime();
    if (Number.isFinite(t) && t > NOW + 30_000)
      return new Date(t).toISOString();
  }

  // 2) expiresIn giây
  if (Number.isFinite(expiresInSec) && expiresInSec > 30) {
    return new Date(NOW + expiresInSec * 1000).toISOString();
  }

  // 3) JWT exp
  try {
    const [, payload] = String(tok || "").split(".");
    const obj = JSON.parse(atob(payload));
    const ms = Number(obj?.exp) * 1000;
    if (Number.isFinite(ms) && ms > NOW + 30_000)
      return new Date(ms).toISOString();
  } catch {}

  // 4) Fallback 60 phút
  return new Date(NOW + 60 * 60 * 1000).toISOString();
}

const today = new Date().toISOString().slice(0, 10);
const EMAIL_TTL_MS = 30 * 1000; // TTL 30 giây

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [loginWithGoogle, { isLoading: isGoogleLoading }] = useLoginWithGoogleMutation();
  const [triggerGetMe] = useLazyGetMeQuery();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    gender: "other",
    dateOfBirth: today,
  });

  const onChange = (k) => (e) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    if (!form.username || !form.email || !form.password || !form.fullName) {
      toast.warn("Vui lòng điền đủ: Tên đăng nhập, Email, Mật khẩu, Họ tên");
      return false;
    }
    if (!form.dateOfBirth) {
      toast.warn("Vui lòng chọn ngày sinh");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    try {
      const payload = {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        fullName: form.fullName.trim(),
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
      };
      const res = await register(payload).unwrap();
      if (res?.isSuccess) {
        toast.success(
          "Đăng ký thành công! Vui lòng kiểm tra email để xác thực."
        );

        // Lưu email với TTL + truyền query (robust)
        const email = payload.email.trim();
        ttlStorage.set("lastRegisterEmail", email, EMAIL_TTL_MS);
        const url = `${endPoint.PLEASE_VERIFY()}&email=${encodeURIComponent(
          email
        )}`;
        navigate(url, { replace: true });
      } else {
        toast.error(res?.message || "Đăng ký thất bại");
      }
    } catch (err) {
      const msg = err?.data?.message || "Đăng ký thất bại";
      toast.error(msg);
      console.error("Register error:", err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Initialize Google Identity Services
      if (typeof window.google === "undefined") {
        toast.error("Google OAuth chưa được tải. Vui lòng thử lại sau.");
        return;
      }

      const clientId =
        import.meta.env.VITE_GOOGLE_CLIENT_ID ||
        "1042609021742-tflr2gbgb5c60aktv5r42pf23isocgg8.apps.googleusercontent.com";

      // Configure Google OAuth
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCallback,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Prompt for Google login
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          const reason = notification.getNotDisplayedReason();

          if (reason === "unregistered_origin") {
            toast.error(
              `Domain ${window.location.origin} chưa được đăng ký. Vui lòng thêm vào Google Console.`
            );
          } else if (reason === "invalid_client") {
            toast.error("Client ID không hợp lệ. Vui lòng kiểm tra cấu hình.");
          } else if (reason === "opt_out_or_no_session") {
            toast.error("Người dùng đã từ chối hoặc không có session.");
          } else {
            toast.error(`Không thể hiển thị Google login. Lý do: ${reason}`);
          }

          // Fallback: try renderButton method
          try {
            window.google.accounts.id.renderButton(
              document.getElementById("google-signin-button-register"),
              {
                theme: "outline",
                size: "large",
                text: "signin_with",
                shape: "rectangular",
                logo_alignment: "left",
              }
            );
          } catch (fallbackError) {
            // Fallback failed
          }
        } else if (notification.isSkippedMoment()) {
          toast.error("Google login bị bỏ qua. Vui lòng thử lại.");
        }
      });
    } catch (error) {
      toast.error("Không thể đăng nhập với Google. Vui lòng thử lại.");
    }
  };

  const handleGoogleCallback = async (response) => {
    try {
      const { credential } = response;

      if (!credential) {
        toast.error("Không thể lấy thông tin từ Google.");
        return;
      }

      // Call backend API with Google ID token
      const res = await loginWithGoogle({
        idToken: credential,
      }).unwrap();

      const raw = res?.data ?? res;
      const token = raw?.accessToken || raw?.token;

      if (token) {
        const safePayload = {
          ...raw,
          accessToken: token,
          expiresAtUtc: ensureExpiry(token, raw?.expiresAtUtc, raw?.expiresIn),
          remember: true, // Google login always remember
        };
        dispatch(setCredentials(safePayload));
        toast.success("Đăng nhập Google thành công!");

        // Fetch role using /User/me then redirect
        try {
          const me = await triggerGetMe().unwrap();
          const role = me?.roleName || me?.role;
          if (role === "restaurant owner") {
            navigate("/restaurant/profile", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        } catch (e) {
          navigate("/", { replace: true });
        }
      } else {
        toast.error(res?.message || "Đăng nhập Google thất bại");
      }
    } catch (err) {
      const msg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Đăng nhập Google thất bại";
      console.error("Google login error:", err);
      toast.error(msg);
    }
  };

  return (
    <>
      <InputField
        type="text"
        placeholder="Tên đăng nhập"
        icon={User}
        value={form.username}
        onChange={onChange("username")}
        disabled={isLoading}
      />
      <InputField
        type="email"
        placeholder="Email"
        icon={Mail}
        value={form.email}
        onChange={onChange("email")}
        disabled={isLoading}
      />
      <InputField
        type="text"
        placeholder="Họ và tên"
        icon={User}
        value={form.fullName}
        onChange={onChange("fullName")}
        disabled={isLoading}
      />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Giới tính</label>
          <select
            className="w-full px-3 py-3 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500"
            value={form.gender}
            onChange={onChange("gender")}
            disabled={isLoading}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Ngày sinh</label>
          <input
            type="date"
            className="w-full px-3 py-3 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500"
            value={form.dateOfBirth}
            onChange={onChange("dateOfBirth")}
            max={today}
            disabled={isLoading}
          />
        </div>
      </div>

      <InputField
        type="password"
        placeholder="Mật khẩu"
        icon={Lock}
        value={form.password}
        onChange={onChange("password")}
        disabled={isLoading}
      />

      <AuthButton onClick={handleRegister} disabled={isLoading}>
        {isLoading && (
          <LoadingSpinner inline size="5" color="white" className="border-4" />
        )}
        {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
        <svg
          className="w-4 h-4 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </AuthButton>

      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500">Hoặc tiếp tục với</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <SocialButton 
        icon={FcGoogle} 
        disabled={isLoading || isGoogleLoading}
        onClick={handleGoogleLogin}
      >
        {isGoogleLoading ? "Đang đăng nhập..." : "Google"}
      </SocialButton>

      {/* Hidden div for Google fallback button */}
      <div id="google-signin-button-register" className="hidden"></div>
    </>
  );
}
