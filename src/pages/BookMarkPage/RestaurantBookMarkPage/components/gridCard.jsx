import React from "react";
import { Heart, Star, MapPin, Clock, Award, Zap } from "lucide-react";

const GridCard = ({ r, isFav, onToggleFav }) => {
  return (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-white/60 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
      {r.isPopular && (
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
          <Award size={12} />
          <span>PHỔ BIẾN</span>
        </div>
      )}

      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={r.image}
          alt={r.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMjAwIDE1MEMyMDAgMTcyLjA5MSAyMDIgMTk0IDIwNCAxOTZDMjA2IDE5OCAyMjggMjAwIDI1MCAyMDBDMjc yIDIwMCAyOTQgMTk4IDI5NiAxOTZDMjk4IDE5NCAzMDAgMTcyLjA5MSAzMDAgMTUwQzMwMCAxMjcuOTA5IDI5OCAxMDYgMjk2IDEwNEMyOTQgMTAyIDI3MiAxMDAgMjUwIDEwMEMyMjggMTAwIDIwNiAxMDIgMjA0IDEwNEMyMDIgMTA2IDIwMCAxMjcuOTA5IDIwMCAxNTBaIiBmaWxsPSIjRDFENURCIi8+PC9zdmc+";
          }}
        />

        {r.isOnline && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-2 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>ĐANG MỞ</span>
            </div>
          </div>
        )}

        <button
          onClick={() => onToggleFav(r.id)}
          className="absolute bottom-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg group/heart"
          aria-label={isFav ? "Bỏ lưu" : "Lưu"}
        >
          <Heart
            size={20}
            className={`${isFav ? "text-pink-500 fill-current" : "text-pink-500"} group-hover/heart:scale-110 transition-transform`}
          />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors line-clamp-1">
          {r.name}
        </h3>
        <p className="text-gray-500 text-sm mb-3 font-medium">{r.category}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span className="font-bold text-gray-900">{r.rating}</span>
            </div>
            <span className="text-gray-500 text-sm">({r.reviews})</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <MapPin size={14} />
            <span className="text-sm font-medium">{r.distance}</span>
          </div>
        </div>

        <div className="space-y-2 mb-6 text-gray-600">
          <div className="flex items-center space-x-2">
            <Clock size={14} />
            <span className="text-sm">{r.openTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">💰 {r.priceRange}</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2 rounded-xl font-medium text-lg hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2">
          <span>Đặt bàn ngay</span>
          <Zap size={18} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(GridCard);
