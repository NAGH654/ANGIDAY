import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { endPoint } from "@routes/router";
import { useLoginWithUsernameMutation } from "@redux/api/authApi";
import { setCredentials } from "@redux/features/authSlice";
import LoadingSpinner from "@components/LoadingSpinner";

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

const SocialButton = ({ icon: Icon, children, className = "", disabled }) => (
  <button
    type="button"
    disabled={disabled}
    className={`w-1/2 flex items-center justify-center py-2.5 border border-gray-300 rounded-lg 
                text-sm font-semibold text-gray-700 bg-white
                hover:bg-gray-50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] 
                transition-all duration-300 disabled:opacity-60 ${className}`}
  >
    {Icon && <Icon className="mr-2" size={18} />}
    {children}
  </button>
);

const AuthButton = ({ children, disabled }) => (
  <button
    type="submit"
    disabled={disabled}
    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-lg 
               flex items-center justify-center gap-2 shadow-lg hover:brightness-90 
               hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] 
               transition-all duration-300 ease-out disabled:opacity-60"
  >
    {children}
  </button>
);

// === NEW: make safe expiry no matter backend ===
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

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginWithUsernameMutation();

  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      toast.warn("Vui lòng nhập đủ tên đăng nhập và mật khẩu");
      return;
    }
    try {
      const res = await login({
        username: form.username.trim(),
        password: form.password,
      }).unwrap();

      const raw = res?.data ?? res;
      const token = raw?.accessToken || raw?.token;

      if (token) {
        const safePayload = {
          ...raw,
          accessToken: token,
          // cố định hạn dùng “hợp lệ”
          expiresAtUtc: ensureExpiry(token, raw?.expiresAtUtc, raw?.expiresIn),
          remember: form.remember,
        };
        dispatch(setCredentials(safePayload));
        toast.success("Đăng nhập thành công!");
        navigate("/", { replace: true });
      } else {
        toast.error(res?.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      const msg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Đăng nhập thất bại";
      console.error("Login error:", err);
      toast.error(msg);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Tên đăng nhập"
          icon={User}
          value={form.username}
          onChange={(e) => setForm((s) => ({ ...s, username: e.target.value }))}
          disabled={isLoading}
        />
        <InputField
          type="password"
          placeholder="Mật khẩu"
          icon={Lock}
          value={form.password}
          onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
          disabled={isLoading}
        />

        <div className="flex items-center justify-between mb-6 text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) =>
                setForm((s) => ({ ...s, remember: e.target.checked }))
              }
              disabled={isLoading}
              className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
            />
            <span className="ml-2 text-gray-600">Ghi nhớ đăng nhập</span>
          </label>
          <Link
            to={endPoint.FORGOTPASSWORD}
            className="text-pink-500 font-medium hover:text-pink-600 hover:brightness-75 hover:underline transition-colors"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <AuthButton disabled={isLoading}>
          {isLoading && (
            <LoadingSpinner
              inline
              size="5"
              color="white"
              className="border-4"
            />
          )}
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
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
      </form>

      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500">Hoặc tiếp tục với</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="flex gap-4">
        <SocialButton icon={FcGoogle} disabled={isLoading}>
          Google
        </SocialButton>
        <SocialButton
          icon={() => <FaFacebook className="w-5 h-5 mr-2 text-blue-600" />}
          className="text-blue-600 hover:bg-blue-50"
          disabled={isLoading}
        >
          Facebook
        </SocialButton>
      </div>
    </>
  );
};

export default LoginPage;
