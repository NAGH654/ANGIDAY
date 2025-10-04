import React from "react";
import { Heart, Share, MapPin } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-4">Hành động nhanh</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center space-x-3 px-4 py-3 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-colors">
          <Heart size={18} />
          <span className="font-medium">Lưu vào yêu thích</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
          <Share size={18} />
          <span className="font-medium">Chia sẻ</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors">
          <MapPin size={18} />
          <span className="font-medium">Chỉ đường</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(QuickActions);
