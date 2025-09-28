const user = {
  name: "AnGiDay",
  email: "AnGiDay1205@gmail.com",
  avatar: "A",
  status: "Cá nhân",
  isPremium: false,
  notifications: 3,
};

const defaultPosts =  [
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
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop",
      interactions: { likes: 245, comments: 32, shares: 18, saves: 56 },
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
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=800&fit=crop",
      interactions: { likes: 189, comments: 45, shares: 12, saves: 78 },
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
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop",
      interactions: { likes: 156, comments: 28, shares: 9, saves: 34 },
      isLiked: false,
      isSaved: true,
      tags: ["#DuongPho", "#SaiGon", "#AmThuc"],
      isPopular: false,
    },
  ];

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

export { user, defaultPosts, topUsers };
