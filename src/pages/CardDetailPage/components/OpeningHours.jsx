import React from "react";

const OpeningHours = () => {
  const days = ["Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7","Chủ nhật"];
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-4">Giờ mở cửa</h3>
      <div className="space-y-2 text-sm">
        {days.map((day, index) => (
          <div key={day} className="flex justify-between">
            <span className={index === 5 ? "font-semibold text-pink-600" : "text-gray-600"}>
              {day}
            </span>
            <span className={index === 5 ? "font-semibold text-pink-600" : "text-gray-900"}>
              10:00 - 23:00
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(OpeningHours);
