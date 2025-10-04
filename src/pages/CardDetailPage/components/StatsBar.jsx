import React from "react";

const StatsBar = ({ rating, followers }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{rating}</div>
          <div className="text-sm text-gray-500">Đánh giá</div>
        </div>
        <div className="text-center border-l border-gray-200">
          <div className="text-3xl font-bold text-gray-900">đđđ</div>
          <div className="text-sm text-gray-500">Giá cả</div>
        </div>
        <div className="text-center border-l border-gray-200">
          <div className="text-3xl font-bold text-gray-900">{followers}</div>
          <div className="text-sm text-gray-500">Check in</div>
        </div>
        <div className="text-center border-l border-gray-200">
          <div className="text-3xl font-bold text-gray-900">2020</div>
          <div className="text-sm text-gray-500">Thành lập</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StatsBar);
