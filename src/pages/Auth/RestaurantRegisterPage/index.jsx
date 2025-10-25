import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  MapPin,
  FileText,
} from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterRestaurantMutation } from "@redux/api/Auth/authApi"; // <-- chỉ còn registerRestaurant
import { setCredentials } from "@redux/features/authSlice";
import { endPoint } from "@routes/router";
import LoadingSpinner from "@components/LoadingSpinner";

/* ========== helpers ========== */
// đồng bộ với LoginPage / RegisterPage
function ensureExpiry(tok, expUtc, expiresInSec) {
  const NOW = Date.now();
  if (expUtc) {
    const t = new Date(expUtc).getTime();
    if (Number.isFinite(t) && t > NOW + 30_000)
      return new Date(t).toISOString();
  }
  if (Number.isFinite(expiresInSec) && expiresInSec > 30) {
    return new Date(NOW + expiresInSec * 1000).toISOString();
  }
  try {
    const [, payload] = String(tok || "").split(".");
    const obj = JSON.parse(atob(payload));
    const ms = Number(obj?.exp) * 1000;
    if (Number.isFinite(ms) && ms > NOW + 30_000)
      return new Date(ms).toISOString();
  } catch {}
  return new Date(NOW + 60 * 60 * 1000).toISOString(); // fallback 60 phút
}

/* ========== shared UI (đồng bộ với RegisterPage) ========== */
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

const TextAreaField = ({
  placeholder,
  icon: Icon,
  value,
  onChange,
  disabled,
  rows = 4,
}) => (
  <div className="mb-4 relative">
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-10 py-3 text-sm text-gray-700 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-1 focus:ring-pink-500 
                 hover:border-pink-400 hover:shadow-md hover:shadow-pink-100
                 transition-all duration-300 disabled:opacity-60 resize-none"
    />
    {Icon && <Icon className="absolute left-3 top-3 text-gray-400" size={18} />}
  </div>
);

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

/* ========== page ========== */
export default function RestaurantRegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerRestaurant, { isLoading }] = useRegisterRestaurantMutation();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    restaurantName: "",
    address: "",
    description: "",
  });

  const onChange = (k) => (e) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.restaurantName ||
      !form.address
    ) {
      toast.warn(
        "Vui lòng điền đủ: Tên đăng nhập, Email, Mật khẩu, Tên nhà hàng, Địa chỉ"
      );
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
        restaurantName: form.restaurantName.trim(),
        address: form.address.trim(),
        description: form.description.trim(),
      };

      const res = await registerRestaurant(payload).unwrap();
      const raw = res?.data ?? res;
      const token = raw?.accessToken || raw?.token;
      const emailVerified =
        raw?.emailVerified ??
        raw?.data?.emailVerified ??
        raw?.user?.emailVerified ??
        false;

      if (!token) {
        toast.error(res?.message || "Đăng ký thất bại");
        return;
      }

      // Lưu phiên (nếu BE đã trả token)
      dispatch(
        setCredentials({
          ...raw,
          accessToken: token,
          expiresAtUtc: ensureExpiry(token, raw?.expiresAtUtc, raw?.expiresIn),
          remember: true,
        })
      );

      if (!emailVerified) {
        // KHÔNG gọi POST gửi email nữa (BE đã tự gửi) → chỉ điều hướng
        toast.success(
          "Đăng ký thành công! Vui lòng kiểm tra email để xác thực."
        );
        navigate(endPoint.PLEASE_VERIFY(), { replace: true });
        return;
      }

      toast.success("Đăng ký nhà hàng thành công!");
      navigate("/restaurant/profile", { replace: true });
    } catch (err) {
      const msg =
        err?.data?.message || err?.error || err?.message || "Đăng ký thất bại";
      console.error("Restaurant register error:", err);
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
        type="password"
        placeholder="Mật khẩu"
        icon={Lock}
        value={form.password}
        onChange={onChange("password")}
        disabled={isLoading}
      />

      <InputField
        type="text"
        placeholder="Tên nhà hàng"
        icon={Building2}
        value={form.restaurantName}
        onChange={onChange("restaurantName")}
        disabled={isLoading}
      />

      <InputField
        type="text"
        placeholder="Địa chỉ nhà hàng"
        icon={MapPin}
        value={form.address}
        onChange={onChange("address")}
        disabled={isLoading}
      />

      <TextAreaField
        placeholder="Mô tả về nhà hàng của bạn…"
        icon={FileText}
        value={form.description}
        onChange={onChange("description")}
        disabled={isLoading}
        rows={4}
      />

      <AuthButton onClick={handleRegister} disabled={isLoading}>
        {isLoading && (
          <LoadingSpinner inline size="5" color="white" className="border-4" />
        )}
        {isLoading ? "Đang đăng ký..." : "Đăng ký nhà hàng"}
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
    </>
  );
}
