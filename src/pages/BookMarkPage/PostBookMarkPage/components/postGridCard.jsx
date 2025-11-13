import React from "react";
import { Bookmark, Award, Heart, MessageCircle, Share, Eye } from "lucide-react";

const PostGridCard = ({ post, isBookmarked, onToggleBookmark }) => {
  return (
    <article className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
      {post.isPopular && (
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
          <Award size={12} />
          <span>PHỔ BIẾN</span>
        </div>
      )}

      <div className="relative overflow-hidden rounded-t-3xl">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title || "Ảnh bài viết"}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-56 bg-gray-100" />
        )}

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-xl text-xs font-medium">
          {post.category}
        </div>

        <button
          onClick={() => onToggleBookmark(post.id)}
          className="absolute bottom-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg group/bookmark"
          aria-label={isBookmarked ? "Bỏ lưu" : "Lưu"}
        >
          <Bookmark
            size={20}
            className={`${isBookmarked ? "text-pink-600 fill-current" : "text-pink-600"} group-hover/bookmark:scale-110 transition-transform`}
          />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">{post.author.name}</span>
              {post.author.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>{post.timeAgo}</span>
              <span>•</span>
              <span>Lưu: {post.bookmarkedDate}</span>
            </div>
          </div>
        </div>

        {(() => {
          const raw = typeof post.title === "string" ? post.title.trim() : "";
          const hide =
            !raw ||
            raw.toLowerCase() === "community_post" ||
            raw.toLowerCase() === "community-post";
          return (
            !hide && (
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2 leading-tight">
                {post.title}
              </h3>
            )
          );
        })()}

        <p className="text-gray-600 text-sm mb-5 leading-relaxed whitespace-pre-wrap break-words">
          {post.content}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 hover:text-pink-500 transition-colors cursor-pointer">
              <Heart size={16} className="fill-current" />
              <span className="font-medium">{post.interactions.likes}</span>
            </div>
            <div className="flex items-center space-x-1.5 hover:text-blue-500 transition-colors cursor-pointer">
              <MessageCircle size={16} />
              <span className="font-medium">{post.interactions.comments}</span>
            </div>
            <div className="flex items-center space-x-1.5 hover:text-green-500 transition-colors cursor-pointer">
              <Share size={16} />
              <span className="font-medium">{post.interactions.shares}</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2 rounded-xl font-medium text-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2">
          <Eye size={18} />
          <span>Xem bài viết</span>
        </button>
      </div>
    </article>
  );
};

export default React.memo(PostGridCard);
