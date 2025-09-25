import React, { useState } from "react";
import {
  Search,
  Heart,
  Star,
  MapPin,
  Clock,
  Home,
  Users,
  Settings,
} from "lucide-react";
import CustomerSideBar from "@layout/CustomerSideBar";

function RestaurantBookMarkPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [activeBookmarkType, setActiveBookmarkType] = useState("restaurant");

  // Sample restaurant data
  const restaurants = [
    {
      id: 1,
      name: "Bánh Mì Saigon",
      category: "Bánh mì",
      rating: 4.5,
      reviews: 1234,
      distance: "0.5 km",
      address: "123 Nguyễn Huệ, Q1",
      image: "/api/placeholder/300/200",
      isOnline: true,
      openTime: "06:00 - 22:00",
    },
    {
      id: 2,
      name: "BBQ House",
      category: "Nướng BBQ",
      rating: 4.3,
      reviews: 856,
      distance: "1.2 km",
      address: "456 Lê Lợi, Q1",
      image: "/api/placeholder/300/200",
      isOnline: false,
      openTime: "17:00 - 23:00",
    },
    {
      id: 3,
      name: "Bún Bò Huế Cô Na",
      category: "Bún bò Huế",
      rating: 4.7,
      reviews: 2341,
      distance: "0.8 km",
      address: "789 Pasteur, Q3",
      image: "/api/placeholder/300/200",
      isOnline: true,
      openTime: "07:00 - 15:00",
    },
    {
      id: 4,
      name: "Cafe Milano",
      category: "Cafe",
      rating: 4.4,
      reviews: 567,
      distance: "2.1 km",
      address: "321 Dong Khoi, Q1",
      image: "/api/placeholder/300/200",
      isOnline: true,
      openTime: "08:00 - 23:00",
    },
    {
      id: 5,
      name: "Phở Hà Nội 24h",
      category: "Phở",
      rating: 4.2,
      reviews: 1876,
      distance: "1.5 km",
      address: "654 Calmette, Q1",
      image: "/api/placeholder/300/200",
      isOnline: true,
      openTime: "24/7",
    },
    {
      id: 6,
      name: "Pizza Corner",
      category: "Pizza",
      rating: 4.6,
      reviews: 943,
      distance: "0.7 km",
      address: "987 Hai Bà Trưng, Q3",
      image: "/api/placeholder/300/200",
      isOnline: false,
      openTime: "11:00 - 22:00",
    },
    {
      id: 7,
      name: "Sushi Sakana",
      category: "Sushi",
      rating: 4.8,
      reviews: 432,
      distance: "3.2 km",
      address: "147 Nguyễn Thị Minh Khai, Q1",
      image: "/api/placeholder/300/200",
      isOnline: true,
      openTime: "18:00 - 24:00",
    },
    {
      id: 8,
      name: "Thai Garden",
      category: "Thai",
      rating: 4.1,
      reviews: 678,
      distance: "2.8 km",
      address: "258 Võ Văn Tần, Q3",
      image: "/api/placeholder/300/200",
      isOnline: true,
      openTime: "11:00 - 21:30",
    },
  ];

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <CustomerSideBar
        activeBookmarkType={activeBookmarkType}
        setActiveBookmarkType={setActiveBookmarkType}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-20">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🍴</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Nhà hàng đã lưu
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Lưu danh sách yêu thích
                  </p>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-pink-100 text-pink-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-pink-100 text-pink-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="w-4 h-0.5 bg-current"></div>
                    <div className="w-4 h-0.5 bg-current"></div>
                    <div className="w-4 h-0.5 bg-current"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm nhà hàng đã lưu..."
                className="w-full h-12 pl-12 pr-6 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 
                focus:outline-none hover:border-pink-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
                transition-all"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-gray-600 mb-6">
            {filteredRestaurants.length} nhà hàng đã lưu
          </p>

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

                    {/* Online Status */}
                    {restaurant.isOnline && (
                      <div className="absolute top-3 left-3 w-3 h-3 bg-green-500 rounded-full shadow-sm">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                      </div>
                    )}

                    {/* Heart Button */}
                    <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm">
                      <Heart size={16} className="text-pink-500 fill-current" />
                    </button>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                      {restaurant.name}
                    </h3>

                    <div className="flex items-center space-x-1 mb-3">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-current"
                      />
                      <span className="font-medium text-gray-900 text-sm">
                        {restaurant.rating}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({restaurant.reviews})
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-500 mb-2">
                      <MapPin size={14} />
                      <span className="text-sm">{restaurant.distance}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-500 mb-4">
                      <Clock size={14} />
                      <span className="text-sm">{restaurant.openTime}</span>
                    </div>

                    <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2.5 rounded-xl font-medium hover:shadow-lg transition-all">
                      Đặt bàn ngay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div className="space-y-4">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6 flex items-center space-x-6">
                    <div className="relative flex-shrink-0">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      {restaurant.isOnline && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                          <div className="w-full h-full bg-green-500 rounded-full animate-ping"></div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {restaurant.name}
                          </h3>
                          <p className="text-gray-500 text-sm mb-2">
                            {restaurant.category}
                          </p>

                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <Star
                                size={14}
                                className="text-yellow-400 fill-current"
                              />
                              <span className="font-medium text-gray-900">
                                {restaurant.rating}
                              </span>
                              <span>({restaurant.reviews} đánh giá)</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin size={14} />
                              <span>{restaurant.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{restaurant.openTime}</span>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm">
                            {restaurant.address}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3 ml-6">
                          <button className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors">
                            <Heart
                              size={16}
                              className="text-pink-500 fill-current"
                            />
                          </button>
                          <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                            Đặt bàn
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50">
        <div className="flex justify-around">
          <a
            href="#"
            className="flex flex-col items-center space-y-1 text-gray-500"
          >
            <Home size={20} />
            <span className="text-xs">Trang chủ</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center space-y-1 text-pink-500"
          >
            <Heart size={20} className="fill-current" />
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
}

export default RestaurantBookMarkPage;
