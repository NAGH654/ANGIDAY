import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  MoreHorizontal,
  Star,
  Search,
  Users,
  Home,
  Settings
} from 'lucide-react';

import CustomerSideBar from '@layout/CustomerSideBar';

// Main Community Page Component
function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample community posts data
  const posts = [
    {
      id: 1,
      author: {
        name: 'Alex',
        avatar: '/api/placeholder/40/40',
        time: '5 phút trước'
      },
      title: 'Top 5 món ăn ngon ở Quận 1',
      content: [
        '1. Bún Bò Huế Đông Ba',
        '2. Cơm Tấm Ba Ghiền', 
        '3. Phở Lệ',
        '4. Pizza 4P\'s Saigon',
        '5. Bún Thịt Nướng Chị Thông'
      ],
      image: '/api/placeholder/600/400',
      interactions: {
        likes: 245,
        comments: 32,
        shares: 18,
        saves: 56
      },
      isLiked: false,
      isSaved: false
    }
  ];

  // Top users data
  const topUsers = [
    { name: 'Alex', points: '5.923.300', avatar: '/api/placeholder/32/32' },
    { name: 'Alex', points: '5.923.300', avatar: '/api/placeholder/32/32' },
    { name: 'Alex', points: '5.923.300', avatar: '/api/placeholder/32/32' },
    { name: 'Alex', points: '5.923.300', avatar: '/api/placeholder/32/32' },
    { name: 'Alex', points: '5.923.300', avatar: '/api/placeholder/32/32' }
  ];

  const [postList, setPostList] = useState(posts);

  const handleLike = (postId) => {
    setPostList(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            interactions: {
              ...post.interactions,
              likes: post.isLiked ? post.interactions.likes - 1 : post.interactions.likes + 1
            }
          }
        : post
    ));
  };

  const handleSave = (postId) => {
    setPostList(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <CustomerSideBar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-20">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-2xl relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm địa điểm ăn uống..."
                className="w-full h-10 pl-12 pr-6 bg-gray-50 border border-gray-200 rounded-md text-gray-700 
                focus:outline-none hover:border-pink-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 
                transition-all"
              />
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2 ml-6">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">👤</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
          {/* Left Content - Posts */}
          <div className="flex-1">
            <div className="space-y-6">
              {postList.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Post Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">A</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                          <p className="text-sm text-gray-500">{post.author.time}</p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreHorizontal size={20} className="text-gray-500" />
                      </button>
                    </div>

                    {/* Post Content */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
                    <div className="space-y-1 mb-4">
                      {post.content.map((item, index) => (
                        <p key={index} className="text-gray-700">{item}</p>
                      ))}
                    </div>
                  </div>

                  {/* Post Image */}
                  <div className="px-6 pb-4">
                    <img 
                      src={post.image} 
                      alt="Post content"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>

                  {/* Post Actions */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-2 text-gray-500 hover:text-pink-500 transition-colors"
                        >
                          <Star 
                            size={20} 
                            className={post.isLiked ? "text-yellow-400 fill-current" : ""} 
                          />
                          <span className="text-sm">Đánh giá</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageCircle size={20} />
                          <span className="text-sm">Bình luận</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                          <Share size={20} />
                          <span className="text-sm">Chia sẻ</span>
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => handleSave(post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors"
                      >
                        <Bookmark 
                          size={20} 
                          className={post.isSaved ? "text-purple-500 fill-current" : ""} 
                        />
                        <span className="text-sm">Lưu trữ</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Top Users */}
          <div className="w-80">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Người dùng có nhiều đánh giá</h3>
                <Star size={20} className="text-yellow-400" />
              </div>
              
              <div className="space-y-4">
                {topUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">A</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.points}</p>
                      </div>
                    </div>
                    <Star size={16} className="text-yellow-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50">
        <div className="flex justify-around">
          <a href="#" className="flex flex-col items-center space-y-1 text-gray-500">
            <Home size={20} />
            <span className="text-xs">Trang chủ</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 text-gray-500">
            <Heart size={20} />
            <span className="text-xs">Yêu thích</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 text-gray-900">
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

export default CommunityPage;