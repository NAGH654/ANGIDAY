import React, { useMemo, useState, useMemo as useReactMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CustomerSideBar from "@layout/SideBar";
import { endPoint } from "@routes/router";

// Components
import PostCard from "./components/postCard.jsx";
import RightSidebar from "./components/rightSideBar.jsx";
import { topUsers, user } from "./data/data";
import {
  useGetMyCommunityPostsQuery,
  useGetBookmarkedPostsQuery,
  useGetLikedPostsQuery,
  useBookmarkPostMutation,
  useUnbookmarkPostMutation,
  useGetMeQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} from "@redux/api/User/userApi.js";
import { BASE_URL } from "@redux/api/baseApi";

function CommunityPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const { data: myPosts, isLoading } = useGetMyCommunityPostsQuery();
  const { data: bookmarkedList } = useGetBookmarkedPostsQuery();
  // const { data: likedList } = useGetLikedPostsQuery(); // Disabled until backend implements this endpoint
  const { data: userData, isLoading: userLoading } = useGetMeQuery();

  // Helper functions để lấy thông tin user
  const getUserName = () => {
    if (userLoading || !userData) return "User";
    return userData.userName || userData.fullName || "User";
  };

  const getUserAvatar = () => {
    if (userLoading || !userData?.avatarUrl) {
      return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face";
    }
    return `${BASE_URL}/Storage/view?key=${userData.avatarUrl}`;
  };

  const getUserInitial = () => {
    const name = getUserName();
    return name.charAt(0).toUpperCase();
  };

  // map API -> UI post shape and merge with mock until backend has multiple
  const apiMappedPosts = useMemo(() => {
    if (!myPosts || myPosts.length === 0) return [];
    
    // Build a Set of bookmarked ids for quick lookup
    const bookmarkedIds = new Set(
      (Array.isArray(bookmarkedList) ? bookmarkedList : [])
        .map((b) => b?.id ?? b?.postId)
        .filter(Boolean)
    );
    
    // Build a Set of liked ids for quick lookup (using localStorage until backend implements API)
    const likedIds = new Set(
      JSON.parse(localStorage.getItem('likedPosts') || '[]')
    );
    
    return myPosts.map((p, idx) => {
      const mappedPost = {
        id: p.id ?? p.postId ?? idx + 1000,
        author: {
          name: p.username || "Bạn",
          avatar: p.userAvatar 
            ? `${BASE_URL}/Storage/view?key=${p.userAvatar}`
            : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
          time: p.createdAt ? new Date(p.createdAt).toLocaleString() : "",
          verified: false,
          location: "",
        },
        title: p.title || p.type || "Bài viết",
        content: p.content || "",
        foodList: [],
        image: p.imageUrl && !p.imageUrl.startsWith('blob:') ? `${BASE_URL}/Storage/view?key=${p.imageUrl}` : null,
        hasInvalidImage: p.imageUrl?.startsWith('blob:'),
        interactions: {
          likes: typeof p.totalLikes === 'number' ? p.totalLikes : 0,
          comments: typeof p.totalComments === 'number' ? p.totalComments : 0,
          shares: 0,
          saves: typeof p.totalBookmarks === 'number' ? p.totalBookmarks : 0,
        },
        isLiked: likedIds.has(p.id ?? p.postId),
        isSaved: bookmarkedIds.has(p.id ?? p.postId),
        tags: [],
        isPopular: false,
      };
      
      
      return mappedPost;
    });
  }, [myPosts, bookmarkedList]);

  const [postList, setPostList] = useState([]);
  const [showCommentsForPostId, setShowCommentsForPostId] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const fetchComments = async (postId) => {
    setCommentsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/Post/detail-post/${postId}`);
      const data = await res.json();
      setCommentsData(data?.data?.comments || []);
    } catch (e) {
      setCommentsData([]);
    }
    setCommentsLoading(false);
  };

  useEffect(() => {
    if (showCommentsForPostId) {
      fetchComments(showCommentsForPostId);
    } else {
      setCommentsData([]);
    }
  }, [showCommentsForPostId]);

  const handleShowComments = (postId) => {
    setShowCommentsForPostId(postId);
  };

  React.useEffect(() => {
    // Use only API posts; empty list will show empty state
    if (apiMappedPosts.length > 0) setPostList(apiMappedPosts);
    else setPostList([]);
  }, [apiMappedPosts]);

  const handleLike = async (postId) => {
    // decide current state
    const isCurrentlyLiked = postList.find((p) => p.id === postId)?.isLiked;
    
    // optimistic toggle
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
    
    try {
      if (isCurrentlyLiked) {
        await unlikePost(postId).unwrap();
        // Remove from localStorage
        const currentLiked = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        const updatedLiked = currentLiked.filter(id => id !== postId);
        localStorage.setItem('likedPosts', JSON.stringify(updatedLiked));
        showToast("Đã bỏ thích bài viết", "info");
      } else {
        await likePost(postId).unwrap();
        // Add to localStorage
        const currentLiked = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        if (!currentLiked.includes(postId)) {
          currentLiked.push(postId);
          localStorage.setItem('likedPosts', JSON.stringify(currentLiked));
        }
        showToast("Đã thích bài viết", "success");
      }
    } catch (e) {
      // rollback on error
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
      showToast("Thao tác thất bại", "error");
    }
  };

  const [bookmarkPost] = useBookmarkPostMutation();
  const [unbookmarkPost] = useUnbookmarkPostMutation();
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [toast, setToast] = React.useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 2000);
  };

  const handleSave = async (postId) => {
    // decide current state
    const isCurrentlySaved = postList.find((p) => p.id === postId)?.isSaved;
    // optimistic toggle
    setPostList((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p))
    );
    try {
      if (isCurrentlySaved) {
        await unbookmarkPost(postId).unwrap();
        showToast("Đã xóa khỏi lưu", "info");
      } else {
        await bookmarkPost(postId).unwrap();
        showToast("Đã lưu bài viết", "success");
      }
    } catch (e) {
      // rollback on error
      setPostList((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p))
      );
      showToast("Thao tác thất bại", "error");
    }
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
        {toast && (
          <div
            className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-xl shadow text-white ${
              toast.type === "success"
                ? "bg-emerald-500"
                : toast.type === "info"
                ? "bg-blue-500"
                : "bg-rose-500"
            }`}
          >
            {toast.message}
          </div>
        )}
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
                {userData?.avatarUrl ? (
                  <img
                    src={getUserAvatar()}
                    alt={getUserName()}
                    className="w-12 h-12 rounded-full object-cover border border-gray-100"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {getUserInitial()}
                  </div>
                )}
                <button
                  onClick={() => navigate(endPoint.POST)}
                  className="flex-1 text-left px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 text-[15px] hover:bg-gray-100 transition"
                >
                  Chia sẻ trải nghiệm ẩm thực của bạn...
                </button>
              </div>
            </div>

            <div className="space-y-7">
              {isLoading && (
                <>
                  <div className="animate-pulse bg-white/80 rounded-2xl border border-white/60 h-40" />
                  <div className="animate-pulse bg-white/80 rounded-2xl border border-white/60 h-40" />
                  <div className="animate-pulse bg-white/80 rounded-2xl border border-white/60 h-40" />
                </>
              )}
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onSave={handleSave}
                  onShowComments={handleShowComments}
                />
              ))}
              {filteredPosts.length === 0 && !isLoading && (
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
        {/* Comments Modal */}
        {showCommentsForPostId && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6 relative">
              <button onClick={() => setShowCommentsForPostId(null)} className="absolute top-3 right-3 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xl">×</span>
              </button>
              <h3 className="font-bold text-lg mb-4">Bình luận</h3>
              {commentsLoading && <div className="py-8 text-center text-gray-500">Đang tải...</div>}
              {!commentsLoading && commentsData.length === 0 && <div className="py-8 text-center text-gray-500">Chưa có bình luận.</div>}
              {!commentsLoading && commentsData.length > 0 && (
                <div className="space-y-5 max-h-96 overflow-y-auto">
                  {commentsData.map((c) => (
                    <div key={c.id} className="rounded-xl bg-gray-100 p-4">
                      <p className="font-semibold text-pink-700 mb-1">{c.username}</p>
                      <p className="text-gray-700 leading-relaxed mb-1">{c.content}</p>
                      <p className="text-sm text-gray-500">{c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CommunityPage;
