import React from "react";
import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { endPoint } from "@routes/router";

const MenuSection = ({ restaurant, items }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Món ăn nổi bật</h2>
        <Link
          to={endPoint.RESTAURANT_MENU(restaurant.id)}
          state={{ restaurant }}
          className="text-pink-600 hover:text-pink-700 font-medium"
        >
          Xem menu đầy đủ →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              {item.isPopular && (
                <span className="absolute top-3 left-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Phổ biến
                </span>
              )}
              <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                <Heart size={16} className="text-gray-600" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-pink-600">{item.price}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                  <span className="text-sm text-gray-500">({item.reviews})</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(MenuSection);
