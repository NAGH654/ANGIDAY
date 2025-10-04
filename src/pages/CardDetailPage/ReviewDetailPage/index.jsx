// src/pages/ReviewDetailPage.jsx
import React, { useMemo, useState } from "react";
import { Star, MoreHorizontal, ThumbsUp, MessageCircle, Check } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import CustomerSideBar from "@layout/SideBar";
import { endPoint } from "@routes/router";

/** ===== Mock/fallback (sẽ dùng khi không truyền state) ===== */
const fallbackRestaurant = {
  id: 1,
  name: "Pizza 4P's",
  thumbnail:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop",
  rating: 4.8,
  totalReviews: 912,
};

const fallbackReviews = [
  {
    id: 101,
    author: {
      name: "Hoàng Nam",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      verified: true,
    },
    rating: 5,
    timeAgo: "1 tháng trước",
    content:
      "Đây là lần thứ 3 tôi đến Pizza 4P's và lần nào cũng hài lòng. Lần này thử Spaghetti Carbonara - tuyệt vời! Pasta al dente, sốt kem béo ngậy vừa phải. Tiramisu vẫn là món tráng miệng yêu thích. Sẽ tiếp tục ủng hộ!",
    images: [
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=240&h=160&fit=crop",
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=240&h=160&fit=crop",
    ],
    likes: 35,
    replies: [
      {
        id: "r1",
        author: {
          name: "Pizza 4P's",
          isRestaurant: true,
          avatar:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=40&h=40&fit=crop",
        },
        timeAgo: "3 tuần trước",
        content:
          "Cảm ơn anh Nam đã góp ý! Chúng tôi sẽ cố gắng cải thiện không gian để tạo môi trường thoải mái hơn cho khách hàng. Hy vọng được phục vụ anh lần tới! 😊",
      },
    ],
  },
  {
    id: 102,
    author: {
      name: "Mai Linh",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=40&h=40&fit=crop&crop=face",
    },
    rating: 3,
    timeAgo: "1 tháng trước",
    content:
      "Hơi thất vọng với lần này. Pizza đến muộn 30 phút so với dự kiến, và khi đến thì đã hơi nguội. Vị vẫn ok nhưng trải nghiệm không tốt lắm. Hy vọng lần sau sẽ tốt hơn.",
    images: [],
    likes: 20,
    replies: [
      {
        id: "r2",
        author: {
          name: "Pizza 4P's",
          isRestaurant: true,
          avatar:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=40&h=40&fit=crop",
        },
        timeAgo: "1 tháng trước",
        content:
          "Chúng tôi rất xin lỗi vì trải nghiệm không tốt này! Đây không phải là tiêu chuẩn dịch vụ của chúng tôi. Chúng tôi đã ghi nhận và sẽ cải thiện quy trình để tránh tình trạng này. Mong được phục vụ chị tốt hơn lần sau! 🙏",
      },
    ],
  },
];

/** ===== Small UI bits ===== */
const Stars = ({ value = 0, size = 16 }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className={`${i < value ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))}
  </div>
);

const FilterPill = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
      active
        ? "bg-pink-50 text-pink-600 border-pink-200"
        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
    }`}
  >
    {children}
  </button>
);

const ActionBtn = ({ icon, children }) => (
  <button className="flex items-center gap-1.5 text-gray-500 hover:text-pink-600 text-sm">
    {icon}
    <span>{children}</span>
  </button>
);

