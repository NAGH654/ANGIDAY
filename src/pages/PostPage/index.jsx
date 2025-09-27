import React, { useState } from 'react';
import { 
  Image as ImageIcon,
  MapPin,
  Users,
  Clock,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal
} from 'lucide-react';
import CustomerSideBar from '@layout/CustomerSideBar';

function PostPage() {
  const [postContent, setPostContent] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null); // ✅ state lưu ảnh

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerSideBar />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900">Tạo bài viết mới</h1>
          </div>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
            Đăng bài
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column - Create Post */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Nội dung bài viết</h2>
            
            {/* Author Info */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">A</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Alex</p>
                <p className="text-sm text-gray-500">Người dùng có nhiều danh giá</p>
              </div>
            </div>

            {/* Content Input */}
            <div className="mb-6">
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Chia sẻ những món ăn ngon bạn thử..."
                className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent placeholder-gray-400"
              />
            </div>

            {/* Image Upload Section */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Hình ảnh</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-pink-400 transition-colors">
                <ImageIcon size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">Nhấn để tải ảnh hoặc kéo thả</p>
                <p className="text-xs text-gray-400">PNG, JPG lên đến 10MB</p>

                {/* hidden input */}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="upload"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(URL.createObjectURL(e.target.files[0])); // ✅ preview local
                    }
                  }}
                />
                <label
                  htmlFor="upload"
                  className="mt-4 inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors"
                >
                  Chọn tệp
                </label>

                {/* preview ảnh */}
                {image && (
                  <div className="mt-4">
                    <img
                      src={image}
                      alt="Preview"
                      className="rounded-lg max-h-60 object-cover mx-auto"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Vị trí</h3>
              <div className="flex items-center space-x-3 text-gray-500">
                <MapPin size={16} />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Thêm vị trí..."
                  className="flex-1 border-0 focus:outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Additional Options */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-700">
                <Users size={16} />
                <span>Gắn tag bạn bè</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-700">
                <Clock size={16} />
                <span>Lên lịch đăng</span>
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Xem trước</h2>
            
            {/* Post Preview */}
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Alex</p>
                    <p className="text-sm text-gray-500">Vừa xong</p>
                  </div>
                </div>
                <button>
                  <MoreHorizontal size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Post Content Preview */}
              <div className="mb-4">
                {postContent ? (
                  <p className="text-gray-700">{postContent}</p>
                ) : (
                  <p className="text-gray-400 italic">Nội dung bài viết sẽ hiển thị ở đây...</p>
                )}
              </div>

              {/* Location if added */}
              {location && (
                <div className="flex items-center space-x-2 text-gray-500 text-sm mb-4">
                  <MapPin size={14} />
                  <span>{location}</span>
                </div>
              )}

              {/* Image preview trong bài viết */}
              {image && (
                <div className="mb-4">
                  <img
                    src={image}
                    alt="Post Preview"
                    className="rounded-lg max-h-80 object-cover w-full"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-pink-500 transition-colors">
                    <Heart size={18} />
                    <span className="text-sm">Thích</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle size={18} />
                    <span className="text-sm">Bình luận</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                    <Share size={18} />
                    <span className="text-sm">Chia sẻ</span>
                  </button>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <span className="text-sm">Lưu tin</span>
                </button>
              </div>
            </div>

            {/* Writing Tips */}
            <div className="bg-pink-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">💡</span>
                </div>
                <h3 className="font-semibold text-pink-800">Mẹo viết bài hay</h3>
              </div>
              <ul className="space-y-2 text-sm text-pink-700">
                <li>• Chia sẻ cảm nhận thật về món ăn</li>
                <li>• Thêm vị trí để giúp độc giả tìm kiếm</li>
                <li>• Sử dụng hashtag phù hợp</li>
                <li>• Chụp ảnh đẹp, ánh sáng tốt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
