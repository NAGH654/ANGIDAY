// Mock data tách riêng để page sạch
export const restaurant = {
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

export const menuItems = [
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
    description: "Pizza 4 mùa với nấm, ô liu, artichoke và prosciutto di Parma",
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

export const restaurantPosts = [
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

export const starDistribution = [
  { stars: 5, count: 621, percentage: 68 },
  { stars: 4, count: 183, percentage: 20 },
  { stars: 3, count: 73, percentage: 8 },
  { stars: 2, count: 27, percentage: 3 },
  { stars: 1, count: 8, percentage: 1 },
];

export const customerReviews = [
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
