import React from "react";

const ViewToggle = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1">
      <button
        onClick={() => setViewMode("grid")}
        className={`p-1.5 rounded-xl transition-all duration-200 ${
          viewMode === "grid" ? "bg-white shadow-lg text-pink-600" : "text-gray-600 hover:text-gray-800"
        }`}
        aria-pressed={viewMode === "grid"}
        aria-label="Dạng lưới"
      >
        <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
          <div className="bg-current rounded-sm" />
          <div className="bg-current rounded-sm" />
          <div className="bg-current rounded-sm" />
          <div className="bg-current rounded-sm" />
        </div>
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`p-1.5 rounded-xl transition-all duration-200 ${
          viewMode === "list" ? "bg-white shadow-lg text-pink-600" : "text-gray-600 hover:text-gray-800"
        }`}
        aria-pressed={viewMode === "list"}
        aria-label="Dạng danh sách"
      >
        <div className="space-y-1">
          <div className="w-5 h-1 bg-current rounded-full" />
          <div className="w-5 h-1 bg-current rounded-full" />
          <div className="w-5 h-1 bg-current rounded-full" />
        </div>
      </button>
    </div>
  );
};

export default React.memo(ViewToggle);
