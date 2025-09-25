import CustomerSideBar from '@layout/CustomerSideBar';
import React, { useState } from "react";
import {
  Search,
  Clock,
  Bookmark,
  Star,
  MessageCircle,
  Share,
  Home,
  Heart,
  Users,
  Settings,
} from "lucide-react";

function PostBookMarkPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBookmarkType, setActiveBookmarkType] = useState('post');
  const [viewMode, setViewMode] = useState('list'); // Add viewMode state

  // Sample posts data
  const posts = [
    {
      id: 1,
      title: 'Top 5 món ăn ngon ở Quận 1',
      author: {
        name: 'Alex',
        avatar: '/api/placeholder/32/32'
      },
      timeAgo: '2 giờ trước',
      content: 'Chia sẻ những món ăn ngon nhất mà tôi đã thử ở Quận 1. Từ bánh mì, phở đến các món Tây, tất cả đều rất đáng để thử...',
      image: '/api/placeholder/400/200',
      tags: ['#QuanAn', '#Quan1', '#MonNgon'],
      interactions: {
        likes: 234,
        comments: 45,
        shares: 12
      }
    },
    {
      id: 2,
      title: 'Cách làm bánh mì Việt Nam chính gốc',
      author: {
        name: 'Mai',
        avatar: '/api/placeholder/32/32'
      },
      timeAgo: '5 giờ trước',
      content: 'Hướng dẫn chi tiết cách làm bánh mì Việt Nam từ A-Z. Từ cách làm bánh, pha nước chấm đến cách trang trí...',
      image: '/api/placeholder/400/200',
      tags: ['#BanhMi', '#CongThuc', '#VietNam'],
      interactions: {
        likes: 567,
        comments: 89,
        shares: 34
      }
    },
    {
      id: 3,
      title: 'Bún Bò Huế - Hương vị cố đô',
      author: {
        name: 'Phong',
        avatar: '/api/placeholder/32/32'
      },
      timeAgo: '1 ngày trước',
      content: 'Khám phá hương vị đặc trưng của Bún Bò Huế tại Sài Gòn. Những quán ngon mà bạn không thể bỏ qua...',
      image: '/api/placeholder/400/200',
      tags: ['#BunBoHue', '#Hue', '#AmThuc'],
      interactions: {
        likes: 123,
        comments: 28,
        shares: 9
      }
    },
    {
      id: 4,
      title: 'Café văn hóa Sài Gòn - Nơi hội tụ',
      author: {
        name: 'Linh',
        avatar: '/api/placeholder/32/32'
      },
      timeAgo: '2 ngày trước',
      content: 'Những quán café có không gian đẹp, phù hợp để làm việc, học tập và gặp gỡ bạn bè tại TP.HCM...',
      image: '/api/placeholder/400/200',
      tags: ['#Cafe', '#SaiGon', '#LamViec'],
      interactions: {
        likes: 345,
        comments: 67,
        shares: 23
      }
    },
    {
      id: 5,
      title: 'Pizza 4P\'s - Truyền thống Ý tại Việt Nam',
      author: {
        name: 'Tuấn',
        avatar: '/api/placeholder/32/32'
      },
      timeAgo: '3 ngày trước',
      content: 'Review chi tiết về Pizza 4P\'s - chuỗi pizza nổi tiếng với nguyên liệu tươi ngon và hương vị đậm đà...',
      image: '/api/placeholder/400/200',
      tags: ['#Pizza', '#4Ps', '#Review'],
      interactions: {
        likes: 189,
        comments: 34,
        shares: 15
      }
    },
    {
      id: 6,
      title: 'Phở Hà Nội - Tinh hoa ẩm thực Bắc Bộ',
      author: {
        name: 'Minh',
        avatar: '/api/placeholder/32/32'
      },
      timeAgo: '4 ngày trước',
      content: 'Khám phá những quán phở Hà Nội authentic nhất tại Sài Gòn. Từ nước dùng trong vắt đến thái thịt bò mỏng...',
      image: '/api/placeholder/400/200',
      tags: ['#Pho', '#HaNoi', '#Authentic'],
      interactions: {
        likes: 298,
        comments: 52,
        shares: 21
      }
    },
    {
      id: 7,
      title: 'Sushi Nhật Bản - Nghệ thuật trên đĩa',
      author: {
        name: 'Hana',
        avatar: '/api/placeholder/32/32'
      },
      timeAgo: '5 ngày trước',
      content: 'Trải nghiệm văn hóa ẩm thực Nhật Bản qua những miếng sushi tươi ngon tại các nhà hàng chất lượng...',
      image: '/api/placeholder/400/200',
      tags: ['#Sushi', '#Japanese', '#Culture'],
      interactions: {
        likes: 167,
        comments: 29,
        shares: 8
      }
    },
    {
      id: 8,
      title: 'Ăn Thức Thái Lan - Hương vị đậm đà',
      author: {
        name: 'Som',
        avatar: '/api/placeholder/32/32'
      },
      timeAgo: '6 ngày trước',
      content: 'Những món ăn Thái Lan không thể bỏ qua: Som tam, Pad Thai, Tom Yum... Cùng khám phá hương vị cay nồng...',
      image: '/api/placeholder/400/200',
      tags: ['#Thai', '#Spicy', '#Authentic'],
      interactions: {
        likes: 143,
        comments: 18,
        shares: 6
      }
    }
  ];

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <CustomerSideBar 
        activeBookmarkType={activeBookmarkType}
        setActiveBookmarkType={setActiveBookmarkType}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-20">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Bài viết đã lưu</h1>
                  <p className="text-gray-500 text-sm">Trang bài post được bookmark (danh sách yêu thích)</p>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  Cập nhật đến hôm nay
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="w-4 h-0.5 bg-current"></div>
                      <div className="w-4 h-0.5 bg-current"></div>
                      <div className="w-4 h-0.5 bg-current"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm bài viết đã lưu..."
                className="w-full h-12 pl-12 pr-6 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 
                focus:outline-none hover:border-pink-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
                transition-all"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-gray-600 mb-6">
            {filteredPosts.length} bài viết đã lưu
          </p>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Bookmark Button */}
                    <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm">
                      <Bookmark size={16} className="text-pink-500 fill-current" />
                    </button>
                  </div>

                  <div className="p-5">
                    {/* Author Info */}
                    <div className="flex items-center space-x-2 mb-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full bg-gray-200"
                      />
                      <span className="text-sm font-medium text-gray-700">{post.author.name}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{post.timeAgo}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.content}
                    </p>

                    {/* Tags */}
                    <div className="flex items-center space-x-2 mb-4">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="text-xs text-gray-400">+{post.tags.length - 2}</span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star size={14} className="text-yellow-400" />
                          <span>{post.interactions.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle size={14} />
                          <span>{post.interactions.comments}</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2.5 rounded-xl font-medium hover:shadow-lg transition-all text-sm">
                      Xem bài viết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 flex-1">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full bg-gray-200"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h2 className="text-xl font-bold text-gray-900 hover:text-pink-600 cursor-pointer transition-colors">
                              {post.title}
                            </h2>
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                            <span className="font-medium text-gray-700">{post.author.name}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{post.timeAgo}</span>
                            </div>
                            <span>•</span>
                            <span>{post.interactions.likes} lượt thích</span>
                          </div>
                        </div>
                      </div>

                      {/* Bookmark Button */}
                      <button className="flex items-center justify-center w-10 h-10 bg-pink-100 hover:bg-pink-200 rounded-xl transition-colors group">
                        <Bookmark size={18} className="text-pink-600 fill-current" />
                      </button>
                    </div>

                    {/* Post Content */}
                    <div className="flex gap-6">
                      <div className="flex-1">
                        <p className="text-gray-700 mb-4 line-clamp-3">
                          {post.content}
                        </p>

                        {/* Tags */}
                        <div className="flex items-center space-x-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-pink-100 hover:text-pink-600 cursor-pointer transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Post Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-6">
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-pink-500 transition-colors group">
                              <div className="p-2 group-hover:bg-pink-50 rounded-full transition-colors">
                                <Star size={18} />
                              </div>
                              <span className="text-sm font-medium">Đánh giá</span>
                            </button>
                            
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
                              <div className="p-2 group-hover:bg-blue-50 rounded-full transition-colors">
                                <MessageCircle size={18} />
                              </div>
                              <span className="text-sm font-medium">Bình luận</span>
                              <span className="text-xs text-gray-400">({post.interactions.comments})</span>
                            </button>
                            
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors group">
                              <div className="p-2 group-hover:bg-green-50 rounded-full transition-colors">
                                <Share size={18} />
                              </div>
                              <span className="text-sm font-medium">Chia sẻ</span>
                              <span className="text-xs text-gray-400">({post.interactions.shares})</span>
                            </button>
                          </div>

                          <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all text-sm">
                            Xem bài viết
                          </button>
                        </div>
                      </div>

                      {/* Post Image */}
                      {post.image && (
                        <div className="flex-shrink-0">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-32 h-32 object-cover rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bookmark size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Không tìm thấy bài viết
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Thử tìm kiếm với từ khóa khác hoặc xem tất cả bài viết đã lưu
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50">
        <div className="flex justify-around">
          <a href="#" className="flex flex-col items-center space-y-1 text-gray-500">
            <Home size={20} />
            <span className="text-xs">Trang chủ</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 text-pink-500">
            <Heart size={20} className="fill-current" />
            <span className="text-xs">Yêu thích</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 text-gray-500">
            <Users size={20} />
            <span className="text-xs">Cộng đồng</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 text-gray-500">
            <Settings size={20} />
            <span className="text-xs">Cài đặt</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default PostBookMarkPage;