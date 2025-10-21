import React, { useCallback, useMemo, useState } from "react";
import { Heart, Home, Users, Settings } from "lucide-react";
import CustomerSideBar from "@layout/SideBar";
import CategoryTabs from "./CategoryTabs";
import RestaurantCard from "./RestaurantCard";
import useDebouncedValue from "@hooks/useDebouncedValue";
import OnboardingGate from "@components/onBoardingGate";
import { useSelector } from "react-redux";
import { BASE_URL } from "@redux/api/baseApi";
import {
  useGetBookmarkedRestaurantsQuery,
  useBookmarkRestaurantMutation,
  useUnbookmarkRestaurantMutation,
} from "@redux/api/User/userApi";
import { useGetRestaurantsByUserTagsQuery, useGetAllRestaurantsQuery, useGetRestaurantRecommendationsQuery } from "@redux/api/Restaurant/restaurantApi";

// Categories for logged-in users
const loggedInCategories = [
  { name: "Theo thẻ của bạn", icon: "🏷️" },
  { name: "Gợi ý cho bạn", icon: "✨" },
  { name: "Tất cả", icon: "🌐" },
];

// Categories for guests (not logged in)
const guestCategories = [
  { name: "Khám phá", icon: "🌐" },
];

const ImageParams = "&w=640&h=400&fit=crop";

const FoodHomepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebouncedValue(searchQuery, 250);

  const accessToken = useSelector((s) => s?.auth?.accessToken);
  
  // Set default category based on login status
  const [activeCategory, setActiveCategory] = useState(accessToken ? "Theo thẻ của bạn" : "Khám phá");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const [totalPages, setTotalPages] = useState(1);
  
  // Use appropriate categories based on login status
  const categories = accessToken ? loggedInCategories : guestCategories;
  
  // Reset category and page when login status changes
  React.useEffect(() => {
    if (accessToken) {
      setActiveCategory("Theo thẻ của bạn");
    } else {
      setActiveCategory("Khám phá");
    }
    setCurrentPage(1); // Reset page on login status change
  }, [accessToken]);

  // Reset page when activeCategory changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // bookmarks state
  const { data: bookmarkedRes } = useGetBookmarkedRestaurantsQuery(undefined, { skip: !accessToken });
  const initialBookmarkedIds = useMemo(() => new Set((Array.isArray(bookmarkedRes) ? bookmarkedRes : []).map((r) => r.id)), [bookmarkedRes]);
  const [bookmarkedIds, setBookmarkedIds] = React.useState(new Set());
  React.useEffect(() => setBookmarkedIds(initialBookmarkedIds), [initialBookmarkedIds]);

  const [bookmarkRestaurant] = useBookmarkRestaurantMutation();
  const [unbookmarkRestaurant] = useUnbookmarkRestaurantMutation();

  // Restaurants by user tags (login) or all (guest)
  const userTagsQuery = useGetRestaurantsByUserTagsQuery(undefined, { skip: !accessToken });
  const recommendationsQuery = useGetRestaurantRecommendationsQuery(undefined, { skip: !accessToken });
  const allQuery = useGetAllRestaurantsQuery(undefined, { 
    skip: (accessToken && activeCategory !== "Tất cả") || (!accessToken && activeCategory !== "Khám phá")
  });
  
  // Determine which data to use based on category and login status
  const isLoading = (() => {
    if (!accessToken) return allQuery.isLoading;
    if (activeCategory === "Theo thẻ của bạn") return userTagsQuery.isLoading;
    if (activeCategory === "Gợi ý cho bạn") return recommendationsQuery.isLoading;
    if (activeCategory === "Tất cả") return allQuery.isLoading;
    return allQuery.isLoading;
  })();
  
  // Get all restaurants data (no pagination from API)
  const allRestaurants = (() => {
    if (!accessToken) return allQuery.data || [];
    if (activeCategory === "Theo thẻ của bạn") return userTagsQuery.data || [];
    if (activeCategory === "Gợi ý cho bạn") return recommendationsQuery.data || [];
    if (activeCategory === "Tất cả") return allQuery.data || [];
    return allQuery.data || [];
  })();

  // Calculate totalPages based on all restaurants data
  React.useEffect(() => {
    const total = Math.ceil(allRestaurants.length / pageSize);
    setTotalPages(total);
  }, [allRestaurants.length, pageSize]);

  // Apply frontend pagination to restaurants
  const restaurants = useMemo(() => {
    // Apply pagination for all tabs that have pagination enabled
    const shouldPaginate = activeCategory === "Tất cả" || 
                          activeCategory === "Theo thẻ của bạn" || 
                          activeCategory === "Gợi ý cho bạn" ||
                          (!accessToken && activeCategory === "Khám phá");
    
    if (shouldPaginate) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return allRestaurants.slice(startIndex, endIndex);
    }
    // No pagination for other tabs
    return allRestaurants;
  }, [allRestaurants, currentPage, pageSize, activeCategory, accessToken]);

  // map fields + small images
  const mappedRestaurants = useMemo(() => {
    const storageBase = import.meta.env.DEV
      ? "https://angiday-production-c5c0.up.railway.app/api"
      : BASE_URL;
    
    // Array of beautiful restaurant/food images from Unsplash
    const placeholderImages = [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=640&h=400&fit=crop&auto=format', // Vietnamese food
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=640&h=400&fit=crop&auto=format', // Restaurant interior
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=640&h=400&fit=crop&auto=format', // Asian cuisine
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=640&h=400&fit=crop&auto=format', // Street food
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=640&h=400&fit=crop&auto=format', // Vietnamese pho
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=640&h=400&fit=crop&auto=format', // Noodles
      'https://images.unsplash.com/photo-1574484284002-952d92456975?w=640&h=400&fit=crop&auto=format', // Restaurant ambiance
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=640&h=400&fit=crop&auto=format', // Food presentation
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=640&h=400&fit=crop&auto=format', // Asian dishes
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=640&h=400&fit=crop&auto=format', // Vietnamese cuisine
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=640&h=400&fit=crop&auto=format', // Traditional food
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=640&h=400&fit=crop&auto=format', // Modern restaurant
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=640&h=400&fit=crop&auto=format', // Street food stall
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=640&h=400&fit=crop&auto=format', // Pho bowl
      'https://images.unsplash.com/photo-1574484284002-952d92456975?w=640&h=400&fit=crop&auto=format', // Cozy dining
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=640&h=400&fit=crop&auto=format', // Food styling
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=640&h=400&fit=crop&auto=format', // Asian fusion
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=640&h=400&fit=crop&auto=format', // Vietnamese specialties
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=640&h=400&fit=crop&auto=format', // Authentic flavors
    ];
    
    return (restaurants || []).map((r, index) => {
      // Try Storage API first, fallback to Unsplash if it fails
      const hasImg = !!r.imageUrl;
      let primary;
      
      if (hasImg) {
        // Try different URL constructions based on the imageUrl format
        if (r.imageUrl.startsWith('uploads/restaurant/')) {
          // Format: uploads/restaurant/14_xxx.jpg (actual format from API)
          primary = `${storageBase}/Storage/view?key=${encodeURIComponent(r.imageUrl)}${ImageParams}`;
        } else if (r.imageUrl.startsWith('uploads/image/restaurant/')) {
          // Format: uploads/image/restaurant/15_xxx.jpg (alternative format)
          primary = `${storageBase}/Storage/view?key=${encodeURIComponent(r.imageUrl)}${ImageParams}`;
        } else {
          // Other formats, try direct Storage API
          primary = `${storageBase}/Storage/view?key=${encodeURIComponent(r.imageUrl)}${ImageParams}`;
        }
        
        // Debug for restaurant ID 14
        if (r.id === 14) {
          console.log("🔍 Restaurant ID 14 Debug:", {
            id: r.id,
            name: r.name,
            imageUrl: r.imageUrl,
            constructedUrl: primary,
            storageBase: storageBase
          });
        }
      } else {
        // No imageUrl, use Unsplash placeholder
        primary = placeholderImages[index % placeholderImages.length];
      }
      
      return {
        id: r.id,
        name: r.name,
        image: primary,
        imageAlt: placeholderImages[index % placeholderImages.length], // Always provide fallback
        rating: r.avgRating ?? 5,
        reviews: r.ratingCount ?? 0,
        address: r.address ?? "",
        isOnline: r.status === "active",
      };
    });
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {activeCategory === "Theo thẻ của bạn" ? "Gợi ý cho bạn" : 
             activeCategory === "Gợi ý cho bạn" ? "Gợi ý cho bạn" : 
             activeCategory === "Khám phá" ? "Khám phá địa điểm ăn uống" :
             "Khám phá địa điểm ăn uống"}
          </h2>
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
            <>
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

              {/* Pagination controls - show for all tabs with pagination */}
              {(() => {
                const shouldShowPagination = (activeCategory === "Tất cả" || 
                                            activeCategory === "Theo thẻ của bạn" || 
                                            activeCategory === "Gợi ý cho bạn" ||
                                            (!accessToken && activeCategory === "Khám phá")) && 
                                            totalPages > 1;
                return shouldShowPagination;
              })() && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1 || isLoading}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Trước
                  </button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        disabled={isLoading}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? "bg-pink-600 text-white border-pink-600"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages || isLoading}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Sau
                  </button>
                </div>
              )}
            </>
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
