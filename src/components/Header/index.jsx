import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { endPoint } from "@routes/router";
/**
 * Props:
 * - searchQuery: string
 * - onSearchChange: (val: string) => void
 * - loginPath: string
 * - registerPath: string
 * - isAuthenticated?: boolean
 * - user?: {
 *     name: string;
 *     email?: string;
 *     status?: string;          // vd: "Đang hoạt động"
 *     isPremium?: boolean;      // hiển thị badge PRO
 *     notifications?: number;   // số thông báo
 *     avatar?: string;          // text/initials cho avatar tròn
 *   }
 * - menuItems?: Array<{
 *     id: string;
 *     label: string;
 *     description?: string;
 *     icon?: React.ReactNode;
 *     badge?: string;
 *     danger?: boolean;
 *     onClick?: () => void;
 *   }>
 */

const FoodHeader = ({
  searchQuery,
  onSearchChange,
  loginPath,
  registerPath,
  isAuthenticated = false,
  user = {
    name: "Người dùng",
    email: "user@example.com",
    status: "Đang hoạt động",
    isPremium: false,
    notifications: 0,
    avatar: "U",
  },
  menuItems = [],
}) => {
  // ===== User dropdown =====
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((v) => !v);
    // tạo tick để áp lớp transition (scale/opacity)
    requestAnimationFrame(() => setIsAnimating(true));
  }, []);

  // đóng khi click ra ngoài / nhấn ESC
  useEffect(() => {
    if (!isDropdownOpen) return;
    const onClick = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) {
        setIsAnimating(false);
        setIsDropdownOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsAnimating(false);
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isDropdownOpen]);

  // default menu nếu không truyền
  const defaultMenu =
    menuItems.length > 0
      ? menuItems
      : [
          {
            id: "profile",
            label: "Hồ sơ",
            description: "Xem và chỉnh sửa thông tin cá nhân",
          },
          {
            id: "settings",
            label: "Cài đặt",
            description: "Tuỳ chỉnh tài khoản và thông báo",
          },
          {
            id: "billing",
            label: "Gói & thanh toán",
            description: "Quản lý gói dịch vụ của bạn",
            badge: user.isPremium ? "PRO" : undefined,
          },
          {
            id: "logout",
            label: "Đăng xuất",
            description: "Thoát tài khoản an toàn",
            danger: true,
            onClick: () => {
              // bạn gắn handler thật tại đây
              console.log("Logout clicked");
            },
          },
        ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur shadow-sm border-b border-gray-100">
      <div className=" mx-auto px-6 sm:pl-45 sm:pr-20">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Search */}
          <div className="flex-1 max-w-2xl relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
              aria-hidden
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Tìm kiếm địa điểm ăn uống..."
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700
                         focus:outline-none hover:border-pink-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50 
                         transition-all"
              aria-label="Tìm kiếm địa điểm ăn uống"
            />
          </div>

          {/* Right actions */}
          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to={endPoint.LOGIN}
                className="h-9 px-3.5 flex items-center justify-center rounded-lg border border-pink-500 text-pink-600 text-sm font-medium 
                           hover:bg-pink-50 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Đăng nhập
              </Link>
              <Link
                to={endPoint.REGISTER}
                className="h-9 px-4 flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium 
                           shadow hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all"
              >
                Đăng ký
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button
                className="relative p-2 rounded-full hover:bg-gray-100/80 transition-colors duration-200"
                aria-label="Thông báo"
              >
                <Bell size={20} className="text-gray-600" />
                {(user?.notifications ?? 0) > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {user.notifications}
                  </span>
                )}
              </button>

              {/* User Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-3 p-1.5 pr-2 rounded-2xl hover:bg-gray-50/80 transition-all duration-200 group"
                  aria-haspopup="menu"
                  aria-expanded={isDropdownOpen}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-semibold">
                        {user?.avatar ?? "U"}
                      </span>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                  </div>

                  <div className="hidden md:block text-left">
                    <p className="font-semibold text-gray-900 text-sm">
                      {user?.name ?? "Người dùng"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.status ?? "Đang hoạt động"}
                    </p>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-all duration-300 group-hover:text-gray-600 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <>
                    {/* overlay */}
                    <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-40" />

                    <div
                      className={`absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-3xl shadow-2xl py-2 z-50 transform transition-all duration-300 ease-out ${
                        isAnimating
                          ? "scale-100 opacity-100 translate-y-0"
                          : "scale-95 opacity-0 -translate-y-2"
                      }`}
                    >
                      {/* Profile preview */}
                      <div className="relative px-6 py-5 bg-gradient-to-br from-gray-50/80 to-white/60 backdrop-blur-sm mx-2 rounded-2xl mb-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-2xl" />
                        <div className="relative">
                          <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">
                            Đăng nhập bằng tài khoản
                          </p>

                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">
                                  {user?.avatar ?? "U"}
                                </span>
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-gray-900 truncate text-lg">
                                  {user?.name ?? "Người dùng"}
                                </h3>
                                {user?.isPremium && (
                                  <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full">
                                    PRO
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 font-medium">
                                {user?.status ?? "Đang hoạt động"}
                              </p>
                              {user?.email && (
                                <p className="text-sm text-gray-500 truncate">
                                  {user.email}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu */}
                      <div className="px-2">
                        <div className="px-4 py-2 mb-2">
                          <p className="text-sm text-gray-500 font-semibold">
                            Tài khoản của bạn
                          </p>
                        </div>

                        <div className="space-y-1">
                          {defaultMenu.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                item.onClick?.();
                                setIsAnimating(false);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group relative overflow-hidden ${
                                item.danger
                                  ? "text-red-600 hover:bg-red-50/80 hover:text-red-700"
                                  : "text-gray-700 hover:bg-gray-50/80 hover:text-gray-900"
                              }`}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                              <div
                                className={`p-2 rounded-xl transition-all duration-200 ${
                                  item.danger
                                    ? "bg-red-100/60 text-red-500 group-hover:bg-red-200/80"
                                    : "bg-gray-100/60 text-gray-600 group-hover:bg-gray-200/80"
                                }`}
                              >
                                {item.icon ?? (
                                  <span className="w-4 h-4 block" />
                                )}
                              </div>

                              <div className="flex-1 text-left">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className="px-2 py-0.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full animate-pulse">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                {item.description && (
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    {item.description}
                                  </p>
                                )}
                              </div>

                              <ChevronDown
                                size={16}
                                className="text-gray-400 -rotate-90 group-hover:translate-x-1 transition-transform duration-200"
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="px-6 py-3 mt-2 border-t border-gray-100/60">
                        <p className="text-xs text-gray-400 text-center">
                          AnGiDay v2.1.0 • Made with 💖
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default React.memo(FoodHeader);
