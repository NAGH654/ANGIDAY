export const POSTS = [
  {
    id: 1,
    title: "Top 5 món ăn ngon ở Quận 1",
    author: {
      name: "Alex Nguyen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      verified: true,
    },
    timeAgo: "2 giờ trước",
    content:
      "Chia sẻ những món ăn ngon nhất mà tôi đã thử ở Quận 1. Từ bánh mì, phở đến các món Tây...",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    tags: ["QuanAn", "Quan1", "MonNgon"],
    interactions: { likes: 234, comments: 45, shares: 12 },
    bookmarkedDate: "15/01/2025",
    category: "Review",
    isPopular: true,
  },
  {
    id: 2,
    title: "Cách làm bánh mì Việt Nam chính gốc",
    author: {
      name: "Mai Nguyen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=64&h=64&fit=crop&crop=face",
      verified: false,
    },
    timeAgo: "5 giờ trước",
    content:
      "Hướng dẫn chi tiết cách làm bánh mì Việt Nam từ A-Z. Từ cách làm bánh, pha nước chấm...",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    tags: ["BanhMi", "CongThuc", "VietNam"],
    interactions: { likes: 567, comments: 89, shares: 34 },
    bookmarkedDate: "14/01/2025",
    category: "Công thức",
    isPopular: true,
  },
  {
    id: 3,
    title: "Bún Bò Huế - Hương vị cố đô",
    author: {
      name: "Phong Le",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      verified: true,
    },
    timeAgo: "1 ngày trước",
    content:
      "Khám phá hương vị đặc trưng của Bún Bò Huế tại Sài Gòn. Những quán ngon mà bạn không thể bỏ qua...",
    image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&h=300&fit=crop",
    tags: ["BunBoHue", "Hue", "AmThuc"],
    interactions: { likes: 123, comments: 28, shares: 9 },
    bookmarkedDate: "13/01/2025",
    category: "Review",
    isPopular: false,
  },
  {
    id: 4,
    title: "Café văn hóa Sài Gòn - Nơi hội tụ",
    author: {
      name: "Linh Tran",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      verified: false,
    },
    timeAgo: "2 ngày trước",
    content:
      "Những quán café có không gian đẹp, phù hợp để làm việc, học tập và gặp gỡ bạn bè tại TP.HCM...",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
    tags: ["Cafe", "SaiGon", "LamViec"],
    interactions: { likes: 345, comments: 67, shares: 23 },
    bookmarkedDate: "12/01/2025",
    category: "Lifestyle",
    isPopular: false,
  },
  {
    id: 5,
    title: "Pizza 4Ps - Truyền thống Ý tại Việt Nam",
    author: {
      name: "Tuấn Vo",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
      verified: true,
    },
    timeAgo: "3 ngày trước",
    content:
      "Review chi tiết về Pizza 4Ps - chuỗi pizza nổi tiếng với nguyên liệu tươi ngon và hương vị đậm đà...",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    tags: ["Pizza", "4Ps", "Review"],
    interactions: { likes: 189, comments: 34, shares: 15 },
    bookmarkedDate: "11/01/2025",
    category: "Review",
    isPopular: true,
  },
  {
    id: 6,
    title: "Phở Hà Nội - Tinh hoa ẩm thực Bắc Bộ",
    author: {
      name: "Minh Dao",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=64&h=64&fit=crop&crop=face",
      verified: true,
    },
    timeAgo: "4 ngày trước",
    content:
      "Khám phá những quán phở Hà Nội authentic nhất tại Sài Gòn. Từ nước dùng trong vắt đến thái thịt bò mỏng...",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop",
    tags: ["Pho", "HaNoi", "Authentic"],
    interactions: { likes: 298, comments: 52, shares: 21 },
    bookmarkedDate: "10/01/2025",
    category: "Review",
    isPopular: false,
  },
];

const cats = Array.from(new Set(POSTS.map((p) => p.category)));
export const POST_CATEGORIES = ["Tất cả", ...cats];
