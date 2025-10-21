import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ImageIcon,
  Users,
  Clock,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Camera,
  Star,
  ChefHat,
  X,
} from "lucide-react";
import CustomerSideBar from "@layout/SideBar";
import { useCreateCommunityPostMutation, useGetMeQuery } from "@redux/api/User/userApi";
import { usePresignUploadMutation, useUploadMutation } from "@redux/api/Storage/storageApi";
import { toast } from "react-hot-toast";
import { BASE_URL } from "@redux/api/baseApi";

const MAX_CONTENT = 500;
const MAX_FILE_MB = 10;

function PostPage() {
  const [postContent, setPostContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [privacy, setPrivacy] = useState("public");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  
  const [createCommunityPost, { isLoading: isSubmitting }] = useCreateCommunityPostMutation();
  const [presignUpload] = usePresignUploadMutation();
  const [uploadFile] = useUploadMutation();
  
  // Lấy thông tin user đã đăng nhập
  const { data: userData, isLoading: userLoading } = useGetMeQuery();

  // revoke object url khi thay ảnh/thoát
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const charCount = postContent.length;
  const remaining = Math.max(0, MAX_CONTENT - charCount);
  const canSubmit =
    (postContent.trim().length >= 10 || (imageFile && imageFile.serverKey)) && !isUploading && !error && !isSubmitting;

  const previewTime = useMemo(() => "Vừa xong", []);

  // Helper functions để lấy thông tin user
  const getUserName = () => {
    if (userLoading || !userData) return "Alex";
    return userData.userName || userData.fullName || "User";
  };

  const getUserAvatar = () => {
    if (userLoading || !userData?.avatarUrl) {
      return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face";
    }
    return `${BASE_URL}/Storage/view?key=${userData.avatarUrl}`;
  };

  const getUserInitial = () => {
    const name = getUserName();
    return name.charAt(0).toUpperCase();
  };

  const handleImageUpload = async (e) => {
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
    try {
      // Tạo preview ngay lập tức
      const previewUrl = URL.createObjectURL(file);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(previewUrl);
      setImageFile(file);

      // Upload file lên server
      try {
        // Thử upload trực tiếp trước
        const uploadResult = await uploadFile({ file }).unwrap();
        
        if (uploadResult?.key) {
          setImageFile({ ...file, serverKey: uploadResult.key });
          toast.success("Ảnh đã được tải lên thành công!");
        } else {
          throw new Error("No server key returned");
        }
      } catch (uploadError) {
        // Fallback: sử dụng presigned upload
        const presignResult = await presignUpload({
          fileName: file.name,
          contentType: file.type,
          prefix: "posts/"
        }).unwrap();
        
        if (presignResult?.url) {
          // Upload lên presigned URL
          const presignedResponse = await fetch(presignResult.url, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            },
          });
          
          if (presignedResponse.ok) {
            setImageFile({ ...file, serverKey: presignResult.key });
            toast.success("Ảnh đã được tải lên thành công!");
          } else {
            throw new Error("Presigned upload failed");
          }
        } else {
          throw new Error("No presigned URL");
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Có lỗi xảy ra khi tải ảnh lên. Bạn có thể đăng bài không có ảnh hoặc thử lại!");
      // Không xóa ảnh ngay, để user có thể thử lại hoặc đăng không ảnh
      // setImageFile(null);
      // setImagePreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setImageFile(null);
  };

  const onSubmit = async () => {
    if (!canSubmit) return;
    
    try {
      
    const payload = {
      content: postContent.trim(),
        imageUrl: imageFile?.serverKey || null,
      };
      
      // Chỉ gửi nếu có serverKey thực tế
      if (imageFile && !imageFile.serverKey) {
        payload.imageUrl = null;
      }
      
      await createCommunityPost(payload).unwrap();
      
      toast.success("Đăng bài thành công!");
      
      // Reset form
    setPostContent("");
    removeImage();
      setError("");
    } catch (err) {
      console.error("Create post error:", err);
      toast.error("Có lỗi xảy ra khi đăng bài. Vui lòng thử lại!");
    }
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
                <span className="relative z-10">
                  {isSubmitting ? "Đang đăng..." : "Đăng bài"}
                </span>
                {canSubmit && !isSubmitting && (
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
                    {userData?.avatarUrl ? (
                      <img
                        src={getUserAvatar()}
                        alt={getUserName()}
                        className="w-12 h-12 rounded-full object-cover shadow"
                      />
                    ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow">
                        <span className="text-white font-bold">{getUserInitial()}</span>
                    </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800">{getUserName()}</h3>
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

                {!imagePreview ? (
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
                        src={imagePreview}
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
                    
                    {/* Retry upload button nếu không có serverKey */}
                    {imageFile && !imageFile.serverKey && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-700 mb-2">
                          Ảnh chưa được tải lên server. Bạn có thể:
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1.5 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition"
                          >
                            Thử lại
                          </button>
                          <button
                            onClick={removeImage}
                            className="px-3 py-1.5 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition"
                          >
                            Xóa ảnh
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>


              {/* Privacy settings */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                      {userData?.avatarUrl ? (
                        <img
                          src={getUserAvatar()}
                          alt={getUserName()}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">{getUserInitial()}</span>
                      </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{getUserName()}</p>
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

                  {/* Image */}
                  {imagePreview && (
                    <div className="mb-4">
                      <img
                        src={imagePreview}
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
                    Chia sẻ trải nghiệm thực tế và chân thành
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

        {/* CSS animations */}
        <style>{`
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
