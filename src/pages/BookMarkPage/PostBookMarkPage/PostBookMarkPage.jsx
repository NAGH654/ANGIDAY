import React, { useEffect, useMemo, useState } from "react";
import { Bookmark, Search } from "lucide-react";
import CustomerSideBar from "@layout/SideBar";

// components con
import CategoryFilter from "./components/categoryFilter";
import PostGridCard from "./components/postGridCard";
import PostListRow from "./components/postListRow";
import PostSortMenu from "./components/postSortMenu";
import ViewToggle from "./components/viewToggle";

// data + hooks + utils
import { POST_CATEGORIES } from "./data/data";
import {
  useGetBookmarkedPostsQuery,
  useUnbookmarkPostMutation,
} from "@redux/api/User/userApi";
import useDebouncedValue from "@hooks/useDebouncedValue";
import parseVnDate from "@utils/parseVnDate";

const PostBookMarkPage = () => {
  // sidebar state
  const [activeBookmarkType, setActiveBookmarkType] = useState("post");

  // view mode (persist)
  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem("bookmark-view-mode") || "list"
  );
  useEffect(() => {
    localStorage.setItem("bookmark-view-mode", viewMode);
  }, [viewMode]);

  // sort (persist)
  const [sortBy, setSortBy] = useState(
    () => localStorage.getItem("bookmark-sort") || "popular"
  );
  useEffect(() => {
    localStorage.setItem("bookmark-sort", sortBy);
  }, [sortBy]);

  // search + debounce
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery, 300);

  // category filter
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  // Load bookmarked posts from API
  const {
    data: apiPosts,
    isLoading,
    isFetching,
    refetch,
  } = useGetBookmarkedPostsQuery();
  const mappedApiPosts = useMemo(() => {
    if (!apiPosts) return null; // explicit null to indicate API loaded but maybe empty
    if (apiPosts.length === 0) return [];
    return apiPosts.map((p, idx) => ({
      id: p.id ?? p.postId ?? idx + 1000,
      title: p.title || p.type || "Bài viết",
      author: {
        name: p.username || "Người dùng",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
        verified: false,
      },
      timeAgo: "",
      content: p.content || "",
      image: p.imageUrl || null,
      tags: p.postTags || [],
      interactions: {
        likes: p.likes || 0,
        comments: p.comments || 0,
        shares: p.shares || 0,
      },
      bookmarkedDate: p.updatedAt || p.createdAt || "",
      category: p.category || "Review",
      isPopular: false,
    }));
  }, [apiPosts]);

  // bookmark toggle (gọi API + optimistic)
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [optimisticRemovedIds, setOptimisticRemovedIds] = useState(new Set());
  const [unbookmarkPost] = useUnbookmarkPostMutation();
  const toggleBookmark = async (id) => {
    const isSaved = bookmarkedIds.has(id);
    if (!isSaved) return; // trong trang này, chỉ thực hiện xóa lưu
    // optimistic remove
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setOptimisticRemovedIds((prev) => new Set(prev).add(id));
    try {
      await unbookmarkPost(id).unwrap();
      // sync lại danh sách từ server
      refetch();
    } catch (e) {
      // rollback nếu lỗi
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      setOptimisticRemovedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  // Hydrate ids when API changes
  useEffect(() => {
    // Đừng ghi đè trạng thái optimistic trong khi đang fetching
    if (!Array.isArray(mappedApiPosts)) return;
    const incoming = new Set(mappedApiPosts.map((p) => p.id));
    // Loại các id đang pending delete để không bật lại icon
    optimisticRemovedIds.forEach((id) => incoming.delete(id));
    setBookmarkedIds(incoming);
  }, [mappedApiPosts, isFetching, optimisticRemovedIds]);

  // filter + sort
  const filteredPosts = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    const source = Array.isArray(mappedApiPosts) ? mappedApiPosts : [];
    let list = source.filter((p) => {
      const qMatch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const cMatch =
        selectedCategory === "Tất cả" || p.category === selectedCategory;
      return qMatch && cMatch;
    });

    switch (sortBy) {
      case "likes":
        list.sort((a, b) => b.interactions.likes - a.interactions.likes);
        break;
      case "comments":
        list.sort((a, b) => b.interactions.comments - a.interactions.comments);
        break;
      case "shares":
        list.sort((a, b) => b.interactions.shares - a.interactions.shares);
        break;
      case "recent":
        list.sort(
          (a, b) =>
            parseVnDate(b.bookmarkedDate) - parseVnDate(a.bookmarkedDate)
        );
        break;
      case "popular":
      default:
        list.sort(
          (a, b) =>
            Number(b.isPopular) - Number(a.isPopular) ||
            b.interactions.likes +
              b.interactions.comments +
              b.interactions.shares -
              (a.interactions.likes +
                a.interactions.comments +
                a.interactions.shares)
        );
        break;
    }
    return list;
  }, [debouncedQuery, selectedCategory, sortBy, mappedApiPosts]);

  // label hiển thị ngắn gọn
  const sortLabel =
    {
      popular: "Độ phổ biến",
      recent: "Mới lưu",
      likes: "Nhiều lượt thích",
      comments: "Nhiều bình luận",
      shares: "Nhiều chia sẻ",
    }[sortBy] || "Độ phổ biến";

  return (
    <div className="bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 min-h-screen flex">
      {/* Sidebar */}
      <CustomerSideBar
        activeBookmarkType={activeBookmarkType}
        setActiveBookmarkType={setActiveBookmarkType}
      />

      {/* Main */}
      <main className="flex-1 lg:ml-20">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/60 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-4">
              {/* Title */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Bookmark size={22} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Bài viết đã lưu
                  </h2>
                  <p className="text-gray-500 text-xs md:text-sm">
                    Bộ sưu tập nội dung yêu thích của bạn
                  </p>
                </div>
              </div>

              {/* Search + Category (ngang hàng tiêu đề) */}
              <div className="relative order-last lg:order-none">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm bài viết đã lưu..."
                  className="w-full h-11 pl-4 pr-4 bg-white/90 backdrop-blur-sm border-2 border-gray-200/60 rounded-2xl text-gray-700 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-400
                    hover:border-pink-300 transition-all duration-300"
                  aria-label="Tìm kiếm bài viết đã lưu"
                />

                <div className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 gap-2">
                  <CategoryFilter
                    categories={POST_CATEGORIES}
                    selected={selectedCategory}
                    onChange={setSelectedCategory}
                  />
                </div>
              </div>

              {/* Controls: Sort + View */}
              <div className="flex items-center gap-2 justify-end">
                <PostSortMenu sortBy={sortBy} setSortBy={setSortBy} />
                <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <p className="text-xl text-gray-600 font-medium">
              {filteredPosts.length} bài viết được lưu
            </p>
            <div className="text-sm text-gray-600">
              Sắp xếp theo <span className="font-semibold">{sortLabel}</span>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <PostGridCard
                  key={post.id}
                  post={post}
                  isBookmarked={bookmarkedIds.has(post.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <PostListRow
                  key={post.id}
                  post={post}
                  isBookmarked={bookmarkedIds.has(post.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>
          )}

          {isLoading && (
            <div className="space-y-8">
              <div className="animate-pulse h-72 bg-white/80 rounded-2xl border border-white/60" />
              <div className="animate-pulse h-72 bg-white/80 rounded-2xl border border-white/60" />
              <div className="animate-pulse h-72 bg-white/80 rounded-2xl border border-white/60" />
            </div>
          )}

          {filteredPosts.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search size={48} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Không tìm thấy bài viết
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                Thử tìm kiếm với từ khóa khác hoặc xem tất cả bài viết đã lưu.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                Khám phá ngay
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PostBookMarkPage;
