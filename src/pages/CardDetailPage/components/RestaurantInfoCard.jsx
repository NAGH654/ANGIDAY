import React, { useState } from "react";
import { MapPin, Phone, Clock, Globe, Star } from "lucide-react";

const RestaurantInfoCard = ({ restaurant }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-start space-x-4 mb-6">
        <img
          src={restaurant.thumbnail}
          alt={restaurant.name}
          className="w-20 h-20 rounded-xl object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
            {restaurant.verified && (
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">
              {restaurant.status}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-bold">{restaurant.rating}</span>
              <span className="text-gray-500">({restaurant.totalReviews} đánh giá)</span>
            </div>
            <span className="text-gray-300">|</span>
            <span>
              <strong>{restaurant.followers}</strong> người theo dõi
            </span>
            <span className="text-gray-300">|</span>
            <span>
              <strong>{restaurant.posts}</strong> bài viết
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">
        {restaurant.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700">{restaurant.address}</span>
        </div>
        <div className="flex items-start space-x-2">
          <Phone className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700">{restaurant.phone}</span>
        </div>
        <div className="flex items-start space-x-2">
          <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700">{restaurant.openTime}</span>
        </div>
        <div className="flex items-start space-x-2">
          <Globe className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700">{restaurant.website}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
          Gọi ngay
        </button>
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
          Xem bản đồ
        </button>
        <button
          onClick={() => setIsFollowing((s) => !s)}
          className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
            isFollowing ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-pink-100 text-pink-600 hover:bg-pink-200"
          }`}
        >
          {isFollowing ? "Đang theo dõi" : "Theo dõi"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(RestaurantInfoCard);
