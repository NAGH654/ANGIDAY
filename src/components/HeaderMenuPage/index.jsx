import React from "react";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";

/**
 * Header cố định cho trang Menu:
 * - Back
 * - Tiêu đề + subtitle
 * - Nút "Thêm món"
 * - Ô tìm kiếm + nút filter
 */
function HeaderMenuPage({
  title = "Menu",
  subtitle = "",
  searchValue = "",
  onSearchChange,
  onBack,
  onAdd,
  onFilter,
}) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>

          {/* <button
            onClick={onAdd}
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Thêm món
          </button> */}
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Tìm món ăn..."
              className="w-full h-10 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={onFilter}
            className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(HeaderMenuPage);
