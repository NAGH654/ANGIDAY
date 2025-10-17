import React from "react";
import { useParams } from "react-router-dom";
import CustomerSideBar from "@layout/SideBar";

import RestaurantHero from "./components/RestaurantHero";
import RestaurantInfoCard from "./components/RestaurantInfoCard";
import StatsBar from "./components/StatsBar";
import MenuSection from "./components/MenuSection";
import PostsSection from "./components/PostsSection";
import ReviewsSection from "./components/ReviewsSection";
import RightSidebar from "./components/RightSidebar";

import { useGetRestaurantByIdQuery } from "@redux/api/Restaurant/restaurantApi";
import { BASE_URL } from "@redux/api/baseApi";

const ImageParams = "?w=960&h=540&fit=crop";

const CardDetailPage = () => {
  const { id } = useParams();
  const { data: r, isLoading } = useGetRestaurantByIdQuery(id);

  // map API -> component props
  const restaurant = React.useMemo(() => {
    if (!r) return null;
    return {
      id: r.id,
      name: r.name,
      address: r.address || "",
      image:
        r.avatarUrl
          ? `${String(BASE_URL).replace(/\/$/, "")}/${String(r.avatarUrl).replace(/^\/+/, "")}${ImageParams}`
          : `https://images.unsplash.com/photo-1552566626-52f8b828add9${ImageParams}`,
      rating: r.averagePoint ?? 5,
      followers: r.totalFollowers ?? 0,
      phoneNumber: r.phoneNumber || "",
      description: r.description || "",
      category: r.categoryName || "",
    };
  }, [r]);

  if (isLoading) {
    return (
      <div className="bg-gray-50">
        <CustomerSideBar />
        <main className="lg:ml-20">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
            <div className="h-56 bg-gray-100 animate-pulse rounded-2xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-40 bg-gray-100 animate-pulse rounded-2xl" />
                <div className="h-24 bg-gray-100 animate-pulse rounded-2xl" />
                <div className="h-64 bg-gray-100 animate-pulse rounded-2xl" />
              </div>
              <div className="h-64 bg-gray-100 animate-pulse rounded-2xl" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!restaurant) return null;

  return (
    <div className="bg-gray-50">
      <CustomerSideBar />
      <main className="lg:ml-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <RestaurantHero restaurant={restaurant} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              <RestaurantInfoCard restaurant={restaurant} />
              <StatsBar rating={restaurant.rating} followers={restaurant.followers} />
              {/* Menu/Posts/Reviews: giữ tạm mock rỗng nếu chưa có API */}
              <MenuSection restaurant={restaurant} items={[]} />
              <PostsSection restaurant={restaurant} posts={[]} />
              <ReviewsSection restaurant={restaurant} starDistribution={[]} reviews={[]} />
            </div>

            {/* Sidebar */}
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default React.memo(CardDetailPage);
