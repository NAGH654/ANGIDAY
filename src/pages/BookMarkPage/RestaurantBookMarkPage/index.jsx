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
  Filter,
  TrendingUp,
  Award,
  Zap
} from "lucide-react";
import CustomerSideBar from "@layout/CustomerSideBar";

function RestaurantBookMarkPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [activeBookmarkType, setActiveBookmarkType] = useState("restaurant");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  // Enhanced restaurant data with real image URLs
  const restaurants = [
    {
      id: 1,
      name: "Bánh Mì Saigon",
      category: "Bánh mì",
      rating: 4.5,
      reviews: 1234,
      distance: "0.5 km",
      address: "123 Nguyễn Huệ, Q1",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
      isOnline: true,
      openTime: "06:00 - 22:00",
      priceRange: "20.000 - 40.000đ",
      isPopular: true
    },
    {
      id: 2,
      name: "BBQ House",
      category: "Nướng BBQ",
      rating: 4.3,
      reviews: 856,
      distance: "1.2 km",
      address: "456 Lê Lợi, Q1",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center",
      isOnline: false,
      openTime: "17:00 - 23:00",
      priceRange: "150.000 - 300.000đ",
      isPopular: false
    },
    {
      id: 3,
      name: "Bún Bò Huế Cô Na",
      category: "Bún bò Huế",
      rating: 4.7,
      reviews: 2341,
      distance: "0.8 km",
      address: "789 Pasteur, Q3",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&crop=center",
      isOnline: true,
      openTime: "07:00 - 15:00",
      priceRange: "35.000 - 55.000đ",
      isPopular: true
    },
    {
      id: 4,
      name: "Cafe Milano",
      category: "Cafe",
      rating: 4.4,
      reviews: 567,
      distance: "2.1 km",
      address: "321 Dong Khoi, Q1",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&crop=center",
      isOnline: true,
      openTime: "08:00 - 23:00",
      priceRange: "25.000 - 80.000đ",
      isPopular: false
    },
    {
      id: 5,
      name: "Phở Hà Nội 24h",
      category: "Phở",
      rating: 4.2,
      reviews: 1876,
      distance: "1.5 km",
      address: "654 Calmette, Q1",
      image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop&crop=center",
      isOnline: true,
      openTime: "24/7",
      priceRange: "45.000 - 65.000đ",
      isPopular: false
    },
    {
      id: 6,
      name: "Pizza Corner",
      category: "Pizza",
      rating: 4.6,
      reviews: 943,
      distance: "0.7 km",
      address: "987 Hai Bà Trưng, Q3",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
      isOnline: false,
      openTime: "11:00 - 22:00",
      priceRange: "120.000 - 250.000đ",
      isPopular: true
    },
    {
      id: 7,
      name: "Sushi Sakana",
      category: "Sushi",
      rating: 4.8,
      reviews: 432,
      distance: "3.2 km",
      address: "147 Nguyễn Thị Minh Khai, Q1",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&crop=center",
      isOnline: true,
      openTime: "18:00 - 24:00",
      priceRange: "200.000 - 500.000đ",
      isPopular: true
    },
    {
      id: 8,
      name: "Thai Garden",
      category: "Thai",
      rating: 4.1,
      reviews: 678,
      distance: "2.8 km",
      address: "258 Võ Văn Tần, Q3",
      image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400&h=300&fit=crop&crop=center",
      isOnline: true,
      openTime: "11:00 - 21:30",
      priceRange: "80.000 - 180.000đ",
      isPopular: false
    },
  ];

  const categories = ["Tất cả", "Bánh mì", "Phở", "BBQ", "Cafe", "Pizza", "Sushi", "Thai"];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tất cả" || restaurant.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 min-h-screen flex">
      {/* Sidebar */}
      <CustomerSideBar
        activeBookmarkType={activeBookmarkType}
        setActiveBookmarkType={setActiveBookmarkType}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-20">
        {/* Enhanced Header */}
        <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-3xl">🍴</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Nhà hàng đã lưu
                  </h1>
                  <p className="text-gray-500 text-lg">
                    Bộ sưu tập ẩm thực yêu thích của bạn
                  </p>
                </div>
              </div>

              {/* View Toggle with enhanced styling */}
              <div className="flex items-center space-x-3 bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white shadow-lg text-pink-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white shadow-lg text-pink-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="w-5 h-1 bg-current rounded-full"></div>
                    <div className="w-5 h-1 bg-current rounded-full"></div>
                    <div className="w-5 h-1 bg-current rounded-full"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Enhanced Search */}
            <div className="relative mb-6">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                size={22}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm nhà hàng yêu thích..."
                className="w-full h-14 pl-14 pr-6 bg-white/80 backdrop-blur-sm border-2 border-gray-200/60 rounded-2xl text-gray-700 placeholder-gray-400 text-lg
                focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-400 focus:bg-white/90
                hover:border-pink-300 hover:bg-white/70 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-2xl whitespace-nowrap font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                      : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-xl text-gray-600 font-medium">
              {filteredRestaurants.length} nhà hàng được lưu
            </p>
            <div className="flex items-center space-x-2 text-gray-500">
              <TrendingUp size={16} />
              <span className="text-sm">Sắp xếp theo độ phổ biến</span>
            </div>
          </div>

          {/* Enhanced Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Popular Badge */}
                  {restaurant.isPopular && (
                    <div className="absolute top-4 left-4 z-10 flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      <Award size={12} />
                      <span>PHỔ BIẾN</span>
                    </div>
                  )}

                  <div className="relative overflow-hidden rounded-t-3xl">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwMCAxNzIuMDkxIDIwMiAxOTQgMjA0IDE5NkMyMDYgMTk4IDIyOCAyMDAgMjUwIDIwMEMyNzIgMjAwIDI5NCAxOTggMjk2IDE5NkMyOTggMTk0IDMwMCAxNzIuMDkxIDMwMCAxNTBDMzAwIDEyNy45MDkgMjk4IDEwNiAyOTYgMTA0QzI5NCAxMDIgMjcyIDEwMCAyNTAgMTAwQzIyOCAxMDAgMjA2IDEwMiAyMDQgMTA0QzIwMiAxMDYgMjAwIDEyNy45MDkgMjAwIDE1MFoiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+';
                      }}
                    />

                    {/* Online Status */}
                    {restaurant.isOnline && (
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center space-x-2 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <span>ĐANG MỞ</span>
                        </div>
                      </div>
                    )}

                    {/* Heart Button */}
                    <button className="absolute bottom-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg group/heart">
                      <Heart size={20} className="text-pink-500 fill-current group-hover/heart:scale-110 transition-transform" />
                    </button>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-1">
                      {restaurant.name}
                    </h3>

                    <p className="text-gray-500 text-sm mb-3 font-medium">
                      {restaurant.category}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star size={16} className="text-yellow-400 fill-current" />
                          <span className="font-bold text-gray-900">{restaurant.rating}</span>
                        </div>
                        <span className="text-gray-500 text-sm">({restaurant.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <MapPin size={14} />
                        <span className="text-sm font-medium">{restaurant.distance}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock size={14} />
                        <span className="text-sm">{restaurant.openTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <span className="text-sm font-medium">💰 {restaurant.priceRange}</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2">
                      <span>Đặt bàn ngay</span>
                      <Zap size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced List View */}
          {viewMode === "list" && (
            <div className="space-y-6">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-8 flex items-center space-x-8">
                    <div className="relative flex-shrink-0">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-32 h-32 object-cover rounded-2xl shadow-lg"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02NCA2NEM2NCA3My43IDY2IDgzIDY4IDg0QzY5IDg1IDc5IDg2IDg5IDg2Qzk5IDg2IDEwOSA4NSAxMTAgODRDMTEyIDgzIDExNCA3My43IDExNCA2NEMxMTQgNTQuMyAxMTIgNDQgMTEwIDQzQzEwOSA0MiA5OSA0MSA4OSA0MUM3OSA0MSA2OSA0MiA2OCA0M0M2NiA0NCA2NCA1NC4zIDY0IDY0WiIgZmlsbD0iI0QxRDVEQiIvPgo8L3N2Zz4=';
                        }}
                      />
                      {restaurant.isOnline && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-lg">
                          <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                              {restaurant.name}
                            </h3>
                            {restaurant.isPopular && (
                              <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                                <Award size={12} />
                                <span>HOT</span>
                              </div>
                            )}
                          </div>
                          <p className="text-gray-500 text-lg mb-3">{restaurant.category}</p>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Star size={16} className="text-yellow-400 fill-current" />
                              <span className="font-bold text-gray-900 text-base">{restaurant.rating}</span>
                              <span>({restaurant.reviews} đánh giá)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin size={16} />
                              <span>{restaurant.distance}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock size={16} />
                              <span>{restaurant.openTime}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span>💰</span>
                              <span>{restaurant.priceRange}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mt-3 font-medium">{restaurant.address}</p>
                        </div>

                        <div className="flex items-center space-x-4 ml-8">
                          <button className="w-12 h-12 bg-pink-100 hover:bg-pink-200 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110">
                            <Heart size={20} className="text-pink-500 fill-current" />
                          </button>
                          <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                            <span>Đặt bàn</span>
                            <Zap size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search size={48} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Không tìm thấy nhà hàng
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Thử tìm kiếm với từ khóa khác hoặc xem tất cả nhà hàng đã lưu
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/60 px-6 py-4 z-50">
        <div className="flex justify-around">
          <a href="#" className="flex flex-col items-center space-y-1 text-gray-500 transition-colors hover:text-gray-700">
            <Home size={24} />
            <span className="text-xs font-medium">Trang chủ</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 text-pink-500">
            <Heart size={24} className="fill-current" />
            <span className="text-xs font-medium">Yêu thích</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 text-gray-500 transition-colors hover:text-gray-700">
            <Users size={24} />
            <span className="text-xs font-medium">Cộng đồng</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 text-gray-500 transition-colors hover:text-gray-700">
            <Settings size={24} />
            <span className="text-xs font-medium">Cài đặt</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RestaurantBookMarkPage;