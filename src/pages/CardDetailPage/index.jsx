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

import { useGetRestaurantByIdQuery, useGetRestaurantReviewsQuery, useGetRestaurantPostsQuery, useGetSignatureFoodsQuery } from "@redux/api/Restaurant/restaurantApi";
import { BASE_URL } from "@redux/api/baseApi";

const ImageParams = "?w=960&h=540&fit=crop";

const CardDetailPage = () => {
  const { id } = useParams();
  const { data: r, isLoading } = useGetRestaurantByIdQuery(id);
  const { data: reviewsData, isLoading: reviewsLoading } = useGetRestaurantReviewsQuery(id);
  const { data: postsData, isLoading: postsLoading } = useGetRestaurantPostsQuery(id);
  const { data: menuItems, isLoading: menuLoading } = useGetSignatureFoodsQuery(id);

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
      totalReviews: reviewsData?.length ?? 0,
      phoneNumber: r.phoneNumber || "",
      description: r.description || "",
      category: r.categoryName || "",
    };
  }, [r, reviewsData]);

  // Transform reviews data for ReviewsSection
  const reviews = React.useMemo(() => {
    if (!reviewsData) return [];
    return reviewsData.map((review) => ({
      id: review.id,
      content: review.content || "",
      rating: 5, // API không có rating field, set default 5 sao
      timeAgo: review.createdAt ? new Date(review.createdAt).toLocaleDateString('vi-VN') : "",
      author: {
        name: review.userName || "Khách hàng",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", // API không có userAvatar
        isRestaurant: false,
      },
      images: review.imageUrl ? [review.imageUrl] : [],
      likes: 0, // API không có likes field
      isReply: false,
      signatureFoodName: review.signatureFoodName || "", // Thêm thông tin món ăn
    }));
  }, [reviewsData]);

  // Calculate star distribution
  const starDistribution = React.useMemo(() => {
    if (!reviewsData) return [];
    // Vì API không có rating field, tất cả feedback đều được tính là 5 sao
    const total = reviewsData.length;
    return [
      { stars: 5, count: total, percentage: 100 },
      { stars: 4, count: 0, percentage: 0 },
      { stars: 3, count: 0, percentage: 0 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 },
    ];
  }, [reviewsData]);

  // Transform posts data for PostsSection
  const posts = React.useMemo(() => {
    if (!postsData) return [];
    return postsData.map((post) => ({
      id: post.id,
      title: post.type === "owner_post" ? "Bài viết từ chủ nhà hàng" : "Bài viết từ khách hàng",
      content: post.content || "",
      imageUrl: post.imageUrl,
      timeAgo: post.createdAt ? new Date(post.createdAt).toLocaleDateString('vi-VN') : "",
      type: post.type || "owner_post",
      signatureFoodId: post.signatureFoodId,
      badge: post.type === "owner_post" ? "Chủ nhà hàng" : "Khách hàng",
      badgeColor: post.type === "owner_post" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600",
      location: restaurant?.address || "",
      likes: 0, // API không có field này
      comments: 0, // API không có field này
      shares: 0, // API không có field này
    }));
  }, [postsData, restaurant]);

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
              <MenuSection restaurant={restaurant} items={menuItems || []} />
              <PostsSection restaurant={restaurant} posts={posts} />
              <ReviewsSection 
                restaurant={restaurant} 
                starDistribution={starDistribution} 
                reviews={reviews} 
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
