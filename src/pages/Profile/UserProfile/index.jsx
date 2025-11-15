import React, { useState } from "react";
import {
  Edit,
  MoreHorizontal,
  MapPin,
  X,
  Camera,
  Save,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  TrendingUp,
  Award,
  Calendar,
  Mail,
  Phone,
  Sparkles,
  Image as ImageIcon,
  Star,
  Trash2,
  Loader2,
  Tags
} from "lucide-react";
import CustomerSideBar from "@layout/SideBar";
import { useGetMeQuery, useUpdateProfileMutation, useUpdateAvatarMutation, useGetMyCommunityPostsQuery, useGetUserCommunityPostsQuery, useGetMyReviewsQuery, useDeletePostMutation, useLazyGetUserSelectedTagsQuery } from "@redux/api/User/userApi";
import { BASE_URL } from "@redux/api/baseApi";
import { useDispatch } from "react-redux";
import { endPoint } from "@routes/router";
import { cleanLogout } from "@utils/cleanLogout";
import toast from "react-hot-toast";
import OnboardingModal from "@pages/Auth/OnboardingModal";
// remove presign/direct upload usage

function stripTrailingApi(url) {
  if (!url) return "";
  return String(url).replace(/\/?api\/?$/, "");
}

function buildAssetUrl(relativePath) {
  const configuredBase = import.meta.env.VITE_API_BASE_URL || BASE_URL;
  const origin = configuredBase.startsWith("http")
    ? configuredBase
    : (import.meta.env.VITE_API_BASE_URL || "https://angiday-production-c5c0.up.railway.app");
  const baseNoApi = stripTrailingApi(origin).replace(/\/$/, "");
  const cleanPath = String(relativePath || "").replace(/^\/+/, "");
  return `${baseNoApi}/${cleanPath}`;
}

