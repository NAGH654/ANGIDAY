import React, { useCallback, useMemo, useState } from "react";
import { Heart, Home, Users, Settings } from "lucide-react";
import CustomerSideBar from "@layout/SideBar";
import CategoryTabs from "./CategoryTabs";
import RestaurantCard from "./RestaurantCard";
import useDebouncedValue from "@hooks/useDebouncedValue";
import OnboardingGate from "@components/onBoardingGate";
import { useGetMyTagsQuery } from "@redux/api/Tag/tagApi";
import { useSelector } from "react-redux";
import { BASE_URL } from "@redux/api/baseApi";
import {
  useGetBookmarkedRestaurantsQuery,
  useBookmarkRestaurantMutation,
  useUnbookmarkRestaurantMutation,
} from "@redux/api/User/userApi";
import { useGetRestaurantsByTagsQuery, useGetAllRestaurantsQuery } from "@redux/api/Restaurant/restaurantApi";

const categories = [
  { name: "Gợi ý cho bạn", icon: "✨" },
  { name: "Theo thẻ của bạn", icon: "🏷️" },
  { name: "Tất cả", icon: "🌐" },
];

const ImageParams = "?w=640&h=400&fit=crop";

const FoodHomepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebouncedValue(searchQuery, 250);

  const [activeCategory, setActiveCategory] = useState("Gợi ý cho bạn");

  const accessToken = useSelector((s) => s?.auth?.accessToken);

  // bookmarks state
  const { data: bookmarkedRes } = useGetBookmarkedRestaurantsQuery(undefined, { skip: !accessToken });
  const initialBookmarkedIds = useMemo(() => new Set((Array.isArray(bookmarkedRes) ? bookmarkedRes : []).map((r) => r.id)), [bookmarkedRes]);
  const [bookmarkedIds, setBookmarkedIds] = React.useState(new Set());
  React.useEffect(() => setBookmarkedIds(initialBookmarkedIds), [initialBookmarkedIds]);

  const [bookmarkRestaurant] = useBookmarkRestaurantMutation();
  const [unbookmarkRestaurant] = useUnbookmarkRestaurantMutation();

  // Load user tags (skip when not logged in)
  const { data: myTagsData } = useGetMyTagsQuery(undefined, { skip: !accessToken });
  const userTagNames = useMemo(() => {
    const raw = Array.isArray(myTagsData?.data) ? myTagsData.data : [];
    return raw.map((t) => t.tagName).filter(Boolean);
  }, [myTagsData]);

  // Restaurants by tag (login) or all (guest)
  const tagsQuery = useGetRestaurantsByTagsQuery(userTagNames, {
    skip: !accessToken || userTagNames.length === 0,
  });
  const allQuery = useGetAllRestaurantsQuery(undefined, { skip: !!accessToken });
  const isLoading = (accessToken ? tagsQuery.isLoading : allQuery.isLoading) || false;
  const restaurants = accessToken ? tagsQuery.data || [] : allQuery.data || [];

  // map fields + small images
  const mappedRestaurants = useMemo(() => {
    return (restaurants || []).map((r) => ({
      id: r.id,
      name: r.name,
      image: r.avatarUrl
        ? `${String(BASE_URL).replace(/\/$/, "")}/${String(r.avatarUrl).replace(/^\/+/, "")}${ImageParams}`
        : `https://images.unsplash.com/photo-1552566626-52f8b828add9${ImageParams}`,
      rating: r.averagePoint ?? 5,
      reviews: r.totalReviews ?? 0,
      address: r.address ?? "",
      isOnline: true,
    }));
  }, [restaurants]);

  // toggle bookmark
  const toggleFavorite = useCallback(
    async (id) => {
      if (!accessToken) return;
      const isSaved = bookmarkedIds.has(id);
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        isSaved ? next.delete(id) : next.add(id);
        return next;
      });
      try {
        if (isSaved) await unbookmarkRestaurant(id).unwrap();
        else await bookmarkRestaurant(id).unwrap();
      } catch {
        setBookmarkedIds((prev) => {
          const next = new Set(prev);
          isSaved ? next.add(id) : next.delete(id);
          return next;
        });
      }
    },
    [accessToken, bookmarkedIds, bookmarkRestaurant, unbookmarkRestaurant]
  );

  // filter search
  const filteredRestaurants = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return mappedRestaurants.filter((r) => !q || (r.name || "").toLowerCase().includes(q));
  }, [mappedRestaurants, debouncedSearch]);

  return (
    <div className="">
      <CustomerSideBar />
      <OnboardingGate />
      <main className="flex-1 lg:ml-20">
        <CategoryTabs categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Khám phá địa điểm ăn uống</h2>
          <p className="text-gray-600 mb-8">{filteredRestaurants.length} kết quả được tìm thấy</p>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-48 bg-gray-100 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-2/3 bg-gray-100 animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-gray-100 animate-pulse rounded" />
                  <div className="h-4 w-1/3 bg-gray-100 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onToggleFavorite={toggleFavorite}
                  isBookmarked={bookmarkedIds.has(restaurant.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50">
        <div className="flex justify-around">
          <a href="#" className="flex flex-col items-center space-y-1 text-gray-900">
            <Home size={20} />
            <span className="text-xs">Trang chủ</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 text-gray-500">
            <Heart size={20} />
            <span className="text-xs">Yêu thích</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 text-gray-500">
            <Users size={20} />
            <span className="text-xs">Cộng đồng</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 text-gray-500">
            <Settings size={20} />
            <span className="text-xs">Cài đặt</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FoodHomepage;
