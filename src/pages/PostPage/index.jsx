import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ImageIcon,
  MapPin,
  Users,
  Clock,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Camera,
  Star,
  ChefHat,
  Utensils,
  X,
} from "lucide-react";
import CustomerSideBar from "@layout/SideBar";

const FOOD_TAGS = [
  "Món Việt",
  "Món Nhật",
  "Món Hàn",
  "Món Thái",
  "BBQ",
  "Lẩu",
  "Đồ uống",
  "Tráng miệng",
  "Healthy",
  "Vegetarian",
  "Street Food",
  "Fine Dining",
];

const MAX_CONTENT = 500;
const MAX_FILE_MB = 10;

function PostPage() {
  const [postContent, setPostContent] = useState("");
  const [location, setLocation] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [privacy, setPrivacy] = useState("public");
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // revoke object url khi thay ảnh/thoát
  useEffect(() => {
    return () => {
      if (imageURL) URL.revokeObjectURL(imageURL);
    };
  }, [imageURL]);

  const charCount = postContent.length;
  const remaining = Math.max(0, MAX_CONTENT - charCount);
  const canSubmit =
    (postContent.trim().length >= 10 || imageURL) && !isUploading && !error;

  const previewTime = useMemo(() => "Vừa xong", []);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Tệp không phải hình ảnh hợp lệ.");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`Ảnh vượt quá ${MAX_FILE_MB}MB.`);
      return;
    }

    setIsUploading(true);
    // giả lập delay upload
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      if (imageURL) URL.revokeObjectURL(imageURL);
      setImageURL(url);
      setIsUploading(false);
    }, 800);
  };

  const removeImage = () => {
    if (imageURL) URL.revokeObjectURL(imageURL);
    setImageURL(null);
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const onSubmit = () => {
    if (!canSubmit) return;
    // Submit payload mẫu
    const payload = {
      content: postContent.trim(),
      location: location.trim(),
      privacy,
      tags: selectedTags,
      hasImage: Boolean(imageURL),
    };
    // TODO: call API
    console.log("SUBMIT_POST", payload);
    // reset nhẹ nhàng (giữ lại tags/permission để post nhanh nhiều lần)
    setPostContent("");
    setLocation("");
    removeImage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 flex">
      <CustomerSideBar />

      <main className="flex-1 lg:ml-20">
        {/* Header sticky */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100/70">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Chia sẻ món ngon của bạn
                  </h2>
                  <p className="text-sm text-gray-500">
                    Hãy kể câu chuyện phía sau trải nghiệm ẩm thực ✨
                  </p>
                </div>
              </div>

              <button
                onClick={onSubmit}
                disabled={!canSubmit}
                className={`group relative px-4 py-1.5 rounded-xl font-semibold shadow-sm transition-all
                ${
                  canSubmit
                    ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:shadow-lg hover:scale-[1.02]"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                <span className="relative z-10">Đăng bài</span>
                {canSubmit && (
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Lỗi hiển thị */}
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 text-red-700 border border-red-100">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Form (2 cột) */}
            <div className="xl:col-span-2 space-y-6">
              {/* Profile + trạng thái */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow">
                      <span className="text-white font-bold">A</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800">Alex</h3>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 truncate">
                        Food Enthusiast
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Đăng ngay</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nội dung */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Nội dung bài viết
                </label>
                <div className="relative">
                  <textarea
                    value={postContent}
                    onChange={(e) =>
                      e.target.value.length <= MAX_CONTENT &&
                      setPostContent(e.target.value)
                    }
                    placeholder="Hãy chia sẻ trải nghiệm ẩm thực tuyệt vời của bạn... 🍜✨"
                    className="w-full h-40 p-5 bg-gray-50 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-pink-300/30 focus:border-pink-400 placeholder-gray-500 text-gray-700 transition-all"
                    maxLength={MAX_CONTENT}
                  />
                  <div
                    className={`absolute bottom-3 right-4 text-xs ${
                      remaining <= 30 ? "text-pink-600" : "text-gray-400"
                    }`}
                  >
                    {charCount}/{MAX_CONTENT}
                  </div>
                </div>
              </div>

              {/* Ảnh */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-800">
                    Hình ảnh món ăn
                  </label>
                  <span className="text-xs text-gray-500">
                    PNG/JPG/WebP • Tối đa {MAX_FILE_MB}MB
                  </span>
                </div>

                {!imageURL ? (
                  <div
                    className="relative border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:border-pink-400 hover:brightness-95 transition-all"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-base font-medium text-gray-700 mb-1">
                      Thêm ảnh món ăn tuyệt đẹp
                    </p>
                    <p className="text-sm text-gray-500">
                      Nhấn để chọn ảnh từ thiết bị
                    </p>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />

                    <div className="mt-5">
                      <span className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-5 py-2.5 rounded-full font-medium shadow hover:shadow-md transition">
                        <Camera className="w-4 h-4" />
                        Chọn ảnh
                      </span>
                    </div>

                    {isUploading && (
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                          <span className="text-gray-700 font-medium">
                            Đang tải lên...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="rounded-xl overflow-hidden shadow">
                      <img
                        src={imageURL}
                        alt="Preview"
                        className="w-full h-80 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-4 right-4 w-9 h-9 bg-red-500 text-white rounded-full flex items-center justify-center shadow hover:bg-red-600 transition opacity-90"
                        aria-label="Xoá ảnh"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Địa điểm */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Địa điểm
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Thêm vị trí nhà hàng, quán ăn..."
                    className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-300/30 focus:border-pink-400 placeholder-gray-500 text-gray-700 transition"
                  />
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                </div>
              </div>

              {/* Thẻ món ăn */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-pink-500" />
                    Thể loại món ăn
                  </label>
                  <span className="text-xs text-gray-500">
                    Đã chọn: <b>{selectedTags.length}</b>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {FOOD_TAGS.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                          ${
                            active
                              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow"
                              : "bg-white text-gray-700 border border-gray-300 hover:border-pink-300 hover:text-pink-600"
                          }`}
                        aria-pressed={active}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">
                      Quyền riêng tư:
                    </span>
                    <select
                      value={privacy}
                      onChange={(e) => setPrivacy(e.target.value)}
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-400 focus:border-pink-400 text-sm"
                    >
                      <option value="public">Công khai</option>
                      <option value="friends">Bạn bè</option>
                      <option value="private">Riêng tư</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <button className="flex items-center gap-2 hover:text-pink-600 transition">
                      <Users size={16} />
                      Tag bạn bè
                    </button>
                    <button className="flex items-center gap-2 hover:text-pink-600 transition">
                      <Clock size={16} />
                      Lên lịch
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview + mẹo (1 cột) */}
            <aside className="space-y-6">
              {/* Preview Card (sticky) */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 p-6 sticky top-24">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Xem trước
                </h3>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">A</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Alex</p>
                        <p className="text-sm text-gray-500">{previewTime}</p>
                      </div>
                    </div>
                    <MoreHorizontal size={20} className="text-gray-400" />
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    {postContent ? (
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {postContent}
                      </p>
                    ) : (
                      <p className="text-gray-400 italic">
                        Nội dung sẽ hiển thị ở đây...
                      </p>
                    )}
                  </div>

                  {/* Tags */}
                  {selectedTags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {location && (
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <MapPin size={14} />
                      <span>{location}</span>
                    </div>
                  )}

                  {/* Image */}
                  {imageURL && (
                    <div className="mb-4">
                      <img
                        src={imageURL}
                        alt="Preview"
                        className="rounded-lg w-full h-48 object-cover"
                      />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-5">
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-pink-500 transition">
                        <Heart size={18} />
                        <span className="text-sm">Thích</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition">
                        <MessageCircle size={18} />
                        <span className="text-sm">Bình luận</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-500 transition">
                        <Share size={18} />
                        <span className="text-sm">Chia sẻ</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white">💡</span>
                  </div>
                  <h3 className="font-bold text-gray-800">Tips viết bài hay</h3>
                </div>
                <ul className="space-y-2.5 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mt-2" />
                    Mô tả chi tiết hương vị và cảm nhận
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-rose-500 rounded-full mt-2" />
                    Chụp ảnh với ánh sáng tự nhiên
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                    Thêm địa điểm để giúp người khác tìm kiếm
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2" />
                    Sử dụng hashtag phù hợp
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>

        {/* nhỏ gọn: hiệu ứng intro cho phần tiêu đề nếu bạn cần */}
        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
        `}</style>
      </main>
    </div>
  );
}

export default PostPage;