function UserProfile() {
  const { data: me, isLoading, isError, refetch } = useGetMeQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [updateAvatar] = useUpdateAvatarMutation();
  // Skip queries that restaurant owners might not have access to
  const isRestaurantOwner = me?.roleId === 1 || 
                           me?.roleName?.toLowerCase() === "restaurant owner" ||
                           me?.role?.toLowerCase() === "restaurant owner";
  const { data: myPosts, isLoading: postsLoading, error: postsError } = useGetMyCommunityPostsQuery(undefined, {
    skip: isRestaurantOwner
  });
  // Alternative endpoint for user-specific posts (disabled due to 404)
  const { data: userPosts, isLoading: userPostsLoading } = useGetUserCommunityPostsQuery(me?.id, {
    skip: true // Disabled because endpoint doesn't exist on backend
  });
  const { data: myReviews, isLoading: reviewsLoading, error: reviewsError } = useGetMyReviewsQuery(undefined, {
    skip: isRestaurantOwner
  });
  const [deletePost] = useDeletePostMutation();
  const dispatch = useDispatch();
  // remove presign/direct upload usage
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "",
    dateOfBirth: "",
  });
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [showEditTagsModal, setShowEditTagsModal] = useState(false);
  const [triggerGetUserTags, { data: userTagsData, isFetching: isFetchingUserTags }] = useLazyGetUserSelectedTagsQuery();

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdownId && !event.target.closest('.relative')) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && showDeleteModal) {
        handleCancelDelete();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showDeleteModal]);

  // Initialize form data when user data loads
  React.useEffect(() => {
    if (me) {
      setFormData({
        fullName: me.fullName || "",
        username: me.username || "",
        email: me.email || "",
        phoneNumber: me.phoneNumber || "",
        address: me.address || "",
        gender: me.gender || "",
        dateOfBirth: me.dateOfBirth || "",
      });
      if (me.avatarUrl && !avatarPreview) {
        const base = String(BASE_URL || "").replace(/\/$/, "");
        setAvatarSrc(`${base}/Storage/view?key=${encodeURIComponent(me.avatarUrl)}`);
      }
    }
  }, [me, avatarPreview]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAvatar(file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      // 1) update profile fields
      await updateProfile(formData).unwrap();

      // 2) upload avatar via PUT /api/User/me/avatar (multipart)
      if (selectedAvatar) {
        const formDataAvatar = new FormData();
        formDataAvatar.append('Avatar', selectedAvatar);
        await updateAvatar(formDataAvatar).unwrap();
      }

      setIsEditOpen(false);
      setSelectedAvatar(null);
      setAvatarPreview(null);
      setShowLogoutToast(true);
      // delay a bit to let user read toast then logout and redirect to login
      setTimeout(() => {
        cleanLogout(dispatch, { redirect: endPoint.LOGIN });
      }, 1200);
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Không thể cập nhật hồ sơ. Vui lòng thử lại!');
    } finally {
      setIsUpdating(false);
    }
  };

  // Calculate separate counts for posts and reviews
  const postsCount = React.useMemo(() => {
    const postsData = userPosts || myPosts;
    if (!postsData || postsData.length === 0) return 0;
    const filteredPosts = userPosts ? postsData : postsData.filter(post => post.userId === me?.id);
    return filteredPosts.length;
  }, [myPosts, userPosts, me?.id]);

  const reviewsCount = React.useMemo(() => {
    if (!myReviews || myReviews.length === 0) return 0;
    return myReviews.filter(review => review.userId === me?.id).length;
  }, [myReviews, me?.id]);

  // Helper để format role label với VIP status
  const getRoleLabel = (role, isCharged) => {
    const r = (role || "customer").trim().toLowerCase();
    if (r === "customer" && isCharged === true) {
      return "Khách hàng VIP";
    }
    if (r === "restaurant owner" || r === "owner") {
      return "Đối tác nhà hàng";
    }
    if (r === "admin" || r === "administrator") {
      return "Quản trị viên";
    }
    return "Khách hàng";
  };

  const user = {
    name: me?.fullName || me?.fullname || me?.username || "Người dùng",
    handle: me?.email ? `@${String(me.email).split("@")[0]}` : "@user",
    role: getRoleLabel(me?.roleName || me?.role, me?.isCharged),
    tagline: me?.address || me?.city || "Food Lover 🍕",
    avatarBg: "from-pink-500 via-purple-500 to-indigo-500",
    cover: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=360&fit=crop",
    stats: {
      posts: postsCount,
      reviews: reviewsCount,
      followers: me?.followers ?? me?.totalFollowers ?? 1258,
      following: me?.following ?? me?.totalFollowing ?? 436,
    },
    bioBadges: [
      me?.address || me?.city || "TP.HCM",
      me?.gender || "",
      me?.phoneNumber ? `📞 ${me.phoneNumber}` : "",
    ].filter(Boolean),
    contact: me?.email || "",
    verified: true,
  };

  // Map API posts to display format
  const displayPosts = React.useMemo(() => {
    // Try userPosts first (user-specific), then fallback to myPosts
    const postsData = userPosts || myPosts;
    
    console.log("🔍 UserProfile Posts Debug:", {
      myPosts: myPosts?.length || 0,
      userPosts: userPosts?.length || 0,
      postsError,
      usingData: userPosts ? 'userPosts' : 'myPosts',
      meId: me?.id,
      allPosts: postsData?.map(p => ({ id: p.id, userId: p.userId, content: p.content?.substring(0, 30) }))
    });
    
    if (!postsData || postsData.length === 0) return [];
    
    // Filter posts by current user ID if we're using myPosts (which contains all posts)
    const filteredPosts = userPosts ? postsData : postsData.filter(post => post.userId === me?.id);
    
    console.log("🔍 Filtered Posts:", {
      originalCount: postsData.length,
      filteredCount: filteredPosts.length,
      currentUserId: me?.id,
      filteredPosts: filteredPosts.map(p => ({ id: p.id, userId: p.userId, content: p.content?.substring(0, 30) }))
    });
    
    return filteredPosts.map((post, index) => ({
      id: post.id || index + 1,
      title: post.type || 'Bài viết',
      content: post.content || '',
      image: post.imageUrl && !post.imageUrl.startsWith('blob:') 
        ? `${BASE_URL}/Storage/view?key=${post.imageUrl}` 
        : null,
      likes: post.totalLikes || 0,
      comments: post.totalComments || 0,
      shares: 0, // API không trả về số share
      timeAgo: post.createdAt 
        ? new Date(post.createdAt).toLocaleString('vi-VN', {
            day: 'numeric',
            month: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        : 'Vừa xong'
    }));
  }, [myPosts, userPosts, postsError, me?.id]);

  // Map API reviews to display format
  const displayReviews = React.useMemo(() => {
    if (!myReviews || myReviews.length === 0) return [];
    
    // Filter reviews by current user ID
    const filteredReviews = myReviews.filter(review => review.userId === me?.id);
    
    console.log("🔍 UserProfile Reviews Debug:", {
      allReviews: myReviews?.length || 0,
      filteredReviews: filteredReviews.length,
      currentUserId: me?.id,
      reviews: filteredReviews.map(r => ({ id: r.id, userId: r.userId, content: r.content?.substring(0, 30), rating: r.rating }))
    });
    
    return filteredReviews.map((review, index) => ({
      id: review.id || index + 1,
      title: 'Đánh giá nhà hàng',
      content: review.content || '',
      rating: review.rating || 5,
      image: review.imageUrl && !review.imageUrl.startsWith('blob:') && review.imageUrl !== 'temp_image_url'
        ? `${BASE_URL}/Storage/view?key=${review.imageUrl}` 
        : null,
      likes: review.totallikes || 0,
      comments: review.totalComments || 0,
      shares: 0,
      timeAgo: review.createdAt 
        ? new Date(review.createdAt).toLocaleString('vi-VN', {
            day: 'numeric',
            month: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        : 'Vừa xong'
    }));
  }, [myReviews, me?.id]);

  // Pagination logic
  const currentData = activeTab === 'reviews' ? displayReviews : displayPosts;
  const totalPages = Math.ceil(currentData.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentItems = currentData.slice(startIndex, endIndex);

  // Reset to page 1 when data changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [currentData.length]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of posts section
    const postsSection = document.getElementById('posts-section');
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDeletePost = async (postId, postType) => {
    setIsDeleting(true);
    try {
      await deletePost(postId).unwrap();
      toast.success(`${postType === 'reviews' ? 'Bài đánh giá' : 'Bài viết'} đã được xóa thành công!`);
      setOpenDropdownId(null);
      setShowDeleteModal(false);
      setDeleteItem(null);
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Không thể xóa bài viết. Vui lòng thử lại!');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = (postId, postType) => {
    setDeleteItem({ id: postId, type: postType });
    setShowDeleteModal(true);
    setOpenDropdownId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteItem) {
      handleDeletePost(deleteItem.id, deleteItem.type);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteItem(null);
  };

  // Helper function for input styling
  const getInputClassName = (baseClass) => {
    return `${baseClass} ${
      isUpdating ? 'bg-gray-100 cursor-not-allowed' : ''
    }`;
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 min-h-screen">
        <CustomerSideBar />
        <main className="lg:ml-20">
          <div className="max-w-6xl mx-auto px-4 pt-8">
            <div className="animate-pulse space-y-4">
              <div className="h-64 bg-gray-200/60 rounded-3xl" />
              <div className="h-32 bg-gray-200/60 rounded-3xl" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 min-h-screen">
        <CustomerSideBar />
        <main className="lg:ml-20">
          <div className="max-w-6xl mx-auto px-4 pt-10">
            <div className="p-6 rounded-2xl bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700">
              <p className="font-semibold mb-2">Không tải được thông tin hồ sơ</p>
              <button onClick={() => refetch()} className="underline hover:no-underline">
                Thử lại
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 min-h-screen">
      <CustomerSideBar />

      <main className="lg:ml-20">
        {/* Hero Section */}
        <section className="relative">
          {/* Cover Image */}
          <div className="h-72 md:h-96 relative overflow-hidden">
            <img
              src={user.cover}
              alt="cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Edit Cover Button */}
            <button className="absolute top-6 right-6 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all flex items-center space-x-2">
              <Camera size={16} />
              <span className="text-sm font-medium">Đổi ảnh bìa</span>
            </button>
          </div>

          {/* Profile Card */}
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="relative -mt-32">
              <div className="bg-white/95 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  
                  {/* Left: Avatar + Info */}
                  <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="relative shrink-0 -mt-20">
                      <div className="relative">
                        {(avatarPreview || avatarSrc) ? (
                          <img
                            src={avatarPreview || avatarSrc}
                            alt={user.name}
                            className="w-32 h-32 md:w-36 md:h-36 rounded-3xl object-cover ring-8 ring-white shadow-2xl"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-32 h-32 md:w-36 md:h-36 bg-gradient-to-br ${user.avatarBg} rounded-3xl flex items-center justify-center text-white text-5xl font-bold ring-8 ring-white shadow-2xl ${(avatarPreview || avatarSrc) ? 'hidden' : 'flex'}`}
                >
                  {user.name?.[0] || "U"}
                </div>
                        
                        {/* Online Status */}
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full ring-4 ring-white"></div>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 pt-2">
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                      {user.name}
                    </h1>
                        {user.verified && (
                          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center ring-4 ring-blue-100">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 rounded-full">
                          <Award size={14} className="text-white" />
                          <span className="text-xs font-bold text-white">VIP</span>
                  </div>
                  </div>

                      <p className="text-gray-600 text-lg mb-3">{user.handle} • {user.role}</p>
                      
                      <p className="text-gray-700 mb-4 text-lg">{user.tagline}</p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border border-purple-200">
                          <MapPin size={16} />
                          <span className="font-medium">{user.bioBadges[0]}</span>
                    </span>
                        {user.bioBadges.slice(1).map((badge, i) => (
                      <span
                        key={i}
                            className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 border border-gray-200 font-medium"
                      >
                            {badge}
                      </span>
                    ))}
                  </div>

                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail size={16} />
                        <span className="font-medium">{user.contact}</span>
                  </div>
                </div>
              </div>

                  {/* Right: Stats + Actions */}
                  <div className="w-full md:w-auto space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                      <div className="bg-white px-4 py-3 text-center">
                        <div className="text-2xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                          {user.stats.posts}
                        </div>
                        <div className="text-xs text-gray-600 font-medium">Bài viết</div>
                      </div>
                      <div className="bg-white px-4 py-3 text-center">
                        <div className="text-2xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                          {user.stats.reviews}
                        </div>
                        <div className="text-xs text-gray-600 font-medium">Đánh giá</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setIsEditOpen(true)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold"
                      >
                        <Edit size={18} />
                        <span>Chỉnh sửa</span>
                      </button>
                      <button
                        onClick={() => { setShowTagsModal(true); triggerGetUserTags(); }}
                        className="px-4 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
                      >
                        <Tags size={18} />
                        <span>Tag đã chọn</span>
                </button>
              </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-sm border border-white/60">
            <div className="flex space-x-2">
              {[
                { id: 'posts', label: 'Bài viết', icon: ImageIcon },
                { id: 'reviews', label: 'Bài đánh giá', icon: Star },
                { id: 'favorites', label: 'Yêu thích', icon: Heart },
                { id: 'saved', label: 'Đã lưu', icon: Bookmark }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section id="posts-section" className="max-w-6xl mx-auto px-4 md:px-6 mt-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(postsLoading || userPostsLoading || reviewsLoading) ? (
              <>
                <div className="animate-pulse bg-white/80 rounded-3xl h-80" />
                <div className="animate-pulse bg-white/80 rounded-3xl h-80" />
              </>
            ) : currentData.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <div className="text-gray-500 text-lg mb-2">
                  {activeTab === 'reviews' ? 'Chưa có bài đánh giá nào' : 'Chưa có bài viết nào'}
                </div>
                <div className="text-gray-400 text-sm">
                  {activeTab === 'reviews' ? 'Hãy đánh giá nhà hàng bạn đã thử!' : 'Hãy chia sẻ trải nghiệm ẩm thực của bạn!'}
                </div>
              </div>
            ) : (
              currentItems.map((item) => (
              <article
                key={item.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/60"
              >
                {/* Header */}
                <header className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                    <div className="relative">
                      {(avatarPreview || avatarSrc) ? (
                        <img
                          src={avatarPreview || avatarSrc}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow"
                        />
                      ) : (
                        <div className={`w-12 h-12 bg-gradient-to-br ${user.avatarBg} rounded-full flex items-center justify-center text-white font-semibold shadow`}>
                  {user.name?.[0] || "U"}
                        </div>
                      )}
                </div>
                <div>
                      <div className="font-bold text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{item.timeAgo}</div>
                </div>
              </div>
                  <div className="relative">
                    <button 
                      onClick={() => setOpenDropdownId(openDropdownId === item.id ? null : item.id)}
                      className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                      <MoreHorizontal size={20} className="text-gray-500" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {openDropdownId === item.id && (
                      <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 min-w-[160px]">
                        <button
                          onClick={() => handleDeleteClick(item.id, activeTab)}
                          disabled={isDeleting}
                          className={`w-full px-4 py-2 text-left flex items-center gap-2 transition-colors ${
                            isDeleting
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <Trash2 size={16} />
                          <span>Xóa {activeTab === 'reviews' ? 'đánh giá' : 'bài viết'}</span>
              </button>
                      </div>
                    )}
                  </div>
            </header>

                {/* Content */}
                <div className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    {activeTab === 'reviews' && item.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${i < item.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{item.content}</p>
            </div>

                {/* Image */}
                {item.image && (
                  <div className="relative h-64 overflow-hidden">
              <img
                      src={item.image}
                      alt={item.title}
                className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                )}

                {/* Actions */}
                <footer className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors group">
                      <Heart size={20} className="group-hover:fill-current" />
                      <span className="font-medium">{item.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <MessageCircle size={20} />
                      <span className="font-medium">{item.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                      <Share size={20} />
                      <span className="font-medium">{item.shares}</span>
                    </button>
            </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Bookmark size={20} />
                  </button>
                </footer>
          </article>
              ))
            )}
          </div>
          
          {/* Pagination */}
          {!(postsLoading || userPostsLoading || reviewsLoading) && currentData.length > 0 && totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center space-y-4">
              {/* Page info */}
              <div className="text-sm text-gray-600">
                Hiển thị {startIndex + 1}-{Math.min(endIndex, currentData.length)} trong {currentData.length} {activeTab === 'reviews' ? 'bài đánh giá' : 'bài viết'}
              </div>
              
              {/* Pagination buttons */}
              <div className="flex items-center space-x-2">
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Trước
                </button>
                
                {/* Page numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const shouldShow = 
                      page === 1 || 
                      page === totalPages || 
                      Math.abs(page - currentPage) <= 1;
                    
                    if (!shouldShow) {
                      // Show ellipsis for gaps
                      if (page === 2 && currentPage > 4) {
                        return <span key={page} className="px-2 py-2 text-gray-400">...</span>;
                      }
                      if (page === totalPages - 1 && currentPage < totalPages - 3) {
                        return <span key={page} className="px-2 py-2 text-gray-400">...</span>;
                      }
                      return null;
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-lg font-medium transition-all ${
                          page === currentPage
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                
                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Enhanced Edit Profile Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Loading Overlay */}
            {isUpdating && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 size={32} className="animate-spin text-blue-600" />
                  <span className="text-gray-600 font-medium">Đang cập nhật hồ sơ...</span>
                </div>
              </div>
            )}
            {/* Modal Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Chỉnh sửa hồ sơ</h2>
                <p className="text-gray-500 mt-1">Cập nhật thông tin cá nhân của bạn</p>
              </div>
              <button
                onClick={() => setIsEditOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : me?.avatarUrl ? (
                      <img src={buildAssetUrl(me.avatarUrl)} alt="Current" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-gray-500">
                        {formData.fullName?.[0] || "U"}
                      </span>
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl cursor-pointer hover:shadow-lg transition-all">
                    <Camera size={18} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Ảnh đại diện</p>
                  <p className="text-gray-500 mt-1">PNG, JPG tối đa 5MB</p>
                  <p className="text-sm text-gray-400 mt-1">Khuyến nghị: 400x400px</p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    disabled={isUpdating}
                    className={getInputClassName("w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all")}
                    placeholder="Nhập họ tên đầy đủ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên người dùng *
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0123 456 789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="TP. Hồ Chí Minh"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giới tính
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl transition-all font-semibold ${
                    isUpdating
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-xl hover:scale-105'
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

      {showLogoutToast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2 rounded-xl shadow bg-amber-500 text-white font-medium">
          Vui lòng đăng nhập lại để tiếp tục
        </div>
      )}

      {/* Selected Tags Modal */}
      {showTagsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowTagsModal(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Sở thích đã chọn</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setShowTagsModal(false); setShowEditTagsModal(true); }}
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium hover:shadow"
                >
                  Chỉnh sửa tag
                </button>
                <button onClick={() => setShowTagsModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6">
              {isFetchingUserTags ? (
                <div className="py-8 text-center text-gray-500">Đang tải...</div>
              ) : (
                <div className="space-y-5">
                  {(() => {
                    const list = Array.isArray(userTagsData) ? userTagsData : userTagsData?.data || [];
                    const grouped = list.reduce((acc, it) => {
                      const cat = it.categoryName || "Khác";
                      if (!acc[cat]) acc[cat] = [];
                      acc[cat].push(it);
                      return acc;
                    }, {});
                    const entries = Object.entries(grouped);
                    if (entries.length === 0) return <div className="text-gray-500">Chưa có tag nào.</div>;
                    return entries.map(([cat, arr]) => (
                      <div key={cat}>
                        <div className="text-sm font-semibold text-gray-700 mb-2">{cat}</div>
                        <div className="flex flex-wrap gap-2">
                          {arr.map((t) => (
                            <span key={t.tagId} className="px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200 text-sm">
                              #{String(t.tagName || "").replace(/^#/, "")}
                            </span>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {showDeleteModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={!isDeleting ? handleCancelDelete : undefined}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100 animate-in zoom-in-95 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading Overlay */}
            {isDeleting && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 size={32} className="animate-spin text-red-600" />
                  <span className="text-gray-600 font-medium">Đang xóa...</span>
                </div>
              </div>
            )}
            {/* Modal Header */}
            <div className="p-8 text-center">
              {/* Warning Icon */}
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Trash2 size={32} className="text-red-600" />
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Xác nhận xóa
              </h3>
              
              {/* Message */}
              <p className="text-gray-600 text-lg leading-relaxed">
                Bạn có chắc chắn muốn xóa {deleteItem?.type === 'reviews' ? 'bài đánh giá' : 'bài viết'} này không?
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Hành động này không thể hoàn tác.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 p-8 pt-0">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-6 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className={`flex-1 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                  isDeleting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-lg transform hover:scale-105'
                }`}
              >
                {isDeleting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Đang xóa...</span>
                  </div>
                ) : (
                  'Xóa'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tags Modal (reuses Onboarding flow with validation) */}
      {showEditTagsModal && (
        <OnboardingModal open={showEditTagsModal} onClose={() => setShowEditTagsModal(false)} userId={me?.id} forceComplete={false} />
      )}
    </div>
  );
}

export default UserProfile;
