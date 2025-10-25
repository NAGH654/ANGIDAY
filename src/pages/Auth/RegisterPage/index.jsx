import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@redux/api/Auth/authApi";
import { toast } from "react-toastify";
import { endPoint } from "@routes/router";
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

const SocialButton = ({ children, icon: Icon, className, disabled }) => (
  <button
    type="button"
    disabled={disabled}
    className={`w-1/2 flex items-center justify-center py-2.5 border border-gray-300 rounded-lg 
                text-sm font-semibold text-gray-700 bg-white 
                hover:bg-gray-50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] 
                transition-all duration-300 disabled:opacity-60 ${className}`}
  >
    {Icon && <Icon className="w-5 h-5 mr-2" />}
    {children}
  </button>
);

const today = new Date().toISOString().slice(0, 10);

export default function RegisterPage() {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

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
        // BE đã gửi email xác thực tự động → chỉ chuyển sang trang hướng dẫn
        navigate(endPoint.PLEASE_VERIFY(), { replace: true });
      } else {
        toast.error(res?.message || "Đăng ký thất bại");
      }
    } catch (err) {
      const msg = err?.data?.message || "Đăng ký thất bại";
      toast.error(msg);
      console.error("Register error:", err);
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
}
