import React from "react";
import { Bookmark, Award, Heart, MessageCircle, Share, Eye, Clock } from "lucide-react";

const PostListRow = ({ post, isBookmarked, onToggleBookmark }) => {
  return (
    <article className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4 flex-1">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {(() => {
                  const raw = typeof post.title === "string" ? post.title.trim() : "";
                  const hide =
                    !raw ||
                    raw.toLowerCase() === "community_post" ||
                    raw.toLowerCase() === "community-post";
                  return (
                    !hide && (
                      <h2 className="text-2xl font-bold text-gray-900 hover:text-pink-600 cursor-pointer transition-colors">
                        {post.title}
                      </h2>
                    )
                  );
                })()}
                {post.author.verified && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
                {post.isPopular && (
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                    <Award size={12} />
                    HOT
                  </span>
                )}
              </div>
              <div className="flex items-center flex-wrap gap-3 text-sm text-gray-500">
                <span className="font-semibold text-gray-700">{post.author.name}</span>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>{post.timeAgo}</span>
                </div>
                <span>•</span>
                <span className="text-pink-600 font-medium">Lưu: {post.bookmarkedDate}</span>
                <span>•</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium">{post.category}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onToggleBookmark(post.id)}
            className="flex items-center justify-center w-12 h-12 bg-pink-100 hover:bg-pink-200 rounded-2xl transition-colors group"
            aria-label={isBookmarked ? "Bỏ lưu" : "Lưu"}
          >
            <Bookmark size={20} className="text-pink-600 fill-current group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <p className="text-gray-700 mb-6 text-base leading-relaxed whitespace-pre-wrap break-words">
              {post.content}
            </p>

            <div className="flex items-center gap-3 mb-6 flex-wrap">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-sm font-medium rounded-2xl hover:from-pink-200 hover:to-purple-200 cursor-pointer transition-all duration-200 hover:scale-105"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <div className="flex items-center gap-6 md:gap-8">
                <div className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors">
                  <Heart size={20} className="fill-current" />
                  <span className="text-sm font-semibold">{post.interactions.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle size={20} />
                  <span className="text-sm font-semibold">{post.interactions.comments}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                  <Share size={20} />
                  <span className="text-sm font-semibold">{post.interactions.shares}</span>
                </div>
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-2">
                <Eye size={18} />
                <span>Xem bài viết</span>
              </button>
            </div>
          </div>

          <div className="flex-shrink-0">
            {post.image ? (
              <img
                src={post.image}
                alt={post.title || "Ảnh bài viết"}
                className="w-40 h-40 object-cover rounded-3xl hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="w-40 h-40 bg-gray-100 rounded-3xl" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default React.memo(PostListRow);
