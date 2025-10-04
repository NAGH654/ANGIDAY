import React from "react";
import { MapPin, MoreHorizontal, Heart, MessageCircle, Share } from "lucide-react";

const PostsSection = ({ restaurant, posts }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết gần đây</h2>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="border-b border-gray-100 pb-6 last:border-0">
            <div className="flex items-start space-x-3 mb-4">
              <img src={restaurant.thumbnail} alt={restaurant.name} className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">{restaurant.name}</span>
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${post.badgeColor}`}>{post.badge}</span>
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

            <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4 whitespace-pre-line">{post.content}</p>

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
  );
};

export default React.memo(PostsSection);
