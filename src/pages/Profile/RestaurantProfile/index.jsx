import React, { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Share,
  MapPin,
  Clock,
  Phone,
  Star,
  MessageCircle,
  ThumbsUp,
  Send,
  MoreHorizontal,
  Users,
  Eye,
  Calendar,
  Edit,
  Image as ImageIcon,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomerSideBar from "@layout/SideBar";
import { Link } from "react-router-dom";
import { endPoint } from "@routes/router";

function RestaurantProfile() {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // Mock restaurant data
  const restaurant = {
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

  // Mock menu items
  const menuItems = [
    {
      id: 1,
      name: "Pizza Margherita Classica",
      description:
        "Pizza truyền thống với phô mai mozzarella tự làm, cà chua San Marzano & húng quế tươi",
      price: "285.000đ",
      rating: 4.9,
      reviews: 234,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop",
      isPopular: true,
    },
    {
      id: 2,
      name: "Pizza Quattro Stagioni",
      description:
        "Pizza 4 mùa với nấm, ô liu, artichoke và prosciutto di Parma",
      price: "345.000đ",
      rating: 4.6,
      reviews: 189,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      isPopular: true,
    },
    {
      id: 3,
      name: "Burrata Salad",
      description:
        "Salad burrata tươi với cà chua cherry, rau arugula và dầu olive extra virgin",
      price: "195.000đ",
      rating: 4.7,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
      isPopular: false,
    },
    {
      id: 4,
      name: "Tiramisu Homemade",
      description:
        "Tiramisu truyền thống làm từ mascarpone, cà phê espresso và bánh ladyfinger",
      price: "125.000đ",
      rating: 4.9,
      reviews: 298,
      image:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop",
      isPopular: false,
    },
  ];

  // Mock restaurant posts
  const restaurantPosts = [
    {
      id: 1,
      badge: "Khuyến mãi",
      badgeColor: "text-pink-600 bg-pink-100",
      title: "KHUYẾN MÃI CUỐI TUẦN - GIẢM 25%",
      content:
        "Thứ 7 & Chủ nhật, mỗi tất cả pizza size L được giảm 25%! Áp dụng cho cả đơn hàng tại chỗ và delivery. Đặt bàn ngay để không bỏ lỡ! 🍕✨",
      timeAgo: "2 giờ trước",
      location: "Quận 1, TP.HCM",
      likes: 99,
      comments: 23,
      shares: 12,
    },
    {
      id: 2,
      badge: "Sự kiện mới",
      badgeColor: "text-blue-600 bg-blue-100",
      title: "Giới thiệu món mới: Pizza Truffle Deluxe",
      content:
        "Chúng tôi tự hào giới thiệu Pizza Truffle Deluxe - sự kết hợp hoàn hảo giữa nấm truffle Ý, phô mai Parmigiano-Reggiano và prosciutto di Parma. Một trải nghiệm ẩm thực đẳng cấp tại Pizza 4P's! 🍄🧀",
      timeAgo: "1 ngày trước",
      likes: 156,
      comments: 34,
      shares: 28,
    },
    {
      id: 3,
      badge: "Sự kiện",
      badgeColor: "text-purple-600 bg-purple-100",
      title: "Workshop làm Pizza cùng Chef Marco",
      content:
        "Tham gia workshop làm pizza cùng Chef Marco từ Italy! Học cách làm bột pizza truyền thống, cách uớp topping và nướng pizza trong lò đá. Chỉ 15 suất, đăng ký ngay!\n\n📅 Thứ 7, 25/12\n🕐 14:00 - 17:00\n💰 850.000đ/người",
      timeAgo: "3 ngày trước",
      likes: 234,
      comments: 67,
      shares: 45,
    },
  ];

  // Mock customer reviews with star distribution
  const starDistribution = [
    { stars: 5, count: 621, percentage: 68 },
    { stars: 4, count: 183, percentage: 20 },
    { stars: 3, count: 73, percentage: 8 },
    { stars: 2, count: 27, percentage: 3 },
    { stars: 1, count: 8, percentage: 1 },
  ];

  const customerReviews = [
    {
      id: 1,
      author: {
        name: "Minh Châu",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b1c3?w=40&h=40&fit=crop&crop=face",
      },
      rating: 5,
      timeAgo: "2 ngày trước",
      content:
        "Pizza ở đây thật sự ngon! Đặc biệt là Margherita Classica - phô mai mozzarella rất tươi ngon, bánh mỏng giòn vừa phải. Không gian hiện đại, nhân viên phục vụ nhiệt tình. Giá cả hợp lý cho chất lượng. Chắc chắn sẽ quay lại!",
      images: [
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&h=100&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&h=100&fit=crop",
      ],
      likes: 18,
      replies: [],
    },
    {
      id: 2,
      author: {
        name: "Pizza 4P's",
        avatar:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=40&h=40&fit=crop",
        isRestaurant: true,
      },
      rating: null,
      timeAgo: "1 ngày trước",
      content:
        "Cảm ơn chị Thu Hà! Chúng tôi sẽ cố gắng cải thiện chia sẻ anh hỏi bộ anh về đồ uống của chúng tôi. Hen gặp lại chi Thu Hà lần tới! 🍕🙏",
      images: [],
      likes: 0,
      isReply: true,
    },
    {
      id: 3,
      author: {
        name: "Thu Hà",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      },
      rating: 4,
      timeAgo: "3 tuần trước",
      content:
        "Lần đầu thử Pizza 4P's và khá ấn tượng. Pizza Quattro Stagioni rất ngon, topping đa dạng, phô mai thơm béo. Tiramisu cũng tuyệt vời. Chỉ có điều nhà hàng hơi nhỏ, nên đông một chút thôi lại thấy hơi ồn.",
      images: [],
      likes: 12,
      replies: [2],
    },
    {
      id: 4,
      author: {
        name: "Đức Anh",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      rating: 5,
      timeAgo: "2 tuần trước",
      content:
        "Là fan của pizza Ý authentic thì Pizza 4P's không làm tôi thất vọng. Đế bánh mỏng, giòn, phô mai mozzarella thơm ngon. Burrata salad cũng tuyệt vời. Nhân viên rất tư vấn nhiệt tình. Highly recommended!",
      images: [
        "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=150&h=100&fit=crop",
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&h=100&fit=crop",
      ],
      likes: 25,
      replies: [],
    },
  ];

  return (
    <div className="bg-gray-50">
      <CustomerSideBar />

      <main className="lg:ml-20">
        {/* Top Search Bar */}

        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden mb-6">
            <img
              src={restaurant.heroImage}
              alt={restaurant.name}
              className="w-full h-80 object-cover"
            />
            <button
              onClick={() =>
                navigate(endPoint.RESTAURANT_EDIT(restaurant.id), {
                  state: { restaurant },
                })
              }
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
            <div className="lg:col-span-2 space-y-6">
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
                        <strong>{restaurant.followers}</strong> người theo dõi
                      </span>
                      <span className="text-gray-300">|</span>
                      <span>
                        <strong>{restaurant.posts}</strong> bài viết
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

                <div className="flex items-center space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                    Gọi ngay
                  </button>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    Xem bản đồ
                  </button>
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                      isFollowing
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-pink-100 text-pink-600 hover:bg-pink-200"
                    }`}
                  >
                    {isFollowing ? "Đang theo dõi" : "Theo dõi"}
                  </button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {restaurant.rating}
                    </div>
                    <div className="text-sm text-gray-500">Đánh giá</div>
                  </div>
                  <div className="text-center border-l border-gray-200">
                    <div className="text-3xl font-bold text-gray-900">đđđ</div>
                    <div className="text-sm text-gray-500">Giá cả</div>
                  </div>
                  <div className="text-center border-l border-gray-200">
                    <div className="text-3xl font-bold text-gray-900">
                      {restaurant.followers}
                    </div>
                    <div className="text-sm text-gray-500">Check in</div>
                  </div>
                  <div className="text-center border-l border-gray-200">
                    <div className="text-3xl font-bold text-gray-900">2020</div>
                    <div className="text-sm text-gray-500">Thành lập</div>
                  </div>
                </div>
              </div>

              {/* Menu Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Món ăn nổi bật
                  </h2>
                  <Link
                    to={endPoint.RESTAURANT_MENU(restaurant.id)}
                    state={{ restaurant }} // tuỳ chọn: chuyển kèm data
                    className="text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Xem menu đầy đủ →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                        {item.isPopular && (
                          <span className="absolute top-3 left-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Phổ biến
                          </span>
                        )}
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                          <Heart size={16} className="text-gray-600" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-pink-600">
                            {item.price}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">
                              {item.rating}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({item.reviews})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Restaurant Posts */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Bài viết gần đây
                </h2>

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
                          className="w-12 h-12 rounded-full"
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

                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <button className="flex items-center space-x-2 hover:text-pink-600">
                          <Heart size={16} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-blue-600">
                          <MessageCircle size={16} />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-green-600">
                          <Share size={16} />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 text-pink-600 hover:bg-pink-50 rounded-xl font-medium transition-colors">
                  Xem thêm bài viết
                </button>
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
                  <span className="text-lg font-bold">{restaurant.rating}</span>
                  <span className="text-gray-500">
                    • {restaurant.totalReviews} đánh giá
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

                          {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 mb-3">
                              {review.images.map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt="Review"
                                  className="w-28 h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                />
                              ))}
                            </div>
                          )}

                          {!review.isReply && (
                            <div className="flex items-center space-x-4 text-sm">
                              <button className="flex items-center space-x-1 text-gray-500 hover:text-pink-600">
                                <ThumbsUp size={14} />
                                <span>Hữu ích ({review.likes})</span>
                              </button>
                              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                                <MessageCircle size={14} />
                                <span>Trả lời (0)</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Write Review Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Viết đánh giá</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-2 block">
                      Chất lượng
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300 hover:text-yellow-200"
                            } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Chia sẻ trải nghiệm của bạn..."
                    className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                    rows="4"
                  />
                  <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                    Gửi đánh giá
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">
                  Hành động nhanh
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-colors">
                    <Heart size={18} />
                    <span className="font-medium">Lưu vào yêu thích</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                    <Share size={18} />
                    <span className="font-medium">Chia sẻ</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors">
                    <MapPin size={18} />
                    <span className="font-medium">Chỉ đường</span>
                  </button>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Giờ mở cửa</h3>
                <div className="space-y-2 text-sm">
                  {[
                    "Thứ 2",
                    "Thứ 3",
                    "Thứ 4",
                    "Thứ 5",
                    "Thứ 6",
                    "Thứ 7",
                    "Chủ nhật",
                  ].map((day, index) => (
                    <div key={day} className="flex justify-between">
                      <span
                        className={
                          index === 5
                            ? "font-semibold text-pink-600"
                            : "text-gray-600"
                        }
                      >
                        {day}
                      </span>
                      <span
                        className={
                          index === 5
                            ? "font-semibold text-pink-600"
                            : "text-gray-900"
                        }
                      >
                        10:00 - 23:00
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RestaurantProfile;
