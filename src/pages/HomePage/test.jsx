// import React, { useState, useEffect } from "react";
// import {
//   Heart,
//   Home,
//   Users,
//   Settings,
//   Menu,
//   X,
//   Search,
//   Star,
//   MapPin,
//   MessageCircle,
//   ChefHat,
//   Clock,
//   Award,
//   Smartphone,
//   Globe,
//   Play,
//   ArrowRight,
//   CheckCircle,
//   User,
//   LogIn,
//   UserPlus,
// } from "lucide-react";

// const FoodDiscoveryLanding = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("Tất cả");
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [authMode, setAuthMode] = useState("login"); // 'login' or 'register'
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const categories = [
//     { name: "Tất cả", icon: "🍽️", color: "bg-pink-500" },
//     { name: "Nhà hàng", icon: "🏪", color: "bg-blue-500" },
//     { name: "Ăn vặt", icon: "🍿", color: "bg-orange-500" },
//     { name: "Món Việt", icon: "🍜", color: "bg-green-500" },
//     { name: "Món Hàn", icon: "🍱", color: "bg-red-500" },
//     { name: "Món Nhật", icon: "🍣", color: "bg-purple-500" },
//     { name: "Món Âu", icon: "🍝", color: "bg-yellow-500" },
//   ];

//   const restaurants = [
//     {
//       id: 1,
//       name: "Phở Hà Nội Truyền Thống",
//       rating: 4.8,
//       reviews: 1258,
//       address: "Quận 1, TP. Hồ Chí Minh",
//       image:
//         "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop",
//       category: "Món Việt",
//       deliveryTime: "20-30 phút",
//       isFavorite: false,
//       isOnline: true,
//     },
//     {
//       id: 2,
//       name: "Pizza 4P's",
//       rating: 4.8,
//       reviews: 912,
//       address: "Quận 1, TP. Hồ Chí Minh",
//       image:
//         "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
//       category: "Món Âu",
//       deliveryTime: "30-40 phút",
//       isFavorite: true,
//       isOnline: true,
//     },
//     {
//       id: 3,
//       name: "Cơm Tấm Sài Gòn",
//       rating: 4.7,
//       reviews: 889,
//       address: "Quận 3, TP. Hồ Chí Minh",
//       image:
//         "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
//       category: "Món Việt",
//       deliveryTime: "15-25 phút",
//       isFavorite: false,
//       isOnline: false,
//     },
//   ];

//   const [restaurantList, setRestaurantList] = useState(restaurants);

//   const toggleFavorite = (id) => {
//     setRestaurantList((prev) =>
//       prev.map((restaurant) =>
//         restaurant.id === id
//           ? { ...restaurant, isFavorite: !restaurant.isFavorite }
//           : restaurant
//       )
//     );
//   };

//   const filteredRestaurants = restaurantList.filter((restaurant) => {
//     const matchesCategory =
//       activeCategory === "Tất cả" || restaurant.category === activeCategory;
//     const matchesSearch = restaurant.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const AuthModal = () => (
//     <div
//       className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-all duration-300 ${
//         showAuthModal ? "opacity-100 visible" : "opacity-0 invisible"
//       }`}
//     >
//       <div
//         className={`bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 ${
//           showAuthModal ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
//         }`}
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">
//             {authMode === "login" ? "Đăng nhập" : "Đăng ký"}
//           </h2>
//           <button
//             onClick={() => setShowAuthModal(false)}
//             className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           {authMode === "register" && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Họ và tên
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                 placeholder="Nhập họ và tên"
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//               placeholder="Nhập email"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Mật khẩu
//             </label>
//             <input
//               type="password"
//               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//               placeholder="Nhập mật khẩu"
//             />
//           </div>

//           {authMode === "register" && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Xác nhận mật khẩu
//               </label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                 placeholder="Nhập lại mật khẩu"
//               />
//             </div>
//           )}
//         </div>

//         <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all mt-6">
//           {authMode === "login" ? "Đăng nhập" : "Đăng ký"}
//         </button>

//         <div className="text-center mt-4">
//           <span className="text-gray-600 text-sm">
//             {authMode === "login" ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
//           </span>
//           <button
//             onClick={() =>
//               setAuthMode(authMode === "login" ? "register" : "login")
//             }
//             className="text-pink-500 font-medium text-sm hover:underline"
//           >
//             {authMode === "login" ? "Đăng ký ngay" : "Đăng nhập"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Auth Modal */}
//       <AuthModal />

//       {/* Sidebar Navigation */}
//       <div
//         className={`hidden lg:block bg-white shadow-lg fixed left-0 top-0 h-full z-50 transition-all duration-300 ${
//           sidebarCollapsed ? "w-20" : "w-64"
//         }`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo & Collapse Button */}
//           <div className="flex items-center justify-between p-6">
//             <div
//               className={`flex items-center space-x-3 transition-all duration-300 ${
//                 sidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
//               }`}
//             >
//               <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
//                 <ChefHat size={20} className="text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">AnGiDay</h1>
//                 <p className="text-xs text-gray-500">Khám phá ẩm thực</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
//             >
//               <Menu size={16} />
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 px-4 space-y-2">
//             {[
//               { icon: Home, label: "Trang chủ", active: true },
//               { icon: Heart, label: "Yêu thích", active: false },
//               { icon: Users, label: "Cộng đồng", active: false },
//               { icon: Award, label: "Khuyến mãi", active: false },
//               { icon: Settings, label: "Cài đặt", active: false },
//             ].map((item, index) => (
//               <a
//                 key={index}
//                 href="#"
//                 className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group ${
//                   item.active
//                     ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 <item.icon size={20} />
//                 <span
//                   className={`font-medium transition-all duration-300 ${
//                     sidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
//                   }`}
//                 >
//                   {item.label}
//                 </span>
//               </a>
//             ))}
//           </nav>

//           {/* User Profile */}
//           <div className="p-4 border-t border-gray-100">
//             <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
//               <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
//                 <span className="text-white font-semibold text-sm">A</span>
//               </div>
//               <div
//                 className={`transition-all duration-300 ${
//                   sidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
//                 }`}
//               >
//                 <p className="font-medium text-gray-900 text-sm">AnGi User</p>
//                 <p className="text-xs text-gray-500">Premium Member</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div
//         className={`flex-1 transition-all duration-300 ${
//           sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
//         }`}
//       >
//         {/* Header */}
//         <header
//           className={`bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-40 transition-all duration-300 ${
//             scrollY > 50 ? "shadow-lg" : ""
//           }`}
//         >
//           <div className="max-w-7xl mx-auto px-6 py-4">
//             <div className="flex items-center justify-between">
//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="lg:hidden w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
//               >
//                 <Menu size={20} />
//               </button>

//               {/* Search Bar */}
//               <div className="flex-1 max-w-2xl relative mx-4">
//                 <Search
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={20}
//                 />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Tìm kiếm địa điểm ăn uống..."
//                   className="w-full pl-12 pr-6 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all hover:shadow-md"
//                 />
//               </div>

//               {/* Auth Buttons */}
//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={() => {
//                     setShowAuthModal(true);
//                     setAuthMode("login");
//                   }}
//                   className="hidden sm:flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-pink-600 transition-colors font-medium"
//                 >
//                   <LogIn size={18} />
//                   <span>Đăng nhập</span>
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowAuthModal(true);
//                     setAuthMode("register");
//                   }}
//                   className="hidden sm:flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl"
//                 >
//                   <UserPlus size={18} />
//                   <span>Đăng ký</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Hero Section */}
//         <section className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10"></div>
//           <div className="relative max-w-7xl mx-auto px-6 py-20">
//             <div className="grid lg:grid-cols-2 gap-12 items-center">
//               <div className="space-y-8">
//                 <div className="space-y-4">
//                   <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
//                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                     <span className="text-sm font-medium text-gray-700">
//                       Khám phá ngay hôm nay
//                     </span>
//                   </div>
//                   <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//                     Khám phá
//                     <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
//                       {" "}
//                       ẩm thực{" "}
//                     </span>
//                     Việt Nam
//                   </h1>
//                   <p className="text-xl text-gray-600 leading-relaxed">
//                     Tìm kiếm và đánh giá các địa điểm ăn uống tuyệt vời nhất tại
//                     TP.HCM. Kết nối với cộng đồng yêu thích ẩm thực và chia sẻ
//                     trải nghiệm của bạn.
//                   </p>
//                 </div>

//                 <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//                   <button className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl">
//                     <Search size={20} />
//                     <span>Bắt đầu khám phá</span>
//                   </button>
//                   <button className="flex items-center justify-center space-x-3 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all border border-gray-200 shadow-lg hover:shadow-xl">
//                     <Play size={20} />
//                     <span>Xem video giới thiệu</span>
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-3 gap-8 pt-8">
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-gray-900">
//                       5,000+
//                     </div>
//                     <div className="text-sm text-gray-600">Địa điểm</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-gray-900">
//                       50,000+
//                     </div>
//                     <div className="text-sm text-gray-600">Đánh giá</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-gray-900">
//                       10,000+
//                     </div>
//                     <div className="text-sm text-gray-600">Thành viên</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="relative">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-4">
//                     <div className="relative overflow-hidden rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
//                       <img
//                         src="https://images.unsplash.com/photo-1555126634-323283e090fa?w=300&h=200&fit=crop"
//                         alt="Phở Việt Nam"
//                         className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//                       <div className="absolute bottom-4 left-4 text-white">
//                         <p className="font-semibold">Phở Hà Nội</p>
//                         <div className="flex items-center space-x-1">
//                           <Star
//                             size={14}
//                             className="fill-yellow-400 text-yellow-400"
//                           />
//                           <span className="text-sm">4.8</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="relative overflow-hidden rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
//                       <img
//                         src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop"
//                         alt="Pizza"
//                         className="w-full h-32 object-cover hover:scale-110 transition-transform duration-500"
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-4 pt-8">
//                     <div className="relative overflow-hidden rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
//                       <img
//                         src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop"
//                         alt="Sushi"
//                         className="w-full h-32 object-cover hover:scale-110 transition-transform duration-500"
//                       />
//                     </div>
//                     <div className="relative overflow-hidden rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
//                       <img
//                         src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop"
//                         alt="Cơm tấm"
//                         className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//                       <div className="absolute bottom-4 left-4 text-white">
//                         <p className="font-semibold">Cơm tấm Sài Gòn</p>
//                         <div className="flex items-center space-x-1">
//                           <Star
//                             size={14}
//                             className="fill-yellow-400 text-yellow-400"
//                           />
//                           <span className="text-sm">4.7</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Category Filters */}
//         <section className="bg-white border-b border-gray-100 sticky top-20 z-30">
//           <div className="max-w-7xl mx-auto px-6 py-6">
//             <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
//               {categories.map((category) => (
//                 <button
//                   key={category.name}
//                   onClick={() => setActiveCategory(category.name)}
//                   className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap font-medium transition-all transform hover:scale-105 ${
//                     activeCategory === category.name
//                       ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   <span className="text-lg">{category.icon}</span>
//                   <span>{category.name}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Featured Restaurants */}
//         <section className="max-w-7xl mx-auto px-6 py-12">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                 Địa điểm nổi bật
//               </h2>
//               <p className="text-gray-600">
//                 {filteredRestaurants.length} kết quả được tìm thấy
//               </p>
//             </div>
//             <button className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium">
//               <span>Xem tất cả</span>
//               <ArrowRight size={18} />
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredRestaurants.map((restaurant, index) => (
//               <div
//                 key={restaurant.id}
//                 className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group overflow-hidden"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={restaurant.image}
//                     alt={restaurant.name}
//                     className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
//                   />

//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                   {restaurant.isOnline && (
//                     <div className="absolute top-4 left-4 flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
//                       <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//                       <span>Đang mở</span>
//                     </div>
//                   )}

//                   <button
//                     onClick={() => toggleFavorite(restaurant.id)}
//                     className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg hover:shadow-xl transform hover:scale-110"
//                   >
//                     <Heart
//                       size={18}
//                       className={`transition-colors ${
//                         restaurant.isFavorite
//                           ? "text-pink-500 fill-current"
//                           : "text-gray-600"
//                       }`}
//                     />
//                   </button>

//                   <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <button className="w-full bg-white/90 backdrop-blur-sm text-gray-900 py-2 rounded-lg font-medium hover:bg-white transition-colors">
//                       Xem chi tiết
//                     </button>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-3">
//                     <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-2">
//                       {restaurant.name}
//                     </h3>
//                   </div>

//                   <div className="flex items-center space-x-2 mb-4">
//                     <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
//                       <Star
//                         size={16}
//                         className="text-yellow-500 fill-current"
//                       />
//                       <span className="font-bold text-gray-900 text-sm">
//                         {restaurant.rating}
//                       </span>
//                     </div>
//                     <span className="text-gray-500 text-sm">
//                       ({restaurant.reviews.toLocaleString()} đánh giá)
//                     </span>
//                   </div>

//                   <div className="flex items-center space-x-2 text-gray-500 mb-4">
//                     <MapPin size={16} />
//                     <span className="text-sm">{restaurant.address}</span>
//                   </div>

//                   <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                     <div className="flex items-center space-x-2">
//                       <Clock size={16} className="text-gray-400" />
//                       <span className="text-sm text-gray-600">
//                         {restaurant.deliveryTime}
//                       </span>
//                     </div>
//                     <span
//                       className={`text-xs px-2 py-1 rounded-full font-medium ${
//                         restaurant.category === "Món Việt"
//                           ? "bg-green-100 text-green-700"
//                           : restaurant.category === "Món Nhật"
//                           ? "bg-purple-100 text-purple-700"
//                           : restaurant.category === "Món Âu"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-blue-100 text-blue-700"
//                       }`}
//                     >
//                       {restaurant.category}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="bg-gray-900 py-20">
//           <div className="max-w-7xl mx-auto px-6">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl font-bold text-white mb-4">
//                 Tại sao chọn{" "}
//                 <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
//                   AnGiDay
//                 </span>
//                 ?
//               </h2>
//               <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//                 Chúng tôi mang đến trải nghiệm khám phá ẩm thực tuyệt vời nhất
//                 với những tính năng độc đáo
//               </p>
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[
//                 {
//                   icon: Search,
//                   title: "Tìm kiếm thông minh",
//                   description:
//                     "Công nghệ AI giúp bạn tìm địa điểm phù hợp với sở thích và ngân sách",
//                 },
//                 {
//                   icon: Users,
//                   title: "Cộng đồng sôi động",
//                   description:
//                     "Kết nối với hàng nghìn food blogger và chia sẻ trải nghiệm ẩm thực",
//                 },
//                 {
//                   icon: Star,
//                   title: "Đánh giá chính xác",
//                   description:
//                     "Hệ thống đánh giá minh bạch từ cộng đồng người dùng thực tế",
//                 },
//                 {
//                   icon: MapPin,
//                   title: "Bản đồ tương tác",
//                   description:
//                     "Khám phá các địa điểm ăn uống xung quanh bạn một cách trực quan",
//                 },
//                 {
//                   icon: Smartphone,
//                   title: "Ứng dụng di động",
//                   description:
//                     "Trải nghiệm mượt mà trên mọi thiết bị, mọi lúc mọi nơi",
//                 },
//                 {
//                   icon: Award,
//                   title: "Khuyến mãi độc quyền",
//                   description:
//                     "Nhận ưu đãi và khuyến mãi từ các nhà hàng đối tác",
//                 },
//               ].map((feature, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-750 transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 hover:border-pink-500/50 group"
//                 >
//                   <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
//                     <feature.icon size={28} className="text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-400 leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="bg-gradient-to-r from-pink-500 to-purple-600 py-20">
//           <div className="max-w-4xl mx-auto px-6 text-center">
//             <h2 className="text-4xl font-bold text-white mb-6">
//               Sẵn sàng khám phá ẩm thực Việt Nam?
//             </h2>
//             <p className="text-xl text-pink-100 mb-8 leading-relaxed">
//               Tham gia cộng đồng hơn 10,000 người yêu thích ẩm thực và bắt đầu
//               hành trình khám phá của bạn ngay hôm nay
//             </p>
//             <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
//               <button
//                 onClick={() => {
//                   setShowAuthModal(true);
//                   setAuthMode("register");
//                 }}
//                 className="px-8 py-4 bg-white text-pink-600 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
//               >
//                 Đăng ký miễn phí
//               </button>
//               <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-pink-600 transition-all">
//                 Tìm hiểu thêm
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="bg-gray-900 text-white py-16">
//           <div className="max-w-7xl mx-auto px-6">
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//               <div>
//                 <div className="flex items-center space-x-3 mb-6">
//                   <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
//                     <ChefHat size={20} className="text-white" />
//                   </div>
//                   <h3 className="text-2xl font-bold">AnGiDay</h3>
//                 </div>
//                 <p className="text-gray-400 leading-relaxed mb-6">
//                   Nền tảng khám phá ẩm thực hàng đầu Việt Nam, kết nối bạn với
//                   những trải nghiệm ẩm thực tuyệt vời nhất.
//                 </p>
//                 <div className="flex space-x-4">
//                   {["facebook", "instagram", "twitter"].map((social, index) => (
//                     <div
//                       key={index}
//                       className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-500 transition-colors cursor-pointer"
//                     >
//                       <Globe size={18} />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h4 className="font-bold text-lg mb-6">Khám phá</h4>
//                 <ul className="space-y-3">
//                   {[
//                     "Nhà hàng",
//                     "Quán ăn vặt",
//                     "Món Việt",
//                     "Món Âu",
//                     "Món Á",
//                   ].map((item, index) => (
//                     <li key={index}>
//                       <a
//                         href="#"
//                         className="text-gray-400 hover:text-white transition-colors"
//                       >
//                         {item}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <h4 className="font-bold text-lg mb-6">Hỗ trợ</h4>
//                 <ul className="space-y-3">
//                   {[
//                     "Trung tâm trợ giúp",
//                     "Liên hệ",
//                     "Báo cáo vấn đề",
//                     "Điều khoản sử dụng",
//                     "Chính sách bảo mật",
//                   ].map((item, index) => (
//                     <li key={index}>
//                       <a
//                         href="#"
//                         className="text-gray-400 hover:text-white transition-colors"
//                       >
//                         {item}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <h4 className="font-bold text-lg mb-6">Nhận thông báo</h4>
//                 <p className="text-gray-400 mb-4">
//                   Đăng ký để nhận tin tức và ưu đãi mới nhất
//                 </p>
//                 <div className="flex space-x-2">
//                   <input
//                     type="email"
//                     placeholder="Email của bạn"
//                     className="flex-1 px-4 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:border-pink-500 transition-colors"
//                   />
//                   <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all">
//                     <ArrowRight size={18} />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
//               <p className="text-gray-400 text-sm mb-4 md:mb-0">
//                 © 2025 AnGiDay. Tất cả quyền được bảo lưu. Khám phá ẩm thực Việt
//                 Nam.
//               </p>
//               <div className="flex items-center space-x-6">
//                 <a
//                   href="#"
//                   className="text-gray-400 hover:text-white text-sm transition-colors"
//                 >
//                   Điều khoản
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-400 hover:text-white text-sm transition-colors"
//                 >
//                   Bảo mật
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-400 hover:text-white text-sm transition-colors"
//                 >
//                   Cookies
//                 </a>
//               </div>
//             </div>
//           </div>
//         </footer>
//       </div>

//       {/* Floating Action Button */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <button className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group">
//           <MessageCircle
//             size={24}
//             className="group-hover:scale-110 transition-transform"
//           />
//           <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
//             <span className="text-xs font-bold">3</span>
//           </div>
//         </button>
//       </div>

//       {/* Mobile Navigation */}
//       <div
//         className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-all duration-300 ${
//           mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//       >
//         <div
//           className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
//             mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="flex items-center justify-between p-6 border-b border-gray-200">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
//                 <ChefHat size={20} className="text-white" />
//               </div>
//               <h2 className="text-xl font-bold text-gray-900">AnGiDay</h2>
//             </div>
//             <button
//               onClick={() => setMobileMenuOpen(false)}
//               className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           <nav className="p-6 space-y-4">
//             {[
//               { icon: Home, label: "Trang chủ" },
//               { icon: Heart, label: "Yêu thích" },
//               { icon: Users, label: "Cộng đồng" },
//               { icon: Award, label: "Khuyến mãi" },
//               { icon: Settings, label: "Cài đặt" },
//             ].map((item, index) => (
//               <a
//                 key={index}
//                 href="#"
//                 className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
//               >
//                 <item.icon size={20} className="text-gray-600" />
//                 <span className="font-medium text-gray-900">{item.label}</span>
//               </a>
//             ))}
//           </nav>

//           <div className="absolute bottom-6 left-6 right-6 space-y-3">
//             <button
//               onClick={() => {
//                 setShowAuthModal(true);
//                 setAuthMode("login");
//                 setMobileMenuOpen(false);
//               }}
//               className="w-full py-3 text-center text-gray-700 font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//             >
//               Đăng nhập
//             </button>
//             <button
//               onClick={() => {
//                 setShowAuthModal(true);
//                 setAuthMode("register");
//                 setMobileMenuOpen(false);
//               }}
//               className="w-full py-3 text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all"
//             >
//               Đăng ký
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Navigation - Mobile */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-40">
//         <div className="flex justify-around">
//           {[
//             { icon: Home, label: "Trang chủ", active: true },
//             { icon: Heart, label: "Yêu thích" },
//             { icon: Users, label: "Cộng đồng" },
//             { icon: Settings, label: "Cài đặt" },
//           ].map((item, index) => (
//             <a
//               key={index}
//               href="#"
//               className={`flex flex-col items-center space-y-1 ${
//                 item.active ? "text-pink-600" : "text-gray-500"
//               }`}
//             >
//               <item.icon size={20} />
//               <span className="text-xs font-medium">{item.label}</span>
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodDiscoveryLanding;
