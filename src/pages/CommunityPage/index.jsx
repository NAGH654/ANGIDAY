import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
  Star,
  Search,
  Users,
  Home,
  Settings,
  User,
  ChevronDown,
  LogOut,
  CreditCard,
  Bell,
  TrendingUp,
  Award,
  Eye,
  Clock,
  MapPin,
  ThumbsUp,
  Camera,
  Zap,
} from "lucide-react";

// Sidebar Component
import CustomerSideBar from "@layout/CustomerSideBar";
import { endPoint } from "@routes/router";
import { Link, useNavigate } from "react-router-dom";

// Main Community Page Component
function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: "AnGiDay",
    email: "AnGiDay1205@gmail.com",
    avatar: "A",
    status: "Cá nhân",
    isPremium: false,
    notifications: 3,
  };

  // Enhanced dropdown animation
  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsDropdownOpen(false), 200);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAnimating(false);
        setTimeout(() => setIsDropdownOpen(false), 200);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      id: "profile",
      label: "Xem trang cá nhân",
      icon: <User size={18} />,
      description: "Quản lý thông tin cá nhân",
      onClick: () => {
        console.log("Navigate to profile");
        setIsAnimating(false);
        setTimeout(() => setIsDropdownOpen(false), 200);
      },
    },
    {
      id: "package",
      label: "Mua gói",
      icon: <CreditCard size={18} />,
      description: "Nâng cấp tài khoản Premium",
      badge: "Hot",
      onClick: () => {
        navigate(endPoint.PACKAGE);
        setIsAnimating(false);
        setTimeout(() => setIsDropdownOpen(false), 200);
      },
    },
    {
      id: "settings",
      label: "Cài đặt",
      icon: <Settings size={18} />,
      description: "Tùy chỉnh trải nghiệm",
      onClick: () => {
        console.log("Navigate to settings");
        setIsAnimating(false);
        setTimeout(() => setIsDropdownOpen(false), 200);
      },
    },
    {
      id: "logout",
      label: "Đăng xuất",
      icon: <LogOut size={18} />,
      description: "Thoát khỏi tài khoản",
      onClick: () => {
        navigate(endPoint.LOGIN);
        setIsAnimating(false);
        setTimeout(() => setIsDropdownOpen(false), 200);
      },
      danger: true,
    },
  ];

  // Enhanced community posts data with real images
  const posts = [
    {
      id: 1,
      author: {
        name: "Alex Nguyen",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
        time: "5 phút trước",
        verified: true,
        location: "Quận 1, TP.HCM",
      },
      title: "Top 5 món ăn ngon ở Quận 1",
      content:
        "Chia sẻ những món ăn ngon nhất mà tôi đã thử ở Quận 1. Từ bánh mì, phở đến các món Tây, tất cả đều rất đáng để thử và để lại ấn tượng khó quên.",
      foodList: [
        "1. Bún Bò Huế Đông Ba - Hương vị đậm đà chính gốc",
        "2. Cơm Tấm Ba Ghiền - Cơm tấm ngon nhất Sài Gòn",
        "3. Phở Lệ - Phở bò truyền thống từ 1960",
        "4. Pizza 4P's Saigon - Pizza phong cách Nhật độc đáo",
        "5. Bún Thịt Nướng Chị Thông - Bánh tráng cuốn tuyệt vời",
      ],
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
      interactions: {
        likes: 245,
        comments: 32,
        shares: 18,
        saves: 56,
      },
      isLiked: false,
      isSaved: false,
      tags: ["#QuanAn", "#Quan1", "#Review"],
      isPopular: true,
    },
    {
      id: 2,
      author: {
        name: "Mai Linh",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=60&h=60&fit=crop&crop=face",
        time: "2 giờ trước",
        verified: false,
        location: "Quận 3, TP.HCM",
      },
      title: "Cách làm bánh mì Việt Nam chính gốc",
      content:
        "Hướng dẫn chi tiết cách làm bánh mì Việt Nam từ A-Z. Từ cách làm bánh, pha nước chấm đến cách trang trí để có được chiếc bánh mì hoàn hảo như ngoài hàng.",
      foodList: [],
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop",
      interactions: {
        likes: 189,
        comments: 45,
        shares: 12,
        saves: 78,
      },
      isLiked: true,
      isSaved: false,
      tags: ["#CongThuc", "#BanhMi", "#VietNam"],
      isPopular: false,
    },
    {
      id: 3,
      author: {
        name: "Phong Le",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
        time: "1 ngày trước",
        verified: true,
        location: "Quận 7, TP.HCM",
      },
      title: "Khám phá ẩm thực đường phố Sài Gòn",
      content:
        "Một chuyến đi khám phá những món ăn đường phố độc đáo và hấp dẫn nhất tại Sài Gòn. Từ những xe bánh mì đến các quán ăn vỉa hè truyền thống.",
      foodList: [],
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
      interactions: {
        likes: 156,
        comments: 28,
        shares: 9,
        saves: 34,
      },
      isLiked: false,
      isSaved: true,
      tags: ["#DuongPho", "#SaiGon", "#AmThuc"],
      isPopular: false,
    },
  ];

  // Enhanced top users data
  const topUsers = [
    {
      name: "Alex Nguyen",
      points: "5.923.300",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      badge: "👑",
      trend: "+2.1k",
    },
    {
      name: "Mai Linh",
      points: "4.856.200",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=40&h=40&fit=crop&crop=face",
      badge: "🥈",
      trend: "+1.8k",
    },
    {
      name: "Phong Le",
      points: "4.234.100",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      badge: "🥉",
      trend: "+1.5k",
    },
    {
      name: "Linh Tran",
      points: "3.678.900",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      badge: "⭐",
      trend: "+1.2k",
    },
    {
      name: "Tuấn Vo",
      points: "3.234.500",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      badge: "⭐",
      trend: "+980",
    },
  ];

  const [postList, setPostList] = useState(posts);

  const handleLike = (postId) => {
    setPostList((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              interactions: {
                ...post.interactions,
                likes: post.isLiked
                  ? post.interactions.likes - 1
                  : post.interactions.likes + 1,
              },
            }
          : post
      )
    );
  };

  const handleSave = (postId) => {
    setPostList((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, isSaved: !post.isSaved } : post
      )
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20 min-h-screen flex">
      {/* Sidebar */}
      <CustomerSideBar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-20">
        {/* Header - Keeping the existing header */}
        <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100/80 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-2xl relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors duration-300"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm địa điểm ăn uống..."
                className="w-full h-12 pl-12 pr-6 bg-gray-50/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl text-gray-700 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-400 focus:bg-white/90
                hover:border-pink-300 hover:bg-white/70
                transition-all duration-300 ease-out"
              />
            </div>

            {/* User Profile Section */}
            <div className="flex items-center space-x-4 ml-6">
              {/* Notifications */}
              <button className="relative p-2 rounded-full hover:bg-gray-100/80 transition-colors duration-200">
                <Bell size={20} className="text-gray-600" />
                {user.notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {user.notifications}
                  </span>
                )}
              </button>

              {/* User Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-3 p-2 pr-3 rounded-2xl hover:bg-gray-50/80 transition-all duration-200 group"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-semibold">
                        {user.avatar}
                      </span>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>

                  <div className="hidden md:block text-left">
                    <p className="font-semibold text-gray-900 text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.status}</p>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-all duration-300 group-hover:text-gray-600 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Enhanced Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-40"></div>

                    <div
                      className={`absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-3xl shadow-2xl py-2 z-50 transform transition-all duration-300 ease-out ${
                        isAnimating
                          ? "scale-100 opacity-100 translate-y-0"
                          : "scale-95 opacity-0 -translate-y-2"
                      }`}
                    >
                      <div className="relative px-6 py-5 bg-gradient-to-br from-gray-50/80 to-white/60 backdrop-blur-sm mx-2 rounded-2xl mb-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-2xl"></div>

                        <div className="relative">
                          <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">
                            Đăng nhập bằng tính
                          </p>

                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">
                                  {user.avatar}
                                </span>
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-bold text-gray-900 truncate text-lg">
                                  {user.name}
                                </h3>
                                {user.isPremium && (
                                  <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full">
                                    PRO
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 font-medium">
                                {user.status}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-2">
                        <div className="px-4 py-2 mb-2">
                          <p className="text-sm text-gray-500 font-semibold">
                            Tài khoản của bạn
                          </p>
                        </div>

                        <div className="space-y-1">
                          {menuItems.map((item) => (
                            <button
                              key={item.id}
                              onClick={item.onClick}
                              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-200 group relative overflow-hidden ${
                                item.danger
                                  ? "text-red-600 hover:bg-red-50/80 hover:text-red-700"
                                  : "text-gray-700 hover:bg-gray-50/80 hover:text-gray-900"
                              }`}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                              <div
                                className={`p-2 rounded-xl transition-all duration-200 ${
                                  item.danger
                                    ? "bg-red-100/60 text-red-500 group-hover:bg-red-200/80"
                                    : "bg-gray-100/60 text-gray-600 group-hover:bg-gray-200/80"
                                }`}
                              >
                                {item.icon}
                              </div>

                              <div className="flex-1 text-left">
                                <div className="flex items-center space-x-2">
                                  <span className="font-semibold">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className="px-2 py-0.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full animate-pulse">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {item.description}
                                </p>
                              </div>

                              <ChevronDown
                                size={16}
                                className="text-gray-400 -rotate-90 group-hover:translate-x-1 transition-transform duration-200"
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="px-6 py-3 mt-2 border-t border-gray-100/60">
                        <p className="text-xs text-gray-400 text-center">
                          AnGiDay v2.1.0 • Made with 💖
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
          {/* Left Content - Posts */}
          <div className="flex-1 max-w-3xl">
            {/* Create Post Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 p-6 mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">A</span>
                </div>
                <div className="flex-1">
                  <p className="w-full p-4 bg-gray-50/80 border border-gray-200 rounded-2xl text-gray-500 italic">
                    Chia sẻ trải nghiệm ẩm thực của bạn...
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Link
                  to={endPoint.POST}
                  className="inline-block px-8 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Đăng bài
                </Link>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-8">
              {postList.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Popular Badge */}
                  {post.isPopular && (
                    <div className="absolute top-6 left-6 z-10 flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      <Award size={12} />
                      <span>PHỔ BIẾN</span>
                    </div>
                  )}

                  {/* Post Header */}
                  <div className="p-8 pb-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-md"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-gray-900 text-lg">
                              {post.author.name}
                            </h3>
                            {post.author.verified && (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{post.author.time}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <MapPin size={14} />
                              <span>{post.author.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <MoreHorizontal size={20} className="text-gray-500" />
                      </button>
                    </div>

                    {/* Post Content */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                      {post.content}
                    </p>

                    {post.foodList.length > 0 && (
                      <div className="bg-gray-50/80 rounded-2xl p-6 mb-6">
                        <div className="space-y-3">
                          {post.foodList.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl"
                            >
                              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                {index + 1}
                              </div>
                              <p className="text-gray-800 font-medium">
                                {item.substring(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex items-center space-x-3 mb-6">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-sm font-medium rounded-2xl hover:from-pink-200 hover:to-purple-200 cursor-pointer transition-all duration-200 hover:scale-105"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Post Image */}
                  <div className="px-8 pb-6">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full h-80 object-cover rounded-3xl shadow-lg group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>

                  {/* Post Stats */}
                  <div className="px-8 pb-4">
                    <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100/60 pt-4">
                      <div className="flex items-center space-x-6">
                        <span>{post.interactions.likes} lượt thích</span>
                        <span>{post.interactions.comments} bình luận</span>
                        <span>{post.interactions.shares} chia sẻ</span>
                      </div>
                      <span>{post.interactions.saves} lượt lưu</span>
                    </div>
                  </div>

                  {/* Post Actions */}
                  <div className="px-8 pb-8">
                    <div className="flex items-center justify-between bg-gray-50/60 rounded-2xl p-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 group ${
                            post.isLiked
                              ? "bg-yellow-100 text-yellow-600"
                              : "text-gray-600 hover:bg-yellow-50 hover:text-yellow-500"
                          }`}
                        >
                          <div className="p-1">
                            <Star
                              size={20}
                              className={
                                post.isLiked
                                  ? "fill-current"
                                  : "group-hover:scale-110 transition-transform"
                              }
                            />
                          </div>
                          <span className="font-semibold">Đánh giá</span>
                        </button>

                        <button className="flex items-center space-x-2 px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-all duration-200 group">
                          <div className="p-1">
                            <MessageCircle
                              size={20}
                              className="group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <span className="font-semibold">Bình luận</span>
                        </button>

                        <button className="flex items-center space-x-2 px-4 py-3 rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-500 transition-all duration-200 group">
                          <div className="p-1">
                            <Share
                              size={20}
                              className="group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <span className="font-semibold">Chia sẻ</span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleSave(post.id)}
                        className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 group ${
                          post.isSaved
                            ? "bg-purple-100 text-purple-600"
                            : "text-gray-600 hover:bg-purple-50 hover:text-purple-500"
                        }`}
                      >
                        <div className="p-1">
                          <Bookmark
                            size={20}
                            className={
                              post.isSaved
                                ? "fill-current"
                                : "group-hover:scale-110 transition-transform"
                            }
                          />
                        </div>
                        <span className="font-semibold">Lưu</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Enhanced Right Sidebar */}
          <div className="w-96 space-y-8">
            {/* Top Users Leaderboard */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Bảng xếp hạng</h3>
                    <p className="text-pink-100">
                      Người dùng có nhiều đánh giá nhất
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Award size={24} className="text-white" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {topUsers.map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-200 hover:scale-105 cursor-pointer ${
                        index === 0
                          ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200"
                          : "bg-gray-50/80 hover:bg-gray-100/80"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                          />
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-sm shadow-lg">
                            {user.badge}
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{user.name}</p>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm text-gray-500">
                              {user.points} ⭐
                            </p>
                            <span className="text-green-500 text-xs font-semibold">
                              {user.trend}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-600">
                          #{index + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                  Xem thêm
                </button>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Xu hướng</h3>
                <TrendingUp size={20} className="text-pink-500" />
              </div>

              <div className="space-y-4">
                {[
                  { tag: "#QuanAn", posts: "1.2k bài viết", trend: "+15%" },
                  { tag: "#BanhMi", posts: "856 bài viết", trend: "+8%" },
                  { tag: "#Pho", posts: "643 bài viết", trend: "+12%" },
                  { tag: "#CongThuc", posts: "534 bài viết", trend: "+5%" },
                  { tag: "#Review", posts: "423 bài viết", trend: "+18%" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl hover:bg-gray-100/80 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{item.tag}</p>
                      <p className="text-sm text-gray-500">{item.posts}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500 text-sm font-semibold">
                        {item.trend}
                      </span>
                      <Zap size={16} className="text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Thống kê cộng đồng
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
                  <div className="text-2xl font-bold text-pink-600 mb-2">
                    12.5k
                  </div>
                  <div className="text-sm text-gray-600">Thành viên</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    8.9k
                  </div>
                  <div className="text-sm text-gray-600">Bài viết</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    45.2k
                  </div>
                  <div className="text-sm text-gray-600">Đánh giá</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    2.1k
                  </div>
                  <div className="text-sm text-gray-600">Nhà hàng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/60 px-6 py-4 z-50">
        <div className="flex justify-around">
          <button className="flex flex-col items-center space-y-1 text-gray-500 transition-colors hover:text-gray-700">
            <Home size={24} />
            <span className="text-xs font-medium">Trang chủ</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-500 transition-colors hover:text-gray-700">
            <Heart size={24} />
            <span className="text-xs font-medium">Yêu thích</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-pink-500">
            <Users size={24} className="fill-current" />
            <span className="text-xs font-medium">Cộng đồng</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-500 transition-colors hover:text-gray-700">
            <Settings size={24} />
            <span className="text-xs font-medium">Cài đặt</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
