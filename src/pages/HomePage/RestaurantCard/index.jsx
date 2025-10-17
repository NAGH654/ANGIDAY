// RestaurantCard.jsx
import React from "react";
import { Heart, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { endPoint } from "@routes/router";

const RestaurantCard = ({ restaurant, onToggleFavorite, isBookmarked }) => {
  const detailTo = {
    pathname: endPoint.RESTAURANT_DETAIL(restaurant.id),
    state: { restaurant }, // ⬅️ mang theo data, CardDetailPage có thể dùng luôn
  };

  const handleFav = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleFavorite?.(restaurant.id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden">
      <div className="relative">
        {/* Ảnh: bấm vào sẽ sang chi tiết */}
        <Link to={detailTo}>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            loading="lazy"
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {restaurant.isOnline && (
          <div className="absolute top-3 left-3 w-3 h-3 bg-green-500 rounded-full shadow-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
          </div>
        )}

        {/* Favorite: chặn nổi bọt để không điều hướng */}
        <button
          onClick={handleFav}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm"
          aria-label={
            isBookmarked || restaurant.isFavorite ? "Bỏ lưu" : "Lưu nhà hàng"
          }
        >
          <Heart
            size={16}
            className={
              isBookmarked || restaurant.isFavorite
                ? "text-pink-500 fill-current"
                : "text-gray-600"
            }
          />
        </button>
      </div>

      <div className="p-5">
        {/* Tiêu đề: cũng cho click sang chi tiết */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
          <Link to={detailTo}>{restaurant.name}</Link>
        </h3>

        <div className="flex items-center space-x-1 mb-3">
          <Star size={16} className="text-yellow-400 fill-current" />
          <span className="font-medium text-gray-900 text-sm">
            {restaurant.rating}
          </span>
          <span className="text-gray-500 text-sm">
            ({restaurant.reviews} đánh giá)
          </span>
        </div>

        <div className="flex items-center space-x-2 text-gray-500 mb-4">
          <MapPin size={14} aria-hidden />
          <span className="text-sm">{restaurant.address}</span>
        </div>

        <div className="text-xs text-gray-400 border-t border-gray-100 pt-3">
          © 2025 AnGiDay. Khám phá ẩm thực Việt Nam.
        </div>
      </div>
    </div>
  );
};

export default React.memo(RestaurantCard);
