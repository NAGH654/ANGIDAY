import React from "react";
import {
  Award,
  MoreHorizontal,
  Clock,
  MapPin,
  MessageCircle,
  Share,
  Star,
  Bookmark,
} from "lucide-react";

const PostCard = ({ post, onLike, onSave }) => {
  return (
    <article className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow border border-white/60 hover:shadow-lg transition overflow-hidden">
      {/* Popular */}
      {post.isPopular && (
        <div className="absolute mt-5 ml-5 z-10 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-[11px] font-bold shadow">
          <Award size={14} />
          PHỔ BIẾN
        </div>
      )}

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border border-gray-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900 text-[15px]">
                  {post.author.name}
                </p>
                {post.author.verified && (
                  <span className="px-1.5 py-0.5 text-[10px] rounded bg-blue-500 text-white">
                    ✓
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} /> {post.author.time}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} /> {post.author.location}
                </span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <MoreHorizontal size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Title + Content */}
        <h2 className="text-xl font-bold text-gray-900 mt-3 mb-2 group-hover:text-pink-600 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-700 text-base leading-relaxed">
          {post.content}
        </p>

        {/* Food list */}
        {post.foodList?.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-5 mt-4">
            <div className="space-y-3">
              {post.foodList.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 bg-white/60 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white text-sm font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <p className="text-gray-800 text-[15px] font-medium">
                    {item.substring(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mt-4">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-sm font-medium rounded-2xl"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image */}
      {post.image && (
        <div className="px-6 pb-4">
          <img
            src={post.image}
            alt="Post"
            className="w-full h-72 object-cover rounded-2xl shadow-sm group-hover:scale-[1.01] transition-transform"
            loading="lazy"
          />
        </div>
      )}

      {/* Stats */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between text-sm text-gray-500 border-top border-gray-100 pt-3">
          <div className="flex items-center gap-5">
            <span>{post.interactions.likes} lượt thích</span>
            <span>{post.interactions.comments} bình luận</span>
            <span>{post.interactions.shares} chia sẻ</span>
          </div>
          <span>{post.interactions.saves} lượt lưu</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onLike(post.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition
                ${
                  post.isLiked
                    ? "bg-yellow-100 text-yellow-700"
                    : "text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
                }`}
            >
              <Star size={18} className={post.isLiked ? "fill-current" : ""} />
              Đánh giá
            </button>

            <button className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
              <MessageCircle size={18} />
              Bình luận
            </button>

            <button className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-600 transition">
              <Share size={18} />
              Chia sẻ
            </button>
          </div>

          <button
            onClick={() => onSave(post.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition
              ${
                post.isSaved
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              }`}
          >
            <Bookmark
              size={18}
              className={post.isSaved ? "fill-current" : ""}
            />
            Lưu
          </button>
        </div>
      </div>
    </article>
  );
};

export default React.memo(PostCard);
