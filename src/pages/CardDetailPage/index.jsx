import React from "react";
import { useParams } from "react-router-dom";
import CustomerSideBar from "@layout/SideBar";

import RestaurantHero from "./components/RestaurantHero";
import RestaurantInfoCard from "./components/RestaurantInfoCard";
import MenuSection from "./components/MenuSection";
import PostsSection from "./components/PostsSection";
import ReviewsSection from "./components/ReviewsSection";
import RightSidebar from "./components/RightSidebar";

import {
  useGetRestaurantByIdQuery,
  useGetRestaurantReviewsQuery,
  useGetRestaurantPostsByRestaurantIdQuery,
  useGetSignatureFoodsQuery,
} from "@redux/api/Restaurant/restaurantApi";
import { BASE_URL } from "@redux/api/baseApi";
import { resolveImageUrl } from "@utils/imageUrl";

const ImageParams = "&w=960&h=540&fit=crop";

const CardDetailPage = () => {
  const { id } = useParams();
  const { data: r, isLoading } = useGetRestaurantByIdQuery(id);
  const { data: reviewsData, isLoading: reviewsLoading, refetch: refetchReviews } = useGetRestaurantReviewsQuery(id);
  const { data: postsData, isLoading: postsLoading } = useGetRestaurantPostsByRestaurantIdQuery(id);
  const { data: menuItems, isLoading: menuLoading } = useGetSignatureFoodsQuery(id);

  // map API -> component props
  const restaurant = React.useMemo(() => {
    if (!r) return null;
    
    // Use same image logic as HomePage
    const storageBase = import.meta.env.DEV
      ? "https://angiday-production-c5c0.up.railway.app/api"
      : BASE_URL;
    
    let imageUrl;
    if (r.imageUrl) {
      // Try Storage API with same logic as HomePage
      if (r.imageUrl.startsWith('uploads/restaurant/')) {
        imageUrl = `${storageBase}/Storage/view?key=${encodeURIComponent(r.imageUrl)}${ImageParams}`;
      } else if (r.imageUrl.startsWith('uploads/image/restaurant/')) {
        imageUrl = `${storageBase}/Storage/view?key=${encodeURIComponent(r.imageUrl)}${ImageParams}`;
      } else {
        imageUrl = `${storageBase}/Storage/view?key=${encodeURIComponent(r.imageUrl)}${ImageParams}`;
      }
    } else {
      // Fallback to Unsplash
      imageUrl = `https://images.unsplash.com/photo-1552566626-52f8b828add9${ImageParams}`;
    }
    
    // Calculate average rating from reviews
    let avgRating = r.averagePoint ?? 5;
    if (reviewsData && reviewsData.length > 0) {
      const totalRating = reviewsData.reduce((sum, review) => sum + (review.rating || 5), 0);
      avgRating = totalRating / reviewsData.length;
    }
    // Format to 1 decimal place
    avgRating = Math.round(avgRating * 10) / 10;

    return {
      id: r.id,
      name: r.name,
      address: r.address || "",
      image: imageUrl,
      rating: avgRating,
      followers: r.totalFollowers ?? 0,
      totalReviews: reviewsData?.length ?? 0,
      phone: r.phoneNumber || "",
      description: r.description || "",
      category: r.categoryName || "",
    };
  }, [r, reviewsData]);

  const formatRelativeTime = React.useCallback((dateString) => {
    if (!dateString) return "Vừa đăng";
    try {
      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) return "Vừa đăng";
      
      const now = new Date();
      // Ensure both dates are in the same timezone context
      const diffMs = now.getTime() - date.getTime();
      
      // If negative (future date) or very small difference, return "Vừa đăng"
      if (diffMs < 0) return "Vừa đăng";
      if (diffMs < 60000) return "Vừa đăng"; // Less than 1 minute
      
      const diffSeconds = Math.floor(diffMs / 1000);
      if (diffSeconds < 60) return "Vừa đăng";
      
      const diffMinutes = Math.floor(diffSeconds / 60);
      if (diffMinutes < 1) return "Vừa đăng";
      if (diffMinutes < 60) return `${diffMinutes} phút trước`;
      
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours} giờ trước`;
      
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays < 7) return `${diffDays} ngày trước`;
      
      return date.toLocaleDateString("vi-VN");
    } catch (error) {
      console.error("Error formatting relative time:", error, dateString);
      return "Vừa đăng";
    }
  }, []);

  // Transform reviews data for ReviewsSection
  const reviews = React.useMemo(() => {
    if (!reviewsData) return [];
    return reviewsData.map((review) => {
      const imageUrl = review.imageUrl && review.imageUrl !== "string" 
        ? resolveImageUrl(review.imageUrl, BASE_URL)
        : null;
      
      return {
        id: review.id,
        content: review.content || "",
        rating: review.rating || 5,
        timeAgo: formatRelativeTime(review.createdAt || review.updatedAt),
        author: {
          name: review.fullName || review.userName || "Khách hàng",
          avatar: resolveImageUrl(review.avatarUrl || review.userAvatar || "", BASE_URL) || 
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          isRestaurant: false,
        },
        images: imageUrl ? [imageUrl] : [],
        likes: 0,
        isReply: false,
        signatureFoodName: review.signatureFoodName || "",
        comments: (review.comments || []).map((comment) => ({
          id: comment.id,
          postId: comment.postId,
          parentId: comment.parentId,
          userId: comment.userId,
          content: comment.content || "",
          timeAgo: formatRelativeTime(comment.createdAt),
          author: {
            name: comment.displayName || comment.fullName || comment.restaurantName || "Người dùng",
            avatar: resolveImageUrl(comment.avatarUrl || "", BASE_URL) || 
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
            isRestaurant: comment.isRestaurantOwner || false,
            restaurantName: comment.restaurantName || null,
          },
          replies: (comment.replies || []).map((reply) => ({
            id: reply.id,
            postId: reply.postId,
            parentId: reply.parentId,
            userId: reply.userId,
            content: reply.content || "",
            timeAgo: formatRelativeTime(reply.createdAt),
            author: {
              name: reply.displayName || reply.fullName || reply.restaurantName || "Người dùng",
              avatar: resolveImageUrl(reply.avatarUrl || "", BASE_URL) || 
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
              isRestaurant: reply.isRestaurantOwner || false,
              restaurantName: reply.restaurantName || null,
            },
          })),
        })),
      };
    });
  }, [reviewsData, formatRelativeTime]);

  // Calculate star distribution
  const starDistribution = React.useMemo(() => {
    if (!reviewsData || reviewsData.length === 0) {
      return [
        { stars: 5, count: 0, percentage: 0 },
        { stars: 4, count: 0, percentage: 0 },
        { stars: 3, count: 0, percentage: 0 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 },
      ];
    }
    
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewsData.forEach((review) => {
      const rating = review.rating || 5;
      if (rating >= 1 && rating <= 5) {
        distribution[rating]++;
      }
    });
    
    const total = reviewsData.length;
    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: distribution[stars],
      percentage: total > 0 ? Math.round((distribution[stars] / total) * 100) : 0,
    }));
  }, [reviewsData]);

  // Transform signature foods data for MenuSection
  const transformedMenuItems = React.useMemo(() => {
    if (!menuItems || menuItems.length === 0) return [];
    
    return menuItems
      .filter((item) => !item.isDeleted) // Filter out deleted items
      .map((item) => {
        // Resolve image URL
        const imageUrl = item.imageUrl && item.imageUrl.trim() !== ""
          ? resolveImageUrl(item.imageUrl, BASE_URL)
          : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop";
        
        // Format price
        const price = item.referencePrice
          ? `${Number(item.referencePrice).toLocaleString('vi-VN')}đ`
          : "0đ";
        
        return {
          id: item.id,
          name: item.name || "Món ăn",
          description: item.description || "",
          price: price,
          rating: 0, // API không có rating
          reviews: 0, // API không có reviews
          image: imageUrl, // Map imageUrl to image
          isPopular: false,
        };
      });
  }, [menuItems]);

  // Transform posts data for PostsSection
  const posts = React.useMemo(() => {
    if (!postsData) return [];
    return postsData.map((post, index) => {
      const type = post.type?.toLowerCase() || "owner_post";
      const rawImage = post.imageUrl || post.image || "";
      const resolvedImage = rawImage ? resolveImageUrl(rawImage, BASE_URL) : null;
      const imageUrl = resolvedImage && resolvedImage.trim() ? resolvedImage : null;
      
      return {
        id: post.id ?? index,
        title:
          post.title ||
          post.signatureFoodName ||
          (type === "owner_post" ? "Bài viết từ chủ nhà hàng" : "Bài viết"),
        content: post.content || "",
        imageUrl,
        timeAgo: formatRelativeTime(post.updatedAt || post.createdAt),
        type,
        signatureFoodId: post.signatureFoodId,
        badge: type === "owner_post" ? "Chủ nhà hàng" : "Bài viết",
        badgeColor:
          type === "owner_post"
            ? "bg-blue-100 text-blue-600"
            : "bg-green-100 text-green-600",
        location: restaurant?.address || "",
        likes: post.totalLikes ?? post.likes ?? 0,
        comments: post.totalComments ?? post.comments ?? 0,
        shares: post.totalShares ?? post.shares ?? 0,
      };
    });
  }, [postsData, restaurant, formatRelativeTime]);

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
              <RestaurantInfoCard restaurant={{ ...restaurant, postsCount: postsData?.length || 0 }} />
              {/* Menu/Posts/Reviews: giữ tạm mock rỗng nếu chưa có API */}
              {menuLoading ? (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-center py-10 text-gray-500">
                    Đang tải món ăn...
                  </div>
                </div>
              ) : transformedMenuItems.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                    <p>Chưa có món ăn nào.</p>
                  </div>
                </div>
              ) : (
                <MenuSection restaurant={restaurant} items={transformedMenuItems} />
              )}
              <PostsSection restaurant={restaurant} posts={posts} />
              <ReviewsSection 
                restaurant={restaurant} 
                starDistribution={starDistribution} 
                reviews={reviews}
                refetchReviews={refetchReviews}
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
