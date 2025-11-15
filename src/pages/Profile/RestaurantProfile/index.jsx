import React, { useMemo, useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Star,
  Send,
  MoreHorizontal,
  Users,
  Eye,
  Calendar,
  Edit,
  Image as ImageIcon,
  Globe,
  X,
  Save,
  Loader2,
  Plus,
  Camera,
  Upload,
  Trash2,
  MessageCircle,
} from "lucide-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomerSideBar from "@layout/SideBar";
import { Link } from "react-router-dom";
import { endPoint } from "@routes/router";
import OnboardingGate from "@components/onBoardingGate";
import LoadingSpinner from "@components/LoadingSpinner";
import { resolveImageUrl } from "@utils/imageUrl";
import { BASE_URL } from "@redux/api/baseApi";
import {
  useGetRestaurantOwnerInformationQuery,
  useGetRestaurantOwnerPostsQuery,
  useGetRestaurantOwnerReviewsQuery,
  useGetMyRestaurantSignatureFoodsQuery,
  useCreateSignatureFoodMutation,
  useUpdateSignatureFoodMutation,
  useDeleteSignatureFoodMutation,
  useUploadSignatureFoodImageMutation,
  useUpdateRestaurantProfileMutation,
  useUpdateRestaurantImageMutation,
} from "@redux/api/Restaurant/restaurantApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function RestaurantProfile() {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [expandedComments, setExpandedComments] = useState({}); // { reviewId: { commentId: true } }
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);
  const [editingFoodId, setEditingFoodId] = useState(null);
  const [isSubmittingFood, setIsSubmittingFood] = useState(false);
  const [isDeletingFood, setIsDeletingFood] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ isOpen: false, foodId: null, foodName: "" });
  const [foodFormData, setFoodFormData] = useState({
    name: "",
    description: "",
    referencePrice: "",
    imageUrl: "",
  });
  const [foodImageFile, setFoodImageFile] = useState(null);
  const [foodImagePreview, setFoodImagePreview] = useState(null);
  const [foodErrors, setFoodErrors] = useState({});
  const [commentModal, setCommentModal] = useState({ isOpen: false, reviewId: null, reviewContent: "" });
  const [commentContent, setCommentContent] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [restaurantImageFile, setRestaurantImageFile] = useState(null);
  const [restaurantImagePreview, setRestaurantImagePreview] = useState(null);
 
  const {
    data: ownerInfo,
    isLoading: isOwnerInfoLoading,
    isFetching: isOwnerInfoFetching,
    isError: isOwnerInfoError,
    refetch: refetchOwnerInfo,
  } = useGetRestaurantOwnerInformationQuery();
  const {
    data: ownerPostsRaw = [],
    isLoading: isOwnerPostsLoading,
    isError: isOwnerPostsError,
    refetch: refetchOwnerPosts,
  } = useGetRestaurantOwnerPostsQuery();
  const {
    data: ownerReviewsRaw = [],
    isLoading: isOwnerReviewsLoading,
    isError: isOwnerReviewsError,
    refetch: refetchOwnerReviews,
  } = useGetRestaurantOwnerReviewsQuery();
  const {
    data: signatureFoodsRaw = [],
    isLoading: isSignatureFoodsLoading,
    isError: isSignatureFoodsError,
    refetch: refetchSignatureFoods,
  } = useGetMyRestaurantSignatureFoodsQuery();
  const [updateRestaurantProfile] = useUpdateRestaurantProfileMutation();
  const [updateRestaurantImage] = useUpdateRestaurantImageMutation();
  const [createSignatureFood] = useCreateSignatureFoodMutation();
  const [updateSignatureFood] = useUpdateSignatureFoodMutation();
  const [deleteSignatureFood] = useDeleteSignatureFoodMutation();
  const [uploadSignatureFoodImage] = useUploadSignatureFoodImageMutation();

  // Initialize form data when ownerInfo loads
  useEffect(() => {
    if (ownerInfo) {
      setFormData({
        name: ownerInfo.name || "",
        address: ownerInfo.address || "",
        description: ownerInfo.description || "",
        phoneNumber: ownerInfo.phoneNumber || "",
      });
      setErrors({}); // Clear errors when loading new data
      // Reset image preview when opening modal
      setRestaurantImageFile(null);
      setRestaurantImagePreview(null);
    }
  }, [ownerInfo]);

  // Parse validation error message from API
  const parseValidationError = (error) => {
    const newErrors = {};
    
    // Get error message from API response
    const errorMessage = error?.data?.message || error?.message || "";
    
    if (!errorMessage) {
      return { general: "Không thể cập nhật thông tin. Vui lòng thử lại!" };
    }

    // Map common validation messages to field names
    const fieldMappings = {
      name: ["name", "tên"],
      address: ["address", "địa chỉ"],
      description: ["description", "mô tả"],
      phoneNumber: ["phone", "số điện thoại", "phoneNumber"],
    };

    // Check if error is for a specific field
    let fieldFound = false;
    for (const [field, keywords] of Object.entries(fieldMappings)) {
      const lowerMessage = errorMessage.toLowerCase();
      if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
        newErrors[field] = errorMessage;
        fieldFound = true;
        break;
      }
    }

    // If no specific field found, show as general error
    if (!fieldFound) {
      newErrors.general = errorMessage;
    }

    return newErrors;
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = "Tên nhà hàng là bắt buộc";
    }
    
    if (!formData.address?.trim()) {
      newErrors.address = "Địa chỉ là bắt buộc";
    }
    
    if (!formData.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Số điện thoại là bắt buộc";
    }
    
    if (formData.description && formData.description.trim().length < 30) {
      newErrors.description = "Mô tả phải có ít nhất 30 ký tự";
    }
    
    if (formData.description && formData.description.trim().length > 2000) {
      newErrors.description = "Mô tả không được vượt quá 2000 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRestaurantImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setRestaurantImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setRestaurantImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const removeRestaurantImage = () => {
    setRestaurantImageFile(null);
    setRestaurantImagePreview(null);
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
    setRestaurantImageFile(null);
    setRestaurantImagePreview(null);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Client-side validation
    if (!validateForm()) {
      return;
    }

    setIsUpdating(true);
    try {
      // First, update profile information
      const response = await updateRestaurantProfile(formData).unwrap();
      
      // Check if API returned success = false (even with 200 status)
      if (response && response.isSuccess === false) {
        const validationErrors = parseValidationError({
          data: response,
          message: response.message,
        });
        setErrors(validationErrors);
        
        if (validationErrors.general) {
          toast.error(validationErrors.general);
        } else {
          toast.error(response.message || "Có lỗi xảy ra khi cập nhật thông tin. Vui lòng kiểm tra lại!");
        }
        return;
      }
      
      // Then, upload image if a new image was selected
      if (restaurantImageFile) {
        try {
          const imageFormData = new FormData();
          imageFormData.append("Avatar", restaurantImageFile);
          
          await updateRestaurantImage(imageFormData).unwrap();
          toast.success("Cập nhật ảnh nhà hàng thành công!");
        } catch (imageError) {
          console.error("Image upload failed:", imageError);
          const errorMsg = imageError?.data?.message || imageError?.message || "Không thể cập nhật ảnh. Vui lòng thử lại!";
          toast.error(errorMsg);
          // Don't return here - profile update was successful
        }
      }
      
      // Success case
      if (!restaurantImageFile) {
        toast.success("Cập nhật thông tin nhà hàng thành công!");
      }
      handleCloseEditModal();
      refetchOwnerInfo(); // Refresh data
    } catch (error) {
      console.error("Update failed:", error);
      const validationErrors = parseValidationError(error);
      setErrors(validationErrors);
      
      // Show general error toast if no specific field error
      if (validationErrors.general) {
        toast.error(validationErrors.general);
      } else {
        toast.error("Có lỗi xảy ra khi cập nhật thông tin. Vui lòng kiểm tra lại!");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const formatCompactNumber = (input, fallback) => {
    if (input === null || input === undefined) return fallback;
    if (typeof input === "string" && input.trim().length > 0) return input;
    if (typeof input !== "number" || Number.isNaN(input)) return fallback;
    if (input >= 1000000) {
      return `${(input / 1000000).toFixed(1).replace(".0", "")}M`;
    }
    if (input >= 1000) {
      return `${(input / 1000).toFixed(1).replace(".0", "")}k`;
    }
    return input.toString();
  };

  const formatOpenHours = (open, close, fallback) => {
    if (!open && !close) return fallback;
    if (open && close) return `${open} - ${close}`;
    if (open && !close) return `${open} - ?`;
    if (!open && close) return `? - ${close}`;
    return fallback;
  };

  const defaultRestaurant = {
    id: 1,
    name: "Pizza 4P's",
    verified: true,
    status: "Đang mở cửa",
    rating: 4.8,
    totalReviews: 912,
    followers: "2.5k",
    posts: 156,
    category: "Pizza",
    address: "Quận 1, TP. Hồ Chí Minh",
    phone: "0901 345 678",
    website: "pizza4ps.com",
    openTime: "10:00 - 23:00 (Hằng ngày)",
    description:
      "🍕 Pizza Y authentic với nguyên liệu tươi ngon nhập khẩu trực tiếp từ Italy | 🧀 Phô mai mozzarella tự làm hằng ngày | 🌿 Không gian hiện đại, phục vụ tận tâm | 📍 Nhiều chi nhánh tại TP.HCM & Hà Nội",
    heroImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop",
    totalPhotos: 24,
  };

  const restaurant = useMemo(() => {
    if (!ownerInfo) return defaultRestaurant;

    const normalizedStatus = ownerInfo.status
      ? ownerInfo.status.toString().toLowerCase()
      : "";
    const statusLabel =
      normalizedStatus === "active" ||
      normalizedStatus === "open" ||
      normalizedStatus === "đang mở cửa"
        ? "Đang mở cửa"
        : normalizedStatus === "inactive" ||
            normalizedStatus === "closed" ||
            normalizedStatus === "tạm đóng"
          ? "Tạm đóng"
          : ownerInfo.status || defaultRestaurant.status;

    // Use imageUrl from API for both hero image and thumbnail
    const heroImage =
      resolveImageUrl(
        ownerInfo.imageUrl ||
          ownerInfo.imageCover ||
          ownerInfo.coverImage ||
          ownerInfo.heroImage ||
          ownerInfo.thumbnail,
        BASE_URL
      ) || defaultRestaurant.heroImage;

    const thumbnail =
      resolveImageUrl(
        ownerInfo.imageUrl ||
          ownerInfo.thumbnail ||
          ownerInfo.logoUrl ||
          ownerInfo.avatarUrl ||
          ownerInfo.imageCover,
        BASE_URL
      ) || defaultRestaurant.thumbnail;

    return {
      ...defaultRestaurant,
      id: ownerInfo.id ?? defaultRestaurant.id,
      name: ownerInfo.name ?? defaultRestaurant.name,
      status: statusLabel,
      rating: ownerInfo.rating ?? defaultRestaurant.rating,
      totalReviews:
        ownerInfo.totalReviews ??
        ownerInfo.ratingPoint ??
        defaultRestaurant.totalReviews,
      followers:
        formatCompactNumber(ownerInfo.totalFollowers, defaultRestaurant.followers) ||
        defaultRestaurant.followers,
      posts:
        formatCompactNumber(ownerInfo.totalPosts, defaultRestaurant.posts) ??
        defaultRestaurant.posts,
      category: ownerInfo.category ?? defaultRestaurant.category,
      address: ownerInfo.address ?? defaultRestaurant.address,
      phone: ownerInfo.phoneNumber ?? defaultRestaurant.phone,
      website:
        ownerInfo.website ??
        ownerInfo.websiteUrl ??
        ownerInfo.socialLink ??
        defaultRestaurant.website,
      openTime: formatOpenHours(
        ownerInfo.openTime,
        ownerInfo.closeTime,
        defaultRestaurant.openTime
      ),
      description: ownerInfo.description ?? defaultRestaurant.description,
      heroImage,
      thumbnail,
      totalPhotos: ownerInfo.totalPhotos ?? defaultRestaurant.totalPhotos,
    };
  }, [ownerInfo]);

  // Transform signature foods from API
  const menuItems = useMemo(() => {
    if (!signatureFoodsRaw || signatureFoodsRaw.length === 0) return [];
    
    return signatureFoodsRaw
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
          referencePrice: item.referencePrice, // Keep original for editing
          imageUrl: item.imageUrl, // Keep original for editing
          rating: 0, // API không có rating, có thể thêm sau
          reviews: 0, // API không có reviews, có thể thêm sau
          image: imageUrl,
          isPopular: false, // Có thể thêm logic để xác định popular sau
        };
      });
  }, [signatureFoodsRaw]);

  const formatRelativeTime = (dateString) => {
    if (!dateString) return "Vừa đăng";
    try {
      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) return "Vừa đăng";
      
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      
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
      return "Vừa đăng";
    }
  };

  const restaurantPosts = useMemo(() => {
    if (!ownerPostsRaw || ownerPostsRaw.length === 0) return [];
    return ownerPostsRaw.map((post, index) => {
      const title =
        post?.title?.trim() ||
        post?.signatureFoodName ||
        post?.type ||
        `Bài viết #${index + 1}`;
      const content = post?.content || "";
      const timeAgo = formatRelativeTime(post?.createdAt || post?.updatedAt);
      const badge = post?.type === "Owner_post" ? "Bài viết" : post?.type || "Thông báo";
      const badgeColor =
        post?.type === "Owner_post"
          ? "text-blue-600 bg-blue-100"
          : "text-purple-600 bg-purple-100";
      const image =
        resolveImageUrl(post?.imageUrl || post?.image || "", BASE_URL) || restaurant.heroImage;

      return {
        id: post?.id ?? index,
        badge,
        badgeColor,
        title,
        content,
        timeAgo,
        location: restaurant.address,
        likes: post?.totalLikes ?? post?.likes ?? 0,
        comments: post?.totalComments ?? post?.comments ?? 0,
        shares: post?.totalShares ?? post?.shares ?? 0,
        image,
      };
    });
  }, [ownerPostsRaw, restaurant.address, restaurant.heroImage]);

  // Transform reviews data from API
  const customerReviews = useMemo(() => {
    if (!ownerReviewsRaw || ownerReviewsRaw.length === 0) return [];
    return ownerReviewsRaw.map((review) => {
      const imageUrl = review.imageUrl && review.imageUrl !== "string" 
        ? resolveImageUrl(review.imageUrl, BASE_URL)
        : null;
      
      return {
        id: review.id,
        postId: review.postId || review.id, // Use postId if available, otherwise use review.id
        content: review.content || "",
        rating: review.rating || 5,
        timeAgo: formatRelativeTime(review.createdAt || review.updatedAt),
      author: {
          name: review.fullName || "Khách hàng",
          avatar: resolveImageUrl(review.avatarUrl || "", BASE_URL) || 
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
  }, [ownerReviewsRaw]);

  // Calculate star distribution from reviews
  const starDistribution = useMemo(() => {
    if (!ownerReviewsRaw || ownerReviewsRaw.length === 0) {
      return [
        { stars: 5, count: 0, percentage: 0 },
        { stars: 4, count: 0, percentage: 0 },
        { stars: 3, count: 0, percentage: 0 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 },
      ];
    }
    
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ownerReviewsRaw.forEach((review) => {
      const rating = review.rating || 5;
      if (rating >= 1 && rating <= 5) {
        distribution[rating]++;
      }
    });
    
    const total = ownerReviewsRaw.length;
    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: distribution[stars],
      percentage: total > 0 ? Math.round((distribution[stars] / total) * 100) : 0,
    }));
  }, [ownerReviewsRaw]);

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (!ownerReviewsRaw || ownerReviewsRaw.length === 0) {
      return restaurant.rating || 0;
    }
    const totalRating = ownerReviewsRaw.reduce((sum, review) => sum + (review.rating || 5), 0);
    const avg = totalRating / ownerReviewsRaw.length;
    return Math.round(avg * 10) / 10;
  }, [ownerReviewsRaw, restaurant.rating]);

  const toggleCommentReplies = (reviewId, commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [reviewId]: {
        ...(prev[reviewId] || {}),
        [commentId]: !(prev[reviewId]?.[commentId] || false),
      },
    }));
  };

  const accessToken = useSelector((s) => s?.auth?.accessToken);

  const handleOpenCommentModal = (reviewId, reviewContent) => {
    setCommentModal({ isOpen: true, reviewId, reviewContent });
    setCommentContent("");
  };

  const handleCloseCommentModal = () => {
    setCommentModal({ isOpen: false, reviewId: null, reviewContent: "" });
    setCommentContent("");
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      toast.error("Vui lòng nhập nội dung bình luận");
      return;
    }

    if (!commentModal.reviewId) {
      toast.error("Không tìm thấy review");
      return;
    }

    // Find the review from raw data to get postId
    const review = ownerReviewsRaw?.find((r) => r.id === commentModal.reviewId);
    const postId = review?.postId || review?.id || commentModal.reviewId;
    
    if (!postId) {
      toast.error("Không tìm thấy review");
      return;
    }

    setIsSubmittingComment(true);
    try {
      const payload = {
        postId: postId,
        parentId: 0, // Root comment
        content: commentContent.trim(),
      };

      const response = await fetch(`${BASE_URL}/Comment/create-comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Không thể gửi bình luận");
      }

      toast.success("Bình luận thành công!");
      handleCloseCommentModal();
      // Refresh reviews
      refetchOwnerReviews();
    } catch (error) {
      console.error("Comment submission failed:", error);
      toast.error(error.message || "Không thể gửi bình luận. Vui lòng thử lại!");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Food form handlers
  const handleFoodImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Clear image error when selecting new image
    if (foodErrors.imageUrl) {
      const { imageUrl, ...rest } = foodErrors;
      setFoodErrors(rest);
    }
    
    setFoodImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setFoodImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const removeFoodImage = () => {
    setFoodImageFile(null);
    setFoodImagePreview(null);
  };

  const handleEditFood = (item) => {
    setEditingFoodId(item.id);
    setFoodFormData({
      name: item.name || "",
      description: item.description || "",
      referencePrice: (item.referencePrice || item.referencePrice === 0) ? item.referencePrice.toString() : "",
      imageUrl: item.imageUrl || "",
    });
    // Set preview from existing image
    if (item.image && item.image !== "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop") {
      setFoodImagePreview(item.image);
    } else {
      setFoodImagePreview(null);
    }
    setFoodImageFile(null);
    setFoodErrors({});
    setIsEditFoodModalOpen(true);
  };

  const handleDeleteFood = (foodId, foodName) => {
    setDeleteConfirmModal({
      isOpen: true,
      foodId: foodId,
      foodName: foodName || "món ăn này",
    });
  };

  const confirmDeleteFood = async () => {
    if (!deleteConfirmModal.foodId) return;

    setIsDeletingFood(true);
    try {
      await deleteSignatureFood(deleteConfirmModal.foodId).unwrap();
      toast.success("Xóa món ăn thành công!");
      setDeleteConfirmModal({ isOpen: false, foodId: null, foodName: "" });
      refetchSignatureFoods();
    } catch (error) {
      console.error("Delete food failed:", error);
      const errorMessage = error?.data?.message || error?.message || "Không thể xóa món ăn. Vui lòng thử lại!";
      toast.error(errorMessage);
    } finally {
      setIsDeletingFood(false);
    }
  };

  const handleFoodSubmit = async (e) => {
    e.preventDefault();
    setFoodErrors({});

    // Validation
    if (!foodFormData.name?.trim()) {
      setFoodErrors({ name: "Tên món ăn là bắt buộc" });
      return;
    }
    if (!foodFormData.description?.trim()) {
      setFoodErrors({ description: "Mô tả là bắt buộc" });
      return;
    }
    if (!foodFormData.referencePrice || Number(foodFormData.referencePrice) <= 0) {
      setFoodErrors({ referencePrice: "Giá tham khảo phải lớn hơn 0" });
      return;
    }

    setIsSubmittingFood(true);
    try {
      let imageUrl = null;

      // Upload image if new file is selected
      if (foodImageFile) {
        try {
          const formData = new FormData();
          formData.append("ImageFile", foodImageFile);
          
          const uploadResult = await uploadSignatureFoodImage(formData).unwrap();
          console.log("Upload result:", uploadResult);
          
          // Extract imageUrl from response
          // Response format: { isSuccess: true, statusCode: 200, message: "string", data: "string" or object }
          if (uploadResult?.data) {
            // If data is a string, use it directly
            if (typeof uploadResult.data === 'string') {
              imageUrl = uploadResult.data;
            } 
            // If data is an object, try to extract key/url/imageUrl
            else if (typeof uploadResult.data === 'object') {
              imageUrl = uploadResult.data.key || uploadResult.data.url || uploadResult.data.imageUrl || uploadResult.data;
              // If still an object, convert to string or use a specific field
              if (typeof imageUrl !== 'string') {
                imageUrl = String(imageUrl);
              }
            } else {
              imageUrl = String(uploadResult.data);
            }
          } else if (typeof uploadResult === 'string') {
            imageUrl = uploadResult;
          } else {
            throw new Error("Invalid upload response format");
          }
          
          // Validate imageUrl is not empty (only if it's a string)
          if (!imageUrl || (typeof imageUrl === 'string' && imageUrl.trim() === "")) {
            throw new Error("Image URL is empty");
          }
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          const errorMsg = uploadError?.data?.message || uploadError?.message || "Không thể tải ảnh lên. Vui lòng thử lại!";
          toast.error(errorMsg);
          setIsSubmittingFood(false);
          return;
        }
      } else if (editingFoodId && foodFormData.imageUrl) {
        // If editing and no new image, keep existing imageUrl
        imageUrl = foodFormData.imageUrl;
      }

      // Create/Update food
      const foodData = {
        name: foodFormData.name.trim(),
        description: foodFormData.description.trim(),
        referencePrice: Number(foodFormData.referencePrice),
      };
      
      // Only include imageUrl if it exists and is not empty
      if (imageUrl) {
        // Convert to string if needed and check if not empty
        const imageUrlStr = typeof imageUrl === 'string' ? imageUrl : String(imageUrl);
        if (imageUrlStr.trim() !== "") {
          foodData.imageUrl = imageUrlStr;
        }
      }

      if (editingFoodId) {
        // Update existing food
        await updateSignatureFood({ foodId: editingFoodId, body: foodData }).unwrap();
        toast.success("Cập nhật món ăn thành công!");
      } else {
        // Create new food
        await createSignatureFood(foodData).unwrap();
        toast.success("Thêm món ăn thành công!");
      }
      
      // Close modals and reset form
      setIsAddFoodModalOpen(false);
      setIsEditFoodModalOpen(false);
      setEditingFoodId(null);
      setFoodFormData({
        name: "",
        description: "",
        referencePrice: "",
        imageUrl: "",
      });
      removeFoodImage();
      setFoodErrors({});
      
      // Refresh signature foods list
      refetchSignatureFoods();
    } catch (error) {
      console.error("Create food failed:", error);
      
      // Parse validation errors
      if (error?.data?.errors) {
        const validationErrors = error.data.errors;
        const newErrors = {};
        
        // Map validation errors to form fields
        if (validationErrors["$.imageUrl"] || validationErrors["imageUrl"]) {
          newErrors.imageUrl = "Ảnh không hợp lệ. Vui lòng thử lại!";
        }
        if (validationErrors["$.name"] || validationErrors["name"]) {
          newErrors.name = validationErrors["$.name"]?.[0] || validationErrors["name"]?.[0] || "Tên món ăn không hợp lệ";
        }
        if (validationErrors["$.description"] || validationErrors["description"]) {
          newErrors.description = validationErrors["$.description"]?.[0] || validationErrors["description"]?.[0] || "Mô tả không hợp lệ";
        }
        if (validationErrors["$.referencePrice"] || validationErrors["referencePrice"]) {
          newErrors.referencePrice = validationErrors["$.referencePrice"]?.[0] || validationErrors["referencePrice"]?.[0] || "Giá tham khảo không hợp lệ";
        }
        
        if (Object.keys(newErrors).length > 0) {
          setFoodErrors(newErrors);
        }
      }
      
      const errorMessage = error?.data?.message || error?.data?.title || error?.message || "Không thể thêm món ăn. Vui lòng thử lại!";
      toast.error(errorMessage);
    } finally {
      setIsSubmittingFood(false);
    }
  };


  if (isOwnerInfoLoading && !ownerInfo) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <CustomerSideBar />
        <OnboardingGate />
        <main className="lg:ml-20 flex items-center justify-center min-h-screen">
          <LoadingSpinner size="10" color="pink" />
        </main>
      </div>
    );
  }

  if (isOwnerInfoError && !ownerInfo) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <CustomerSideBar />
        <OnboardingGate />
        <main className="lg:ml-20 flex flex-col items-center justify-center min-h-screen space-y-4">
          <p className="text-gray-600 text-center">
            Không thể tải thông tin nhà hàng. Vui lòng thử lại.
          </p>
          <button
            onClick={refetchOwnerInfo}
            className="px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-500 transition-colors"
          >
            Thử lại
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <CustomerSideBar />
      <OnboardingGate />

      <main className="lg:ml-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden mb-6">
            <img
              src={restaurant.heroImage}
              alt={restaurant.name}
              className="w-full h-80 object-cover"
            />
            <button
              onClick={() => setIsEditOpen(true)}
              className="absolute top-4 right-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white transition-colors"
            >
              <Edit size={16} />
              <span className="text-sm font-medium">Chỉnh sửa trang</span>
            </button>
            <button className="absolute bottom-4 right-4 flex items-center space-x-2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-colors">
              <ImageIcon size={16} />
              <span className="text-sm font-medium">
                Xem ảnh ({restaurant.totalPhotos})
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Restaurant Info Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={restaurant.thumbnail}
                    alt={restaurant.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {restaurant.name}
                      </h1>
                      {restaurant.verified && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            ✓
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">
                        {restaurant.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-bold">{restaurant.rating}</span>
                        <span className="text-gray-500">
                          ({restaurant.totalReviews} đánh giá)
                        </span>
                      </div>
                      <span className="text-gray-300">|</span>
                      <span>
                        <strong>{restaurantPosts.length || 0}</strong> bài viết
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">
                  {restaurant.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{restaurant.address}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Phone className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{restaurant.phone}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{restaurant.openTime}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Globe className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{restaurant.website}</span>
                  </div>
                </div>
              </div>


              {/* Menu Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Món ăn nổi bật
                  </h2>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsAddFoodModalOpen(true)}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      <Plus size={18} />
                      <span>Thêm món</span>
                    </button>
                    <button
                      onClick={() => refetchSignatureFoods()}
                      className="text-sm text-gray-500 hover:text-pink-600 transition-colors"
                      title="Làm mới danh sách món ăn"
                    >
                      Làm mới
                    </button>
                  <Link
                    to={endPoint.RESTAURANT_MENU(restaurant.id)}
                    state={{ restaurant }} // tuỳ chọn: chuyển kèm data
                    className="text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Xem menu đầy đủ →
                  </Link>
                  </div>
                </div>

                {isSignatureFoodsLoading ? (
                  <div className="flex items-center justify-center py-10 text-gray-500">
                    <LoadingSpinner size="8" color="pink" />
                    <span className="ml-3">Đang tải món ăn...</span>
                  </div>
                ) : isSignatureFoodsError ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-500 space-y-3">
                    <p>Không thể tải món ăn. Vui lòng thử lại.</p>
                    <button
                      onClick={() => refetchSignatureFoods()}
                      className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-semibold hover:bg-pink-500 transition-colors"
                    >
                      Thử lại
                    </button>
                  </div>
                ) : menuItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-500 space-y-3">
                    <p>Chưa có món ăn nào.</p>
                    <button
                      onClick={() => setIsAddFoodModalOpen(true)}
                      className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-semibold hover:bg-pink-500 transition-colors"
                    >
                      Thêm món đầu tiên
                    </button>
                  </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative w-full h-150 overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop";
                          }}
                        />
                        {item.isPopular && (
                          <span className="absolute top-3 left-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Phổ biến
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-gray-900 flex-1">
                          {item.name}
                        </h3>
                          <div className="flex items-center space-x-2 ml-2">
                            <button
                              onClick={() => handleEditFood(item)}
                              className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 shadow-lg transition-all hover:scale-110 active:scale-95"
                              title="Chỉnh sửa"
                            >
                              <FaEdit className="text-white text-base" />
                            </button>
                            <button
                              onClick={() => handleDeleteFood(item.id, item.name)}
                              disabled={isDeletingFood}
                              className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center hover:from-red-600 hover:to-red-700 shadow-lg transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                              title="Xóa"
                            >
                              <FaTrash className="text-white text-base" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-pink-600">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </div>

              {/* Restaurant Posts */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                  Bài viết gần đây
                </h2>
                  <button
                    onClick={() => refetchOwnerPosts()}
                    className="text-sm text-gray-500 hover:text-pink-600 transition-colors"
                  >
                    Làm mới
                  </button>
                </div>

                {isOwnerPostsLoading ? (
                  <div className="flex items-center justify-center py-10 text-gray-500">
                    Đang tải bài viết...
                  </div>
                ) : isOwnerPostsError ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-500 space-y-3">
                    <p>Không thể tải bài viết. Vui lòng thử lại.</p>
                    <button
                      onClick={() => refetchOwnerPosts()}
                      className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-semibold hover:bg-pink-500 transition-colors"
                    >
                      Thử lại
                    </button>
                  </div>
                ) : restaurantPosts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-500 space-y-3">
                    <p>Chưa có bài viết nào.</p>
                    <Link
                      to={endPoint.POST}
                      className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-semibold hover:bg-pink-500 transition-colors"
                    >
                      Đăng bài đầu tiên
                    </Link>
                  </div>
                ) : (
                  <>
                <div className="space-y-6">
                  {restaurantPosts.map((post) => (
                    <div
                      key={post.id}
                      className="border-b border-gray-100 pb-6 last:border-0"
                    >
                      <div className="flex items-start space-x-3 mb-4">
                        <img
                          src={restaurant.thumbnail}
                          alt={restaurant.name}
                              className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">
                              {restaurant.name}
                            </span>
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium ${post.badgeColor}`}
                            >
                              {post.badge}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{post.timeAgo}</span>
                            <span>•</span>
                            <MapPin size={12} />
                            <span>{post.location}</span>
                          </div>
                        </div>
                        <button>
                          <MoreHorizontal className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>

                      <h3 className="font-bold text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 mb-4 whitespace-pre-line">
                        {post.content}
                      </p>

                          {post.image && (
                            <div className="mb-4">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full max-w-md h-64 object-cover rounded-xl"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 text-pink-600 hover:bg-pink-50 rounded-xl font-medium transition-colors">
                  Xem thêm bài viết
                </button>
                  </>
                )}
              </div>

              {/* Reviews Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Đánh giá từ khách hàng
                  </h2>
                  <button className="text-pink-600 hover:text-pink-700 font-medium">
                    Xem tất cả
                  </button>
                </div>

                {/* Rating Overview */}
                <div className="flex items-center space-x-2 mb-6">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-bold">
                    {typeof averageRating === 'number' 
                      ? averageRating.toFixed(1) 
                      : averageRating}
                  </span>
                  <span className="text-gray-500">
                    • {ownerReviewsRaw?.length || 0} đánh giá
                  </span>
                </div>

                {/* Star Distribution */}
                <div className="space-y-2 mb-8">
                  {starDistribution.map((item) => (
                    <div
                      key={item.stars}
                      className="flex items-center space-x-3"
                    >
                      <span className="text-sm text-gray-600 w-2">
                        {item.stars}
                      </span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 w-8 text-right">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Review List */}
                {isOwnerReviewsLoading ? (
                  <div className="flex items-center justify-center py-10 text-gray-500">
                    Đang tải đánh giá...
                  </div>
                ) : isOwnerReviewsError ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-500 space-y-3">
                    <p>Không thể tải đánh giá. Vui lòng thử lại.</p>
                    <button
                      onClick={() => refetchOwnerReviews()}
                      className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-semibold hover:bg-pink-500 transition-colors"
                    >
                      Thử lại
                    </button>
                  </div>
                ) : customerReviews.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                    <p>Chưa có đánh giá nào.</p>
                  </div>
                ) : (
                <div className="space-y-6">
                  {customerReviews.map((review) => (
                    <div
                      key={review.id}
                      className={`pb-6 border-b border-gray-100 last:border-0 ${
                        review.isReply
                          ? "ml-12 pl-4 border-l-4 border-pink-200 bg-pink-50/30 rounded-r-xl p-4"
                          : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={review.author.avatar}
                          alt={review.author.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-gray-900">
                              {review.author.name}
                            </span>
                            {review.author.isRestaurant && (
                              <span className="px-2 py-0.5 bg-pink-100 text-pink-600 rounded text-xs font-medium">
                                Chủ nhà hàng
                              </span>
                            )}
                          </div>

                          {review.rating && (
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {review.timeAgo}
                              </span>
                            </div>
                          )}

                          {!review.rating && (
                            <div className="text-sm text-gray-500 mb-2">
                              {review.timeAgo}
                            </div>
                          )}

                          <p className="text-gray-700 mb-3">{review.content}</p>

                          {review.signatureFoodName && (
                            <div className="mb-3">
                              <span className="inline-block px-2 py-1 bg-pink-100 text-pink-600 rounded text-sm font-medium">
                                📍 {review.signatureFoodName}
                              </span>
                            </div>
                          )}

                          {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 mb-3">
                              {review.images.map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt="Review"
                                  className="w-28 h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ))}
                            </div>
                          )}

                          <div className="flex items-center space-x-4 text-sm mb-3">
                            {!review.isReply && review.comments && review.comments.length > 0 && (
                              <span className="text-gray-500">
                                {review.comments.length} {review.comments.length === 1 ? 'bình luận' : 'bình luận'}
                              </span>
                            )}
                            <button
                              onClick={() => handleOpenCommentModal(review.id, review.content)}
                              className="text-pink-600 hover:text-pink-700 font-medium flex items-center space-x-1"
                            >
                              <MessageCircle size={16} />
                              <span>Bình luận</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Comments Section */}
                      {review.comments && review.comments.length > 0 && (
                        <div className="mt-4 ml-12 space-y-4 border-l-2 border-gray-200 pl-4">
                          {review.comments.map((comment) => {
                            const isExpanded = expandedComments[review.id]?.[comment.id] || false;
                            const hasReplies = comment.replies && comment.replies.length > 0;
                            
                            return (
                              <div key={comment.id} className="space-y-3">
                                {/* Comment */}
                                <div className="flex items-start space-x-3">
                                  <img
                                    src={comment.author.avatar}
                                    alt={comment.author.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                      e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face";
                                    }}
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-semibold text-gray-900 text-sm">
                                        {comment.author.name}
                                      </span>
                                      {comment.author.isRestaurant && (
                                        <span className="px-2 py-0.5 bg-pink-100 text-pink-600 rounded text-xs font-medium">
                                          {comment.author.restaurantName || "Chủ nhà hàng"}
                                        </span>
                                      )}
                                      <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
                                    
                                    {/* Show/Hide Replies Button */}
                                    {hasReplies && (
                                      <button
                                        onClick={() => toggleCommentReplies(review.id, comment.id)}
                                        className="text-xs text-blue-600 hover:text-blue-700 font-medium mb-2"
                                      >
                                        {isExpanded ? 'Ẩn' : 'Xem'} {comment.replies.length} {comment.replies.length === 1 ? 'phản hồi' : 'phản hồi'}
                              </button>
                                    )}
                                    
                                    {/* Replies */}
                                    {hasReplies && isExpanded && (
                                      <div className="mt-2 ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
                                        {comment.replies.map((reply) => (
                                          <div key={reply.id} className="flex items-start space-x-3">
                                            <img
                                              src={reply.author.avatar}
                                              alt={reply.author.name}
                                              className="w-7 h-7 rounded-full object-cover"
                                              referrerPolicy="no-referrer"
                                              onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face";
                                              }}
                                            />
                                            <div className="flex-1">
                                              <div className="flex items-center space-x-2 mb-1">
                                                <span className="font-semibold text-gray-900 text-sm">
                                                  {reply.author.name}
                                                </span>
                                                {reply.author.isRestaurant && (
                                                  <span className="px-2 py-0.5 bg-pink-100 text-pink-600 rounded text-xs font-medium">
                                                    {reply.author.restaurantName || "Chủ nhà hàng"}
                                                  </span>
                                                )}
                                                <span className="text-xs text-gray-500">{reply.timeAgo}</span>
                                              </div>
                                              <p className="text-gray-700 text-sm">{reply.content}</p>
                                            </div>
                                          </div>
                                        ))}
                            </div>
                          )}
                        </div>
                      </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Loading Overlay */}
            {isUpdating && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 size={32} className="animate-spin text-pink-600" />
                  <span className="text-gray-600 font-medium">Đang cập nhật thông tin...</span>
                </div>
              </div>
            )}
            {/* Modal Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
                  <div>
                <h2 className="text-2xl font-bold text-gray-900">Chỉnh sửa thông tin nhà hàng</h2>
                <p className="text-gray-500 mt-1">Cập nhật thông tin cơ bản của nhà hàng</p>
              </div>
                        <button
                onClick={handleCloseEditModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
                        </button>
                    </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* General Error Message */}
              {errors.general && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  {errors.general}
                  </div>
              )}

              {/* Image Upload Section */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ảnh nhà hàng
                </label>
                <div className="flex items-center gap-4">
                  {/* Image Preview */}
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-50 flex-shrink-0">
                    {restaurantImagePreview ? (
                      <img
                        src={restaurantImagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : restaurant?.thumbnail ? (
                      <img
                        src={restaurant.thumbnail}
                        alt="Current"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon size={32} />
                      </div>
                    )}
                  </div>
                  
                  {/* Upload Controls */}
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-xl cursor-pointer transition-colors border border-pink-200">
                      <Upload size={18} />
                      <span className="text-sm font-medium">Chọn ảnh</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleRestaurantImageUpload}
                        disabled={isUpdating}
                        className="hidden"
                      />
                    </label>
                    {restaurantImagePreview && (
                      <button
                        type="button"
                        onClick={removeRestaurantImage}
                        disabled={isUpdating}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={18} />
                        <span className="text-sm font-medium">Xóa ảnh</span>
                      </button>
                    )}
                    <p className="text-xs text-gray-500">
                      Chọn ảnh mới để cập nhật ảnh nhà hàng
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên nhà hàng *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({...formData, name: e.target.value});
                      if (errors.name) {
                        const { name, ...rest } = errors;
                        setErrors(rest);
                      }
                    }}
                    disabled={isUpdating}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:ring-pink-500 focus:border-transparent'
                    } ${
                      isUpdating ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="Nhập tên nhà hàng"
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
              </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Địa chỉ *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => {
                      setFormData({...formData, address: e.target.value});
                      if (errors.address) {
                        const { address, ...rest } = errors;
                        setErrors(rest);
                      }
                    }}
                    disabled={isUpdating}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.address
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:ring-pink-500 focus:border-transparent'
                    } ${
                      isUpdating ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="Nhập địa chỉ nhà hàng"
                    required
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
              </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      setFormData({...formData, phoneNumber: e.target.value});
                      if (errors.phoneNumber) {
                        const { phoneNumber, ...rest } = errors;
                        setErrors(rest);
                      }
                    }}
                    disabled={isUpdating}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.phoneNumber
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:ring-pink-500 focus:border-transparent'
                    } ${
                      isUpdating ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="0123 456 789"
                    required
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mô tả {formData.description && (
                      <span className="text-gray-500 font-normal">
                        ({formData.description.trim().length}/2000)
                      </span>
                    )}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({...formData, description: e.target.value});
                      if (errors.description) {
                        const { description, ...rest } = errors;
                        setErrors(rest);
                      }
                    }}
                    disabled={isUpdating}
                    rows={4}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.description
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:ring-pink-500 focus:border-transparent'
                    } ${
                      isUpdating ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="Mô tả về nhà hàng của bạn... (tối thiểu 30 ký tự)"
                    maxLength={2000}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                  {!errors.description && formData.description && (
                    <p className="mt-1 text-xs text-gray-500">
                      {formData.description.trim().length < 30
                        ? `Cần thêm ${30 - formData.description.trim().length} ký tự nữa (tối thiểu 30 ký tự)`
                        : "Mô tả hợp lệ"}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  disabled={isUpdating}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Hủy bỏ
                  </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl transition-all font-semibold text-white ${
                    isUpdating
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-600 to-pink-700 hover:shadow-xl hover:scale-105'
                  }`}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>Lưu thay đổi</span>
                    </>
                  )}
                  </button>
              </div>
            </form>
            </div>
          </div>
      )}

      {/* Add/Edit Food Modal */}
      {(isAddFoodModalOpen || isEditFoodModalOpen) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Loading Overlay */}
            {isSubmittingFood && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 size={32} className="animate-spin text-pink-600" />
                  <span className="text-gray-600 font-medium">
                    {editingFoodId ? "Đang cập nhật món ăn..." : "Đang thêm món ăn..."}
                  </span>
                </div>
              </div>
            )}
            {/* Modal Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingFoodId ? "Chỉnh sửa món ăn" : "Thêm món ăn mới"}
                </h2>
                <p className="text-gray-500 mt-1">
                  {editingFoodId ? "Cập nhật thông tin món ăn" : "Thêm món ăn vào menu của nhà hàng"}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAddFoodModalOpen(false);
                  setIsEditFoodModalOpen(false);
                  setEditingFoodId(null);
                  setFoodFormData({ name: "", description: "", referencePrice: "", imageUrl: "" });
                  removeFoodImage();
                  setFoodErrors({});
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
                  </button>
                </div>

            <form onSubmit={handleFoodSubmit} className="p-8 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hình ảnh món ăn
                </label>
                {!foodImagePreview ? (
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center ${
                    foodErrors.imageUrl 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300'
                  }`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFoodImageUpload}
                      className="hidden"
                      id="food-image"
                    />
                    <label
                      htmlFor="food-image"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Camera className={`w-8 h-8 mb-2 ${
                        foodErrors.imageUrl ? 'text-red-400' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm ${
                        foodErrors.imageUrl ? 'text-red-600' : 'text-gray-600'
                      }`}>Nhấn để chọn ảnh</span>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={foodImagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={removeFoodImage}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {foodErrors.imageUrl && (
                  <p className="mt-1 text-sm text-red-600">{foodErrors.imageUrl}</p>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên món ăn *
                  </label>
                  <input
                    type="text"
                    value={foodFormData.name}
                    onChange={(e) => {
                      setFoodFormData({...foodFormData, name: e.target.value});
                      if (foodErrors.name) {
                        const { name, ...rest } = foodErrors;
                        setFoodErrors(rest);
                      }
                    }}
                    disabled={isSubmittingFood}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      foodErrors.name
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:ring-pink-500 focus:border-transparent'
                    } ${
                      isSubmittingFood ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="VD: Pizza Margherita"
                    required
                  />
                  {foodErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{foodErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mô tả *
                  </label>
                  <textarea
                    value={foodFormData.description}
                    onChange={(e) => {
                      setFoodFormData({...foodFormData, description: e.target.value});
                      if (foodErrors.description) {
                        const { description, ...rest } = foodErrors;
                        setFoodErrors(rest);
                      }
                    }}
                    disabled={isSubmittingFood}
                    rows={4}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${
                      foodErrors.description
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:ring-pink-500 focus:border-transparent'
                    } ${
                      isSubmittingFood ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="Mô tả về món ăn..."
                    required
                  />
                  {foodErrors.description && (
                    <p className="mt-1 text-sm text-red-600">{foodErrors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giá tham khảo (VNĐ) *
                  </label>
                  <input
                    type="number"
                    value={foodFormData.referencePrice}
                    onChange={(e) => {
                      setFoodFormData({...foodFormData, referencePrice: e.target.value});
                      if (foodErrors.referencePrice) {
                        const { referencePrice, ...rest } = foodErrors;
                        setFoodErrors(rest);
                      }
                    }}
                    disabled={isSubmittingFood}
                    min="0"
                    step="1000"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      foodErrors.referencePrice
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:ring-pink-500 focus:border-transparent'
                    } ${
                      isSubmittingFood ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="VD: 285000"
                    required
                  />
                  {foodErrors.referencePrice && (
                    <p className="mt-1 text-sm text-red-600">{foodErrors.referencePrice}</p>
                  )}
                  {!foodErrors.referencePrice && foodFormData.referencePrice && (
                    <p className="mt-1 text-xs text-gray-500">
                      {Number(foodFormData.referencePrice).toLocaleString('vi-VN')} VNĐ
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddFoodModalOpen(false);
                    setIsEditFoodModalOpen(false);
                    setEditingFoodId(null);
                    setFoodFormData({ name: "", description: "", referencePrice: "", imageUrl: "" });
                    removeFoodImage();
                    setFoodErrors({});
                  }}
                  disabled={isSubmittingFood}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingFood}
                  className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl transition-all font-semibold text-white ${
                    isSubmittingFood
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-600 to-pink-700 hover:shadow-xl hover:scale-105'
                  }`}
                >
                  {isSubmittingFood ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>{editingFoodId ? "Đang cập nhật..." : "Đang thêm..."}</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>{editingFoodId ? "Cập nhật món" : "Thêm món"}</span>
                    </>
                  )}
                </button>
                    </div>
            </form>
                </div>
              </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl relative transform transition-all duration-200 scale-100">
            <div className="p-8">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <FaTrash className="text-red-600 text-2xl" />
            </div>
          </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Xác nhận xóa món ăn
              </h2>

              {/* Message */}
              <p className="text-gray-600 text-center mb-6">
                Bạn có chắc chắn muốn xóa món ăn <span className="font-semibold text-gray-900">"{deleteConfirmModal.foodName}"</span> không?
                <br />
                <span className="text-sm text-red-600 mt-2 block">Hành động này không thể hoàn tác.</span>
              </p>

              {/* Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setDeleteConfirmModal({ isOpen: false, foodId: null, foodName: "" })}
                  disabled={isDeletingFood}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={confirmDeleteFood}
                  disabled={isDeletingFood}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                >
                  {isDeletingFood ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Đang xóa...</span>
                    </>
                  ) : (
                    <>
                      <FaTrash size={16} />
                      <span>Xóa món ăn</span>
                    </>
                  )}
                </button>
        </div>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {commentModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl relative">
            {/* Loading Overlay */}
            {isSubmittingComment && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 size={32} className="animate-spin text-pink-600" />
                  <span className="text-gray-600 font-medium">Đang gửi bình luận...</span>
                </div>
              </div>
            )}
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Bình luận</h2>
                <p className="text-sm text-gray-500 mt-1">Trả lời đánh giá của khách hàng</p>
              </div>
              <button
                onClick={handleCloseCommentModal}
                disabled={isSubmittingComment}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
              >
                <X size={24} />
              </button>
            </div>

            {/* Review Preview */}
            {commentModal.reviewContent && (
              <div className="p-6 bg-gray-50 border-b border-gray-100">
                <p className="text-sm text-gray-600 mb-2 font-medium">Đánh giá:</p>
                <p className="text-gray-700 line-clamp-3">{commentModal.reviewContent}</p>
              </div>
            )}

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nội dung bình luận *
                </label>
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  disabled={isSubmittingComment}
                  rows={5}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${
                    isSubmittingComment
                      ? 'bg-gray-100 cursor-not-allowed border-gray-200'
                      : 'border-gray-200 focus:ring-pink-500 focus:border-transparent'
                  }`}
                  placeholder="Nhập nội dung bình luận của bạn..."
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseCommentModal}
                  disabled={isSubmittingComment}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingComment || !commentContent.trim()}
                  className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl transition-all font-semibold text-white ${
                    isSubmittingComment || !commentContent.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-600 to-pink-700 hover:shadow-xl hover:scale-105'
                  }`}
                >
                  {isSubmittingComment ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Gửi bình luận</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantProfile;
