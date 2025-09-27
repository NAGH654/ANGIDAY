import React, { useState } from 'react';
import { Search, Clock, Bookmark, Star, MessageCircle, Share, Home, Heart, Users, Settings, TrendingUp, Award, Eye, Filter } from 'lucide-react';

import CustomerSideBar from '@layout/CustomerSideBar';

// Main Component
const PostBookMarkPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBookmarkType, setActiveBookmarkType] = useState('post');
  const [viewMode, setViewMode] = useState('list');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const posts = [
    {
      id: 1,
      title: 'Top 5 món ăn ngon ở Quận 1',
      author: {
        name: 'Alex Nguyen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
        verified: true
      },
      timeAgo: '2 giờ trước',
      content: 'Chia sẻ những món ăn ngon nhất mà tôi đã thử ở Quận 1. Từ bánh mì, phở đến các món Tây, tất cả đều rất đáng để thử. Mỗi món đều có hương vị riêng biệt và để lại ấn tượng khó quên trong lòng thực khách.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
      tags: ['QuanAn', 'Quan1', 'MonNgon'],
      interactions: {
        likes: 234,
        comments: 45,
        shares: 12
      },
      bookmarkedDate: '15/01/2025',
      category: 'Review',
      isPopular: true
    },
    {
      id: 2,
      title: 'Cách làm bánh mì Việt Nam chính gốc',
      author: {
        name: 'Mai Nguyen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=64&h=64&fit=crop&crop=face',
        verified: false
      },
      timeAgo: '5 giờ trước',
      content: 'Hướng dẫn chi tiết cách làm bánh mì Việt Nam từ A-Z. Từ cách làm bánh, pha nước chấm đến cách trang trí để có được chiếc bánh mì hoàn hảo như ngoài hàng. Bí quyết tạo nên hương vị đậm đà.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      tags: ['BanhMi', 'CongThuc', 'VietNam'],
      interactions: {
        likes: 567,
        comments: 89,
        shares: 34
      },
      bookmarkedDate: '14/01/2025',
      category: 'Công thức',
      isPopular: true
    },
    {
      id: 3,
      title: 'Bún Bò Huế - Hương vị cố đô',
      author: {
        name: 'Phong Le',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
        verified: true
      },
      timeAgo: '1 ngày trước',
      content: 'Khám phá hương vị đặc trưng của Bún Bò Huế tại Sài Gòn. Những quán ngon mà bạn không thể bỏ qua, từ nước dùng đậm đà đến thái độ phục vụ chuyên nghiệp. Trải nghiệm ẩm thực đúng nghĩa.',
      image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&h=300&fit=crop',
      tags: ['BunBoHue', 'Hue', 'AmThuc'],
      interactions: {
        likes: 123,
        comments: 28,
        shares: 9
      },
      bookmarkedDate: '13/01/2025',
      category: 'Review',
      isPopular: false
    },
    {
      id: 4,
      title: 'Café văn hóa Sài Gòn - Nơi hội tụ',
      author: {
        name: 'Linh Tran',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
        verified: false
      },
      timeAgo: '2 ngày trước',
      content: 'Những quán café có không gian đẹp, phù hợp để làm việc, học tập và gặp gỡ bạn bè tại TP.HCM. Từ không gian cổ điển đến hiện đại, mỗi quán đều có nét riêng biệt và thu hút.',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
      tags: ['Cafe', 'SaiGon', 'LamViec'],
      interactions: {
        likes: 345,
        comments: 67,
        shares: 23
      },
      bookmarkedDate: '12/01/2025',
      category: 'Lifestyle',
      isPopular: false
    },
    {
      id: 5,
      title: 'Pizza 4Ps - Truyền thống Ý tại Việt Nam',
      author: {
        name: 'Tuấn Vo',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face',
        verified: true
      },
      timeAgo: '3 ngày trước',
      content: 'Review chi tiết về Pizza 4Ps - chuỗi pizza nổi tiếng với nguyên liệu tươi ngon và hương vị đậm đà. Từ không gian sang trọng đến chất lượng phục vụ tuyệt vời, đây là điểm đến lý tưởng.',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      tags: ['Pizza', '4Ps', 'Review'],
      interactions: {
        likes: 189,
        comments: 34,
        shares: 15
      },
      bookmarkedDate: '11/01/2025',
      category: 'Review',
      isPopular: true
    },
    {
      id: 6,
      title: 'Phở Hà Nội - Tinh hoa ẩm thực Bắc Bộ',
      author: {
        name: 'Minh Dao',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=64&h=64&fit=crop&crop=face',
        verified: true
      },
      timeAgo: '4 ngày trước',
      content: 'Khám phá những quán phở Hà Nội authentic nhất tại Sài Gòn. Từ nước dùng trong vắt đến thái thịt bò mỏng, tất cả đều phải đạt chuẩn truyền thống. Hương vị đích thực của miền Bắc.',
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
      tags: ['Pho', 'HaNoi', 'Authentic'],
      interactions: {
        likes: 298,
        comments: 52,
        shares: 21
      },
      bookmarkedDate: '10/01/2025',
      category: 'Review',
      isPopular: false
    }
  ];

  const categories = ['Tất cả', 'Review', 'Công thức', 'Lifestyle', 'Culture'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'Tất cả' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 min-h-screen flex">
      {/* Sidebar */}
      <CustomerSideBar 
        activeBookmarkType={activeBookmarkType}
        setActiveBookmarkType={setActiveBookmarkType}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-20">
        {/* Enhanced Header */}
        <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Bookmark size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Bài viết đã lưu
                  </h1>
                  <p className="text-gray-500 text-lg">
                    Bộ sưu tập nội dung yêu thích của bạn
                  </p>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-3 bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-lg text-pink-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white shadow-lg text-pink-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="w-5 h-1 bg-current rounded-full"></div>
                    <div className="w-5 h-1 bg-current rounded-full"></div>
                    <div className="w-5 h-1 bg-current rounded-full"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Enhanced Search */}
            <div className="relative mb-6">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                size={22}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm bài viết đã lưu..."
                className="w-full h-14 pl-14 pr-6 bg-white/80 backdrop-blur-sm border-2 border-gray-200/60 rounded-2xl text-gray-700 placeholder-gray-400 text-lg
                focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-400 focus:bg-white/90
                hover:border-pink-300 hover:bg-white/70 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-2xl whitespace-nowrap font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-xl text-gray-600 font-medium">
              {filteredPosts.length} bài viết được lưu
            </p>
            <div className="flex items-center space-x-2 text-gray-500">
              <TrendingUp size={16} />
              <span className="text-sm">Sắp xếp theo độ phổ biến</span>
            </div>
          </div>

          {/* Enhanced Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Popular Badge */}
                  {post.isPopular && (
                    <div className="absolute top-4 left-4 z-10 flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      <Award size={12} />
                      <span>PHỔ BIẾN</span>
                    </div>
                  )}

                  <div className="relative overflow-hidden rounded-t-3xl">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-xl text-xs font-medium">
                      {post.category}
                    </div>

                    {/* Bookmark Button */}
                    <button className="absolute bottom-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg group/bookmark">
                      <Bookmark size={20} className="text-pink-500 fill-current group-hover/bookmark:scale-110 transition-transform" />
                    </button>
                  </div>

                  <div className="p-6">
                    {/* Author Info */}
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

                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed">
                      {post.content}
                    </p>

                    {/* Tags */}
                    <div className="flex items-center space-x-2 mb-5 overflow-x-auto scrollbar-hide">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-xs font-medium rounded-full whitespace-nowrap hover:from-pink-200 hover:to-purple-200 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="text-xs text-gray-400">+{post.tags.length - 2}</span>
                      )}
                    </div>

                    {/* Stats */}
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

                    <button className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3.5 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2">
                      <Eye size={18} />
                      <span>Xem bài viết</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Enhanced List View */}
          {viewMode === 'list' && (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-8">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4 flex-1">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h2 className="text-2xl font-bold text-gray-900 hover:text-pink-600 cursor-pointer transition-colors">
                              {post.title}
                            </h2>
                            {post.author.verified && (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                            {post.isPopular && (
                              <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                                <Award size={12} />
                                <span>HOT</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="font-semibold text-gray-700">{post.author.name}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1.5">
                              <Clock size={14} />
                              <span>{post.timeAgo}</span>
                            </div>
                            <span>•</span>
                            <span className="text-pink-600 font-medium">Lưu: {post.bookmarkedDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Category & Bookmark */}
                      <div className="flex items-center space-x-3">
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl">
                          {post.category}
                        </span>
                        <button className="flex items-center justify-center w-12 h-12 bg-pink-100 hover:bg-pink-200 rounded-2xl transition-colors group">
                          <Bookmark size={20} className="text-pink-600 fill-current group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="flex gap-8">
                      <div className="flex-1">
                        <p className="text-gray-700 mb-6 line-clamp-4 text-base leading-relaxed">
                          {post.content}
                        </p>

                        {/* Tags */}
                        <div className="flex items-center space-x-3 mb-6">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-sm font-medium rounded-2xl hover:from-pink-200 hover:to-purple-200 cursor-pointer transition-all duration-200 hover:scale-105"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Post Actions */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                          <div className="flex items-center space-x-8">
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-pink-500 transition-colors group">
                              <div className="p-3 group-hover:bg-pink-50 rounded-2xl transition-colors">
                                <Heart size={20} className="fill-current" />
                              </div>
                              <div className="text-left">
                                <div className="text-sm font-semibold">Đánh giá</div>
                                <div className="text-xs text-gray-400">{post.interactions.likes}</div>
                              </div>
                            </button>
                            
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
                              <div className="p-3 group-hover:bg-blue-50 rounded-2xl transition-colors">
                                <MessageCircle size={20} />
                              </div>
                              <div className="text-left">
                                <div className="text-sm font-semibold">Bình luận</div>
                                <div className="text-xs text-gray-400">{post.interactions.comments}</div>
                              </div>
                            </button>
                            
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors group">
                              <div className="p-3 group-hover:bg-green-50 rounded-2xl transition-colors">
                                <Share size={20} />
                              </div>
                              <div className="text-left">
                                <div className="text-sm font-semibold">Chia sẻ</div>
                                <div className="text-xs text-gray-400">{post.interactions.shares}</div>
                              </div>
                            </button>
                          </div>

                          <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center space-x-2">
                            <Eye size={18} />
                            <span>Xem bài viết</span>
                          </button>
                        </div>
                      </div>

                      {/* Post Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-40 h-40 object-cover rounded-3xl hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search size={48} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Không tìm thấy bài viết
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                Thử tìm kiếm với từ khóa khác hoặc xem tất cả bài viết đã lưu
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                Khám phá ngay
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/60 px-6 py-4 z-50">
        <div className="flex justify-around">
          <button className="flex flex-col items-center space-y-1 text-gray-500 transition-colors hover:text-gray-700">
            <Home size={24} />
            <span className="text-xs font-medium">Trang chủ</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-pink-500">
            <Heart size={24} className="fill-current" />
            <span className="text-xs font-medium">Yêu thích</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-500 transition-colors hover:text-gray-700">
            <Users size={24} />
            <span className="text-xs font-medium">Cộng đồng</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-500 transition-colors hover:text-gray-700">
            <Settings size={24} />
            <span className="text-xs font-medium">Cài đặt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostBookMarkPage;