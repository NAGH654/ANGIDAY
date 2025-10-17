import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Search, Heart, Home, Users, Settings, TrendingUp } from "lucide-react";
import CustomerSideBar from "@layout/SideBar";
import useDebouncedValue from "@hooks/useDebouncedValue";
import parseDistance from "@utils/parseDistance";
import CategoryFilter from "./components/categoryFilter";
import SortMenu from "./components/sortMenu";
import ViewToggle from "./components/viewToggle";
import GridCard from "./components/gridCard";
import ListRow from "./components/listRow";
import { useSelector } from "react-redux";
import { BASE_URL } from "@redux/api/baseApi";
import {
  useGetBookmarkedRestaurantsQuery,
  useUnbookmarkRestaurantMutation,
} from "@redux/api/User/userApi";

function RestaurantBookMarkPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebouncedValue(searchQuery, 300);

  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem("bookmark-view") || "grid"
  );
  useEffect(() => localStorage.setItem("bookmark-view", viewMode), [viewMode]);

  const [activeBookmarkType, setActiveBookmarkType] = useState("restaurant");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("popular");

  const accessToken = useSelector((s) => s?.auth?.accessToken);

  // Load bookmarked restaurants from API
  const { data: apiBookmarks } = useGetBookmarkedRestaurantsQuery(undefined, {
    skip: !accessToken,
  });

  const apiRestaurants = useMemo(() => {
    const list = Array.isArray(apiBookmarks) ? apiBookmarks : [];
    return list.map((r) => ({
      id: r.id,
      name: r.name,
      address: r.address || "",
      image:
        r.avatarUrl
          ? `${String(BASE_URL).replace(/\/$/, "")}/${String(r.avatarUrl).replace(/^\/+/, "")}`
          : "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&h=800&fit=crop",
      rating: r.averagePoint ?? 5,
      reviews: r.totalReviews ?? 0,
      distance: r.distance || "",
      category: r.categoryName || "",
      isPopular: Boolean(r.isPopular),
    }));
  }, [apiBookmarks]);

  // Local favorite set mirrors server bookmarks; used for heart state and optimistic removal
  const [favorites, setFavorites] = useState(new Set());
  useEffect(() => {
    setFavorites(new Set(apiRestaurants.map((r) => r.id)));
  }, [apiRestaurants]);

  const [unbookmarkRestaurant] = useUnbookmarkRestaurantMutation();

  const toggleFavorite = useCallback(
    async (id) => {
      if (!accessToken) return;
      // Only allow remove here (page shows bookmarks only)
      setFavorites((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      try {
        await unbookmarkRestaurant(id).unwrap();
      } catch {
        // rollback
        setFavorites((prev) => {
          const next = new Set(prev);
          next.add(id);
          return next;
        });
      }
    },
    [accessToken, unbookmarkRestaurant]
  );

  const filteredRestaurants = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();

    let list = apiRestaurants.filter((r) => {
      const matchesSearch =
        !q || r.name.toLowerCase().includes(q) || (r.category || "").toLowerCase().includes(q);
      const matchesCategory = selectedCategory === "Tất cả" || r.category === selectedCategory;
      return matchesSearch && matchesCategory && favorites.has(r.id);
    });

    switch (sortBy) {
      case "rating":
        list = list.slice().sort((a, b) => b.rating - a.rating);
        break;
      case "distance":
        list = list
          .slice()
          .sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance));
        break;
      case "reviews":
        list = list.slice().sort((a, b) => b.reviews - a.reviews);
        break;
      case "popular":
      default:
        list = list.slice().sort((a, b) => Number(b.isPopular) - Number(a.isPopular));
        break;
    }

    return list;
  }, [debouncedSearch, selectedCategory, sortBy, apiRestaurants, favorites]);

  const CATEGORIES = useMemo(() => {
    const set = new Set(apiRestaurants.map((r) => r.category).filter(Boolean));
    return ["Tất cả", ...Array.from(set)];
  }, [apiRestaurants]);

  const sortLabelMap = {
    popular: "Độ phổ biến",
    rating: "Đánh giá cao",
    distance: "Gần bạn",
    reviews: "Nhiều đánh giá",
  };

  return (
    <div className="">
      {/* Sidebar */}
      <CustomerSideBar
        activeBookmarkType={activeBookmarkType}
        setActiveBookmarkType={setActiveBookmarkType}
      />

      {/* Main */}
      <main className="flex-1 lg:ml-20">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            {/* Row: Title | Search | Sort & Filter & View */}
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-4">
              {/* Title */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-3xl">🍴</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Nhà hàng đã lưu
                  </h2>
                  <p className="text-gray-500 text-xs md:text-sm">
                    Bộ sưu tập ẩm thực yêu thích của bạn
                  </p>
                </div>
              </div>

              {/* Search (same row) */}
              <div className="relative order-last lg:order-none">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm nhà hàng yêu thích..."
                  className="w-full h-11 pl-4 pr-4 bg-white/90 backdrop-blur-sm border-1 border-gray-200/60 rounded-xl text-gray-700 placeholder-gray-400
                             focus:outline-none focus:ring-1 focus:ring-pink-500/20 focus:border-pink-400
                             hover:border-pink-300 transition-all duration-300"
                  aria-label="Tìm kiếm nhà hàng"
                />
                <div className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 gap-2">
                  <CategoryFilter
                    categories={CATEGORIES}
                    selected={selectedCategory}
                    onChange={setSelectedCategory}
                  />
                </div>
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-2 justify-end">
                <div className="md:hidden">
                  <CategoryFilter
                    categories={CATEGORIES}
                    selected={selectedCategory}
                    onChange={setSelectedCategory}
                  />
                </div>
                <SortMenu sortBy={sortBy} setSortBy={setSortBy} />
                <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-1 mb-6">
            <p className="text-xl text-gray-600 font-medium">
              {filteredRestaurants.length} nhà hàng được lưu
            </p>
            <div className="flex items-center gap-2 text-gray-500">
              <TrendingUp size={16} />
              <span className="text-sm">
                Sắp xếp theo {" "}
                <span className="font-medium text-gray-700">{sortLabelMap[sortBy]}</span>
              </span>
            </div>
          </div>

          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredRestaurants.map((r) => (
                <GridCard key={r.id} r={r} isFav={favorites.has(r.id)} onToggleFav={toggleFavorite} />
              ))}
            </div>
          )}

          {viewMode === "list" && (
            <div className="space-y-6">
              {filteredRestaurants.map((r) => (
                <ListRow key={r.id} r={r} isFav={favorites.has(r.id)} onToggleFav={toggleFavorite} />
              ))}
            </div>
          )}

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search size={48} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy nhà hàng</h3>
              <p className="text-gray-500 max-w-md mx-auto">Thử tìm kiếm với từ khoá khác hoặc đặt lại bộ lọc về “Tất cả”.</p>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Nav (giữ nguyên demo) */}
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
