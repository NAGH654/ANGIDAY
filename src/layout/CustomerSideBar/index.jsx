import React, { useState } from "react";
import { Heart, Home, Users, Plus } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom"; // 👈 thêm useLocation
import { endPoint } from "@routes/router";

const CustomerSideBar = () => {
  const [showHeartDropdown, setShowHeartDropdown] = useState(false);
  const location = useLocation(); // 👈 lấy path hiện tại

  // Kiểm tra nếu đang ở trong route liên quan đến bookmark (restaurant hoặc post)
  const isHeartActive =
    location.pathname === endPoint.RESTAURANT_BOOKMARK ||
    location.pathname === endPoint.POST_BOOKMARK;

  // Kiểm tra nếu đang ở trang Post
  const isPostActive = location.pathname === endPoint.POST;

  return (
    <aside className="hidden lg:block w-20 bg-white shadow-lg fixed left-0 top-0 h-full z-50">
      <div className="flex flex-col items-center py-4 space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div>
            <img
              src="/src/assets/AnGiDay.png"
              alt="AnGiDay Logo"
              className="w-8 h-8 object-contain"
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col space-y-6">
          {/* Home */}
          <NavLink
            to={endPoint.HOMEPAGE}
            className={({ isActive }) =>
              `w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            <Home size={20} />
          </NavLink>

          {/* Community */}
          <NavLink
            to={endPoint.COMMUNITY}
            className={({ isActive }) =>
              `w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            <Users size={20} />
          </NavLink>

          {/* Heart with Dropdown */}
          <div className="relative">
            <NavLink
              to={endPoint.RESTAURANT_BOOKMARK} // default route khi bấm Heart
              className={({ isActive }) =>
                `w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  isHeartActive || isActive
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`
              }
              onClick={(e) => {
                e.preventDefault(); // ❌ chặn chuyển trang ngay
                setShowHeartDropdown(!showHeartDropdown); // mở dropdown thay vì redirect
              }}
            >
              <Heart size={20} />
            </NavLink>

            {showHeartDropdown && (
              <div className="absolute left-16 top-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-56 z-60">
                <NavLink
                  to={endPoint.RESTAURANT_BOOKMARK}
                  onClick={() => setShowHeartDropdown(false)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <span>🍴</span>
                  <span>Nhà hàng đã lưu</span>
                </NavLink>
                <NavLink
                  to={endPoint.POST_BOOKMARK}
                  onClick={() => setShowHeartDropdown(false)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <span>📝</span>
                  <span>Bài viết đã lưu</span>
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        {/* Plus → PostPage */}
        <div className="flex flex-col space-y-6 mt-auto">
          <NavLink
            to={endPoint.POST}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              isPostActive
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Plus size={20} />
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default CustomerSideBar;
