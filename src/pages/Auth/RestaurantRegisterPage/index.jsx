import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useRegisterRestaurantMutation } from "@redux/api/Auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { endPoint } from "@routes/router";

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
  return new Date(NOW + 60 * 60 * 1000).toISOString();
}

export default function RestaurantRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registerRestaurant, { isLoading }] = useRegisterRestaurantMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await registerRestaurant({
        username: data.username?.trim(),
        email: data.email?.trim(),
        password: data.password,
        restaurantName: data.restaurantName?.trim(),
        address: data.address?.trim(),
        description: data.description?.trim(),
      }).unwrap();

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

      // lưu phiên (để nếu cần gọi API khác sau đăng ký)
      dispatch(
        setCredentials({
          ...raw,
          accessToken: token,
          expiresAtUtc: ensureExpiry(token, raw?.expiresAtUtc, raw?.expiresIn),
          remember: true,
        })
      );

      if (!emailVerified) {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* các input giữ nguyên như phiên bản mới nhất của bạn */}
      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tên đăng nhập *
        </label>
        <input
          {...register("username", {
            required: "Tên đăng nhập là bắt buộc",
            minLength: { value: 3, message: "Ít nhất 3 ký tự" },
          })}
          type="text"
          placeholder="Nhập tên đăng nhập"
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white placeholder:text-gray-400
                     focus:outline-none focus:ring-1 focus:ring-pink-500 hover:border-pink-400 hover:shadow-md hover:shadow-pink-100"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          {...register("email", {
            required: "Email là bắt buộc",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email không hợp lệ",
            },
          })}
          type="email"
          placeholder="Nhập email"
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white placeholder:text-gray-400
                     focus:outline-none focus:ring-1 focus:ring-pink-500 hover:border-pink-400 hover:shadow-md hover:shadow-pink-100"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mật khẩu *
        </label>
        <div className="relative">
          <input
            {...register("password", {
              required: "Mật khẩu là bắt buộc",
              minLength: { value: 6, message: "Ít nhất 6 ký tự" },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu"
            disabled={isLoading}
            className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 bg-white placeholder:text-gray-400
                       focus:outline-none focus:ring-1 focus:ring-pink-500 hover:border-pink-400 hover:shadow-md hover:shadow-pink-100"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Restaurant Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tên nhà hàng *
        </label>
        <input
          {...register("restaurantName", {
            required: "Tên nhà hàng là bắt buộc",
            minLength: { value: 2, message: "Ít nhất 2 ký tự" },
          })}
          type="text"
          placeholder="Nhập tên nhà hàng"
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white placeholder:text-gray-400
                     focus:outline-none focus:ring-1 focus:ring-pink-500 hover:border-pink-400 hover:shadow-md hover:shadow-pink-100"
        />
        {errors.restaurantName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.restaurantName.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Địa chỉ *
        </label>
        <input
          {...register("address", {
            required: "Địa chỉ là bắt buộc",
            minLength: { value: 5, message: "Ít nhất 5 ký tự" },
          })}
          type="text"
          placeholder="Nhập địa chỉ nhà hàng"
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white placeholder:text-gray-400
                     focus:outline-none focus:ring-1 focus:ring-pink-500 hover:border-pink-400 hover:shadow-md hover:shadow-pink-100"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Mô tả nhà hàng
        </label>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Mô tả về nhà hàng của bạn..."
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white placeholder:text-gray-400 resize-none
                     focus:outline-none focus:ring-1 focus:ring-pink-500 hover:border-pink-400 hover:shadow-md hover:shadow-pink-100"
        />
      </div>

      {/* Actions */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white
                     bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700
                     focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Đang đăng ký..." : "Đăng ký nhà hàng"}
        </button>
        <p className="mt-3 text-xs text-gray-500 text-center">
          Bằng việc đăng ký, bạn đồng ý với Điều khoản & Chính sách bảo mật.
        </p>
      </div>
    </form>
  );
}
