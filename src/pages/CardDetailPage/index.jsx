import React from "react";
import CustomerSideBar from "@layout/SideBar";

import RestaurantHero from "./components/RestaurantHero";
import RestaurantInfoCard from "./components/RestaurantInfoCard";
import StatsBar from "./components/StatsBar";
import MenuSection from "./components/MenuSection";
import PostsSection from "./components/PostsSection";
import ReviewsSection from "./components/ReviewsSection";
import RightSidebar from "./components/RightSidebar";

import {
  restaurant,
  menuItems,
  restaurantPosts,
  starDistribution,
  customerReviews,
} from "./data/data";

const CardDetailPage = () => {
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
              <MenuSection restaurant={restaurant} items={menuItems} />
              <PostsSection restaurant={restaurant} posts={restaurantPosts} />
              <ReviewsSection
                restaurant={restaurant}
                starDistribution={starDistribution}
                reviews={customerReviews}
              />
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
