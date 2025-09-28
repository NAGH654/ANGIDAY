import React, { useCallback, useMemo, useState } from "react";
import { Heart, Home, Users, Settings, MessageCircle } from "lucide-react";
import { categories, restaurants } from "../../assets/data";
import CustomerSideBar from "@layout/SideBar";
import CategoryTabs from "./CategoryTabs";
import RestaurantCard from "./RestaurantCard";
import useDebouncedValue from "@hooks/useDebouncedValue";

const FoodHomepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebouncedValue(searchQuery, 250);

  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [restaurantList, setRestaurantList] = useState(restaurants);

  // handler ổn định để con không re-render lại
  const toggleFavorite = useCallback((id) => {
    setRestaurantList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
    );
  }, []);

  // filter tối ưu bằng useMemo + debounce
  const filteredRestaurants = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return restaurantList.filter((r) => {
      const matchesCategory =
        activeCategory === "Tất cả" || r.category === activeCategory;
      const matchesSearch = !q || r.name.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [restaurantList, activeCategory, debouncedSearch]);

  return (
    <div className="">
      {/* Sidebar - Desktop */}
      <CustomerSideBar />

      {/* Main */}
      <main className="flex-1 lg:ml-20">
        {/* Categories (đã tách) */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

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
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Floating Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
          aria-label="Mở chat"
        >
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
