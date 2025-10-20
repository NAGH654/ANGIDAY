import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Building2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useRegisterRestaurantMutation } from "@redux/api/Auth/authApi";
import { endPoint } from "@routes/router";

const RestaurantRegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [registerRestaurant] = useRegisterRestaurantMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      
      const res = await registerRestaurant({
        username: data.username,
        email: data.email,
        password: data.password,
        restaurantName: data.restaurantName,
        address: data.address,
        description: data.description,
      }).unwrap();

      const raw = res?.data ?? res;
      const token = raw?.accessToken || raw?.token;

      if (token) {
        const safePayload = {
          ...raw,
          accessToken: token,
          expiresAtUtc: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          remember: true,
        };
        
        // Store credentials in localStorage
        localStorage.setItem("auth", JSON.stringify(safePayload));
        
        toast.success("Đăng ký nhà hàng thành công!");
        navigate("/restaurant/profile", { replace: true });
      } else {
        toast.error(res?.message || "Đăng ký thất bại");
      }
    } catch (err) {
      const msg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Đăng ký thất bại";
      console.error("Restaurant register error:", err);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đăng ký nhà hàng
          </h1>
          <p className="text-gray-600">
            Tạo tài khoản để quản lý nhà hàng của bạn
          </p>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link
            to={endPoint.LOGIN}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại đăng nhập
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên đăng nhập *
            </label>
            <input
              {...register("username", {
                required: "Tên đăng nhập là bắt buộc",
                minLength: {
                  value: 3,
                  message: "Tên đăng nhập phải có ít nhất 3 ký tự",
                },
              })}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              placeholder="Nhập tên đăng nhập"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              placeholder="Nhập email"
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
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                })}
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                placeholder="Nhập mật khẩu"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                minLength: {
                  value: 2,
                  message: "Tên nhà hàng phải có ít nhất 2 ký tự",
                },
              })}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              placeholder="Nhập tên nhà hàng"
            />
            {errors.restaurantName && (
              <p className="mt-1 text-sm text-red-600">{errors.restaurantName.message}</p>
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
                minLength: {
                  value: 5,
                  message: "Địa chỉ phải có ít nhất 5 ký tự",
                },
              })}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              placeholder="Nhập địa chỉ nhà hàng"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả nhà hàng
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Mô tả về nhà hàng của bạn..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Đang đăng ký..." : "Đăng ký nhà hàng"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              to={endPoint.LOGIN}
              className="text-pink-600 hover:text-pink-700 font-medium"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantRegisterPage;
