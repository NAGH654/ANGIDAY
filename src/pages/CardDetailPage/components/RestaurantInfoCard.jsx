import React, { useState } from "react";
import { MapPin, Phone, Clock, Globe, Star } from "lucide-react";

const RestaurantInfoCard = ({ restaurant }) => {
  const [imageError, setImageError] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState(restaurant.image);
  
  const handleImageError = () => {
    if (!imageError) {
      // Fallback to Unsplash placeholder
      const fallbackImage = "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=80&h=80&fit=crop&auto=format";
      setCurrentImageSrc(fallbackImage);
      setImageError(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-start space-x-4 mb-6">
        <img
          src={currentImageSrc}
          alt={restaurant.name}
          className="w-20 h-20 rounded-xl object-cover"
          onError={handleImageError}
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
              <strong>{restaurant.postsCount || 0}</strong> bài viết
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
          <span className="text-gray-700">{restaurant.phone || "Chưa cập nhật"}</span>
        </div>
        <div className="flex items-start space-x-2">
          <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700">{restaurant.openTime || "Chưa cập nhật"}</span>
        </div>
        <div className="flex items-start space-x-2">
          <Globe className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700">{restaurant.website || "Chưa cập nhật"}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RestaurantInfoCard);
