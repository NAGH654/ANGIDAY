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
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { endPoint } from "@routes/router";

import CustomerSideBar from "@layout/CustomerSideBar";

// Main Community Page Component
function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  // Mock user data
  const user = {
    name: 'AnGiDay',
    email: 'AnGiDay1205@gmail.com',
    avatar: 'A',
    status: 'Cá nhân',
    isPremium: false,
    notifications: 3
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      id: 'profile',
      label: 'Xem trang cá nhân',
      icon: <User size={18} />,
      description: 'Quản lý thông tin cá nhân',
      onClick: () => {
        console.log('Navigate to profile');
        setIsAnimating(false);
        setTimeout(() => setIsDropdownOpen(false), 200);
      }
    },
    {
      id: 'package',
      label: 'Mua gói',
      icon: <CreditCard size={18} />,
      description: 'Nâng cấp tài khoản Premium',
      badge: 'Hot',
      onClick: () => {
        navigate(endPoint.PACKAGE);
        setIsAnimating(false);
        setTimeout(() => setIsDropdownOpen(false), 200);
      }
    },
    {
      id: 'settings',
      label: 'Cài đặt',
      icon: <Settings size={18} />,
      description: 'Tùy chỉnh trải nghiệm',
      onClick: () => {
        console.log('Navigate to settings');
        setIsAnimating(false);
        setTimeout(() => setIsDropdownOpen(false), 200);
      }
    },
    {
      id: 'logout',
      label: 'Đăng xuất',
      icon: <LogOut size={18} />,
      description: 'Thoát khỏi tài khoản',
      onClick: () => {
        navigate(endPoint.LOGIN);
        setIsAnimating(false);
        setTimeout(() => setIsDropdownOpen(false), 200);
      },
      danger: true
    }
  ];
  // Sample community posts data
  const posts = [
    {
      id: 1,
      author: {
        name: "Alex",
        avatar: "/api/placeholder/40/40",
        time: "5 phút trước",
      },
      title: "Top 5 món ăn ngon ở Quận 1",
      content: [
        "1. Bún Bò Huế Đông Ba",
        "2. Cơm Tấm Ba Ghiền",
        "3. Phở Lệ",
        "4. Pizza 4P's Saigon",
        "5. Bún Thịt Nướng Chị Thông",
      ],
      image: "/api/placeholder/600/400",
      interactions: {
        likes: 245,
        comments: 32,
        shares: 18,
        saves: 56,
      },
      isLiked: false,
      isSaved: false,
    },
  ];

  // Top users data
  const topUsers = [
    { name: "Alex", points: "5.923.300", avatar: "/api/placeholder/32/32" },
    { name: "Alex", points: "5.923.300", avatar: "/api/placeholder/32/32" },
    { name: "Alex", points: "5.923.300", avatar: "/api/placeholder/32/32" },
    { name: "Alex", points: "5.923.300", avatar: "/api/placeholder/32/32" },
    { name: "Alex", points: "5.923.300", avatar: "/api/placeholder/32/32" },
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
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <CustomerSideBar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-20">
        {/* Header */}
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
              {/* Avatar with online indicator */}
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold">{user.avatar}</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              
              {/* User Name */}
              <div className="hidden md:block text-left">
                <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                <p className="text-xs text-gray-500">{user.status}</p>
              </div>
              
              {/* Chevron */}
              <ChevronDown 
                size={16} 
                className={`text-gray-400 transition-all duration-300 group-hover:text-gray-600 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Enhanced Dropdown Menu */}
            {isDropdownOpen && (
              <>
                {/* Backdrop with blur */}
                <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-40"></div>
                
                <div className={`absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-3xl shadow-2xl py-2 z-50 transform transition-all duration-300 ease-out ${
                  isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-2'
                }`}>
                  
                  {/* User Info Section with gradient */}
                  <div className="relative px-6 py-5 bg-gradient-to-br from-gray-50/80 to-white/60 backdrop-blur-sm mx-2 rounded-2xl mb-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-2xl"></div>
                    
                    <div className="relative">
                      <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">Đăng nhập bằng tính</p>
                      
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">{user.avatar}</span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-bold text-gray-900 truncate text-lg">{user.name}</h3>
                            {user.isPremium && (
                              <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full">
                                PRO
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 font-medium">{user.status}</p>
                          <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items with enhanced styling */}
                  <div className="px-2">
                    <div className="px-4 py-2 mb-2">
                      <p className="text-sm text-gray-500 font-semibold">Tài khoản của bạn</p>
                    </div>
                    
                    <div className="space-y-1">
                      {menuItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={item.onClick}
                          className={`w-full flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-200 group relative overflow-hidden ${
                            item.danger 
                              ? 'text-red-600 hover:bg-red-50/80 hover:text-red-700' 
                              : 'text-gray-700 hover:bg-gray-50/80 hover:text-gray-900'
                          }`}
                        >
                          {/* Hover effect background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          
                          <div className={`p-2 rounded-xl transition-all duration-200 ${
                            item.danger 
                              ? 'bg-red-100/60 text-red-500 group-hover:bg-red-200/80' 
                              : 'bg-gray-100/60 text-gray-600 group-hover:bg-gray-200/80'
                          }`}>
                            {item.icon}
                          </div>
                          
                          <div className="flex-1 text-left">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">{item.label}</span>
                              {item.badge && (
                                <span className="px-2 py-0.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full animate-pulse">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                          </div>
                          
                          <ChevronDown 
                            size={16} 
                            className="text-gray-400 -rotate-90 group-hover:translate-x-1 transition-transform duration-200" 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Footer with app info */}
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

        <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
          {/* Left Content - Posts */}
          <div className="flex-1">
            <div className="space-y-6">
              {postList.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Post Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">A</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {post.author.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {post.author.time}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreHorizontal size={20} className="text-gray-500" />
                      </button>
                    </div>

                    {/* Post Content */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                      {post.title}
                    </h2>
                    <div className="space-y-1 mb-4">
                      {post.content.map((item, index) => (
                        <p key={index} className="text-gray-700">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Post Image */}
                  <div className="px-6 pb-4">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>

                  {/* Post Actions */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-2 text-gray-500 hover:text-pink-500 transition-colors"
                        >
                          <Star
                            size={20}
                            className={
                              post.isLiked ? "text-yellow-400 fill-current" : ""
                            }
                          />
                          <span className="text-sm">Đánh giá</span>
                        </button>

                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageCircle size={20} />
                          <span className="text-sm">Bình luận</span>
                        </button>

                        <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                          <Share size={20} />
                          <span className="text-sm">Chia sẻ</span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleSave(post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors"
                      >
                        <Bookmark
                          size={20}
                          className={
                            post.isSaved ? "text-purple-500 fill-current" : ""
                          }
                        />
                        <span className="text-sm">Lưu trữ</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Top Users */}
          <div className="w-80">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">
                  Người dùng có nhiều đánh giá
                </h3>
                <Star size={20} className="text-yellow-400" />
              </div>

              <div className="space-y-4">
                {topUsers.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">A</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.points}</p>
                      </div>
                    </div>
                    <Star size={16} className="text-yellow-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50">
        <div className="flex justify-around">
          <a
            href="#"
            className="flex flex-col items-center space-y-1 text-gray-500"
          >
            <Home size={20} />
            <span className="text-xs">Trang chủ</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center space-y-1 text-gray-500"
          >
            <Heart size={20} />
            <span className="text-xs">Yêu thích</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center space-y-1 text-gray-900"
          >
            <Users size={20} />
            <span className="text-xs">Cộng đồng</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center space-y-1 text-gray-500"
          >
            <Settings size={20} />
            <span className="text-xs">Cài đặt</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
