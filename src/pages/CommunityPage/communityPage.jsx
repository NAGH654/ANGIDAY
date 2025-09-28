import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CustomerSideBar from "@layout/SideBar";
import { endPoint } from "@routes/router";

// Components
import PostCard from "./components/postCard";
import RightSidebar from "./components/rightSidebar";
import { defaultPosts, topUsers, user } from "./data/data";

function CommunityPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [postList, setPostList] = useState(defaultPosts);

  const handleLike = (postId) => {
    setPostList((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              isLiked: !p.isLiked,
              interactions: {
                ...p.interactions,
                likes: p.isLiked
                  ? p.interactions.likes - 1
                  : p.interactions.likes + 1,
              },
            }
          : p
      )
    );
  };

  const handleSave = (postId) => {
    setPostList((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return postList;
    return postList.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.join(" ").toLowerCase().includes(q) ||
        p.author.name.toLowerCase().includes(q)
    );
  }, [postList, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 flex">
      <CustomerSideBar />
      <main className="flex-1 lg:ml-20">
        {/* Toolbar */}
        <div className="max-w-7xl mx-auto px-6 pt-7">
          <div className="flex items-center justify-between gap-5 bg-white p-3 rounded-xl">
            <div className="relative flex-1 max-w-2xl group">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors"
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm bài viết, địa điểm, tác giả..."
                className="w-full h-11 pl-10 pr-3 bg-gray-50 border border-gray-200 rounded-xl text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/10 transition"
              />
            </div>

            <Link
              to={endPoint.POST}
              className="inline-flex items-center justify-center h-11 px-5 rounded-xl text-[15px] font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-md hover:scale-[1.01] transition"
            >
              Đăng bài
            </Link>
          </div>
        </div>

        {/* Main */}
        <div className="max-w-7xl mx-auto px-6 py-5 flex gap-7">
          {/* Feed */}
          <div className="flex-1 min-w-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow border border-white/60 p-6 mb-7">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user.avatar}
                </div>
                <button
                  onClick={() => navigate(endPoint.POST)}
                  className="flex-1 text-left px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 text-[15px] hover:bg-gray-100 transition"
                >
                  Chia sẻ trải nghiệm ẩm thực của bạn...
                </button>
              </div>
            </div>

            <div className="space-y-7">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onSave={handleSave}
                />
              ))}
              {filteredPosts.length === 0 && (
                <div className="text-center py-14 bg-white/80 rounded-2xl border border-white/60">
                  <p className="text-gray-500">
                    Không tìm thấy kết quả phù hợp.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          <RightSidebar topUsers={topUsers} />
        </div>
      </main>
    </div>
  );
}

export default CommunityPage;
