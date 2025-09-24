import React, { useState } from "react";
import {
  Heart,
  Home,
  Users,
  Settings,
  Search,
  Star,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { categories, restaurants } from "./data";
import { Link } from "react-router-dom";
import { endPoint } from "@routes/router";

const FoodHomepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [restaurantList, setRestaurantList] = useState(restaurants);

  const toggleFavorite = (id) => {
    setRestaurantList((prev) =>
      prev.map((restaurant) =>
        restaurant.id === id
          ? { ...restaurant, isFavorite: !restaurant.isFavorite }
          : restaurant
      )
    );
  };

  const filteredRestaurants = restaurantList.filter((restaurant) => {
    const matchesCategory =
      activeCategory === "Tất cả" || restaurant.category === activeCategory;
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-20 bg-white shadow-lg fixed left-0 top-0 h-full z-50">
        <div className="flex flex-col items-center py-4 space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <span className="text-white text-4xl font-bold">F</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col space-y-6">
            <a
              href="#"
              className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <Home size={20} className="text-white" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors group"
            >
              <Heart
                size={20}
                className="text-gray-600 group-hover:text-pink-500"
              />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors group"
            >
              <Users
                size={20}
                className="text-gray-600 group-hover:text-blue-500"
              />
            </a>
          </nav>

          {/* Settings */}
          <div className="flex flex-col space-y-6 mt-auto">
            <a
              href="#"
              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Settings size={20} className="text-gray-600" />
            </a>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-20">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-2xl relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm địa điểm ăn uống..."
                className="w-full h-10 pl-12 pr-6 bg-gray-50 border border-gray-200 rounded-md text-gray-700 
        focus:outline-none hover:border-pink-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 
        transition-all"
              />
            </div>

            {/* Login / Register */}
            <div className="flex items-center space-x-2 ml-6">
              <Link
                to={endPoint.LOGIN}
                className="h-8.5 px-3.5 flex items-center justify-center rounded-lg border border-pink-500 text-pink-500 font-medium 
      hover:bg-pink-50 hover:scale-105 active:scale-95 
      transition-all duration-200 ease-out"
              >
                Đăng nhập
              </Link>

              <Link
                to={endPoint.REGISTER}
                className="h-8.5 px-4 flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium 
      shadow hover:shadow-lg hover:scale-105 active:scale-95 
      transition-all duration-200 ease-out"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </header>

        {/* Categories */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex space-x-2  ">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`flex items-center space-x-2 px-4 py-2 shadow-sm hover:shadow-md hover:scale-[1.01] rounded-2xl whitespace-nowrap font-medium transition-all duration-200 ease-out ${
                    activeCategory === category.name
                      ? "bg-gradient-to-br from-pink-500 via-pink-400 to-pink-500 text-white "
                      : "bg-gray-100 text-gray-700 hover:bg-pink-100 "
                  }`}
                >
                  <span className="text-sm">{category.icon}</span>
                  <span className="text-sm">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Restaurants */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Khám phá địa điểm ăn uống
          </h2>
          <p className="text-gray-600 mb-8">
            {filteredRestaurants.length} kết quả được tìm thấy
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Online */}
                  {restaurant.isOnline && (
                    <div className="absolute top-3 left-3 w-3 h-3 bg-green-500 rounded-full shadow-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                    </div>
                  )}

                  {/* Favorite */}
                  <button
                    onClick={() => toggleFavorite(restaurant.id)}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm"
                  >
                    <Heart
                      size={16}
                      className={
                        restaurant.isFavorite
                          ? "text-pink-500 fill-current"
                          : "text-gray-600"
                      }
                    />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {restaurant.name}
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
                    <MapPin size={14} />
                    <span className="text-sm">{restaurant.address}</span>
                  </div>

                  <div className="text-xs text-gray-400 border-t border-gray-100 pt-3">
                    © 2025 AnGiDay. Khám phá ẩm thực Việt Nam.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center">
          <MessageCircle size={24} />
        </button>
      </div>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50">
        <div className="flex justify-around">
          <a
            href="#"
            className="flex flex-col items-center space-y-1 text-gray-900"
          >
            <Home size={20} />
            <span className="text-xs">Trang chủ</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center space-y-1 text-gray-500"
          >
            <Heart size={20} />
            <span className="text-xs">Yêu thích</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center space-y-1 text-gray-500"
          >
            <Users size={20} />
            <span className="text-xs">Cộng đồng</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center space-y-1 text-gray-500"
          >
            <Settings size={20} />
            <span className="text-xs">Cài đặt</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FoodHomepage;