/** ===== Review item ===== */
const ReviewCard = ({ review }) => {
  const author = review?.author || { name: "Ẩn danh", avatar: "" };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-start gap-3">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-10 h-10 rounded-full object-cover bg-gray-100"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{author.name}</span>
            {author.verified && (
              <span className="inline-flex items-center gap-1 text-xs text-blue-600">
                <Check size={14} /> Đã xác minh
              </span>
            )}
            <span className="text-sm text-gray-500">• {review.timeAgo}</span>
          </div>

          <div className="mt-1">
            <Stars value={review.rating} />
          </div>

          <p className="text-gray-700 mt-3">{review.content}</p>

          {!!review.images?.length && (
            <div className="flex gap-2 mt-3">
              {review.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="review"
                  className="w-28 h-20 object-cover rounded-lg border border-gray-100"
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-5 mt-3">
            <ActionBtn icon={<ThumbsUp size={16} />}>Hữu ích ({review.likes})</ActionBtn>
            <ActionBtn icon={<MessageCircle size={16} />}>Trả lời</ActionBtn>
          </div>

          {/* Replies (restaurant) */}
          {!!review.replies?.length && (
            <div className="mt-4 space-y-3">
              {review.replies.map((rep, idx) => {
                // ⛑️ Phòng thủ: rep có thể là số ID → bỏ qua nếu không tra được object
                if (!rep || typeof rep !== "object" || !rep.author) return null;
                return (
                  <div
                    key={rep.id ?? idx}
                    className="ml-0 md:ml-12 p-4 rounded-xl border border-pink-200 bg-pink-50/40"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={rep.author.avatar}
                        alt={rep.author.name}
                        className="w-8 h-8 rounded-full object-cover bg-gray-100"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{rep.author.name}</span>
                          {rep.author.isRestaurant && (
                            <span className="px-2 py-0.5 bg-pink-100 text-pink-600 rounded text-xs font-medium">
                              Chủ nhà hàng
                            </span>
                          )}
                          <span className="text-xs text-gray-500">• {rep.timeAgo}</span>
                        </div>
                        <p className="text-gray-700 mt-1">{rep.content}</p>
                      </div>
                      <MoreHorizontal size={18} className="text-gray-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <MoreHorizontal size={18} className="text-gray-400" />
      </div>
    </div>
  );
};

/** ===== Page ===== */
function ReviewDetailPage() {
  const { id } = useParams();
  const location = useLocation();

  // reviews từ state có thể ở 2 dạng:
  // A) [{... review, replies: [{...}, {...}] }]
  // B) [{... review, replies: [2]}, {... id:2, isReply:true, author:{...}}]
  const rawReviews = location.state?.reviews || fallbackReviews;

  // Chuẩn hoá: biến replies dạng ID -> object, và loại các item top-level là reply
  const normalized = useMemo(() => {
    if (!Array.isArray(rawReviews)) return [];

    const byId = new Map(rawReviews.map((r) => [r.id, r]));

    return rawReviews
      .map((r) => {
        if (Array.isArray(r.replies) && r.replies.length) {
          const expanded = r.replies
            .map((x) => (typeof x === "object" ? x : byId.get(x)))
            .filter(Boolean)
            .map((x) => ({ ...x, isReply: true })); // đảm bảo là reply
          return { ...r, replies: expanded };
        }
        return r;
      })
      .filter((r) => !r.isReply); // bỏ các phần tử reply ở level 1
  }, [rawReviews]);

  const restaurant =
    location.state?.restaurant || { ...fallbackRestaurant, id: id || fallbackRestaurant.id };

  const [filter, setFilter] = useState("all");
  const [onlyWithImages, setOnlyWithImages] = useState(false);
  const [visible, setVisible] = useState(5);

  const filtered = useMemo(() => {
    return normalized.filter((r) => {
      const starOk = filter === "all" ? true : r.rating === Number(filter);
      const imgOk = onlyWithImages ? (r.images?.length || 0) > 0 : true;
      return starOk && imgOk;
    });
  }, [normalized, filter, onlyWithImages]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <CustomerSideBar />

      <main className="lg:ml-20">
        <div className="max-w-4xl mx-auto px-6 py-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <img
                src={restaurant.thumbnail}
                alt={restaurant.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tất cả đánh giá</h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">{restaurant.name}</span>
                  <span>•</span>
                  <Stars value={Math.round(restaurant.rating || 5)} size={14} />
                  <span>({restaurant.totalReviews} đánh giá)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {["all", 5, 4, 3, 2, 1].map((k) => (
                <FilterPill
                  key={k}
                  active={filter === String(k)}
                  onClick={() => setFilter(String(k))}
                >
                  {k === "all" ? "Tất cả" : `${k} sao`}
                </FilterPill>
              ))}
              <FilterPill
                active={onlyWithImages}
                onClick={() => setOnlyWithImages((s) => !s)}
              >
                Có hình ảnh
              </FilterPill>
            </div>
          </div>

          {/* List */}
          <div className="space-y-4">
            {filtered.slice(0, visible).map((rv) => (
              <ReviewCard key={rv.id} review={rv} />
            ))}
          </div>

          {/* Load more */}
          {visible < filtered.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisible((v) => v + 5)}
                className="px-5 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              >
                Xem thêm đánh giá
              </button>
            </div>
          )}

          {/* Back to restaurant */}
          <div className="flex justify-center mt-8">
            <Link
              to={endPoint.RESTAURANT_DETAIL(restaurant.id)}
              state={{ restaurant }}
              className="text-pink-600 hover:text-pink-700 font-medium"
            >
              ← Quay lại trang nhà hàng
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReviewDetailPage;
