import React, { useState } from "react";
import {
  Edit,
  MoreHorizontal,
  MapPin,
  X,
  Camera,
  Save,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  TrendingUp,
  Award,
  Calendar,
  Mail,
  Phone,
  Sparkles,
  Image as ImageIcon
} from "lucide-react";
import CustomerSideBar from "@layout/SideBar";
import { useGetMeQuery, useUpdateProfileMutation, useUpdateAvatarMutation } from "@redux/api/User/userApi";
import { BASE_URL } from "@redux/api/baseApi";
import { usePresignUploadMutation } from "@redux/api/Storage/storageApi";
import { useUploadMutation } from "@redux/api/Storage/storageApi";

function stripTrailingApi(url) {
  if (!url) return "";
  return String(url).replace(/\/?api\/?$/, "");
}

function buildAssetUrl(relativePath) {
  const configuredBase = import.meta.env.VITE_API_BASE_URL || BASE_URL;
  const origin = configuredBase.startsWith("http")
    ? configuredBase
    : (import.meta.env.VITE_API_BASE_URL || "https://angiday-production-c5c0.up.railway.app");
  const baseNoApi = stripTrailingApi(origin).replace(/\/$/, "");
  const cleanPath = String(relativePath || "").replace(/^\/+/, "");
  return `${baseNoApi}/${cleanPath}`;
}

function UserProfile() {
  const { data: me, isLoading, isError, refetch } = useGetMeQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [updateAvatar] = useUpdateAvatarMutation();
  const [presignUpload] = usePresignUploadMutation();
  const [directUpload] = useUploadMutation();
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "",
    dateOfBirth: "",
  });
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');

  React.useEffect(() => {
    if (me) {
      setFormData({
        fullName: me.fullName || "",
        username: me.username || "",
        email: me.email || "",
        phoneNumber: me.phoneNumber || "",
        address: me.address || "",
        gender: me.gender || "",
        dateOfBirth: me.dateOfBirth || "",
      });
      if (me.avatarUrl && !avatarPreview) {
        setAvatarSrc(buildAssetUrl(me.avatarUrl));
      }
    }
  }, [me, avatarPreview]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAvatar(file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let avatarKey = null;
      if (selectedAvatar) {
        try {
          // 1) presign
          const sign = await presignUpload({
            fileName: selectedAvatar.name,
            contentType: selectedAvatar.type || "application/octet-stream",
            prefix: "avatars",
          }).unwrap();
          // 2) PUT to storage (may fail CORS depending on provider config)
          const resp = await fetch(sign.url, {
            method: sign.method || "PUT",
            headers: { "Content-Type": sign.contentType || selectedAvatar.type || "application/octet-stream" },
            body: selectedAvatar,
          });
          if (!resp.ok) throw new Error(`Upload failed with status ${resp.status}`);
          avatarKey = sign.key;
        } catch (err) {
          // Fallback to direct upload through backend to avoid CORS
          const up = await directUpload({ file: selectedAvatar, key: undefined }).unwrap();
          avatarKey = up?.key || up; // backend may return { key }
        }
      }

      const payload = { ...formData };
      if (avatarKey) payload.avatarUrl = avatarKey;

      await updateProfile(payload).unwrap();

      setIsEditOpen(false);
      setSelectedAvatar(null);
      setAvatarPreview(null);
      refetch();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const user = {
    name: me?.fullName || me?.fullname || me?.username || "Người dùng",
    handle: me?.email ? `@${String(me.email).split("@")[0]}` : "@user",
    role: me?.roleName || me?.role || "customer",
    tagline: me?.address || me?.city || "Food Lover 🍕",
    avatarBg: "from-pink-500 via-purple-500 to-indigo-500",
    cover: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=360&fit=crop",
    stats: {
      posts: me?.totalPosts ?? 24,
      followers: me?.followers ?? me?.totalFollowers ?? 1258,
      following: me?.following ?? me?.totalFollowing ?? 436,
    },
    bioBadges: [
      me?.address || me?.city || "TP.HCM",
      me?.gender || "",
      me?.phoneNumber ? `📞 ${me.phoneNumber}` : "",
    ].filter(Boolean),
    contact: me?.email || "",
    verified: true,
  };

  const mockPosts = [
    {
      id: 1,
      title: 'Top 5 món ăn ngon ở Quận 1',
      content: 'Chia sẻ những món ăn tuyệt vời mà tôi đã thử...',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop',
      likes: 234,
      comments: 45,
      shares: 12,
      timeAgo: '5 giờ trước'
    },
    {
      id: 2,
      title: 'Review Pizza 4P\'s - Trải nghiệm tuyệt vời',
      content: 'Pizza ở đây thật sự đáng để thử!',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop',
      likes: 189,
      comments: 32,
      shares: 8,
      timeAgo: '1 ngày trước'
    }
  ];

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 min-h-screen">
        <CustomerSideBar />
        <main className="lg:ml-20">
          <div className="max-w-6xl mx-auto px-4 pt-8">
            <div className="animate-pulse space-y-4">
              <div className="h-64 bg-gray-200/60 rounded-3xl" />
              <div className="h-32 bg-gray-200/60 rounded-3xl" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 min-h-screen">
        <CustomerSideBar />
        <main className="lg:ml-20">
          <div className="max-w-6xl mx-auto px-4 pt-10">
            <div className="p-6 rounded-2xl bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700">
              <p className="font-semibold mb-2">Không tải được thông tin hồ sơ</p>
              <button onClick={() => refetch()} className="underline hover:no-underline">
                Thử lại
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 min-h-screen">
      <CustomerSideBar />

      <main className="lg:ml-20">
        {/* Hero Section */}
        <section className="relative">
          {/* Cover Image */}
          <div className="h-72 md:h-96 relative overflow-hidden">
            <img
              src={user.cover}
              alt="cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Edit Cover Button */}
            <button className="absolute top-6 right-6 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all flex items-center space-x-2">
              <Camera size={16} />
              <span className="text-sm font-medium">Đổi ảnh bìa</span>
            </button>
          </div>

          {/* Profile Card */}
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="relative -mt-32">
              <div className="bg-white/95 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  
                  {/* Left: Avatar + Info */}
                  <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="relative shrink-0 -mt-20">
                      <div className="relative">
                        {(avatarPreview || avatarSrc) ? (
                          <img
                            src={avatarPreview || avatarSrc}
                            alt={user.name}
                            className="w-32 h-32 md:w-36 md:h-36 rounded-3xl object-cover ring-8 ring-white shadow-2xl"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-32 h-32 md:w-36 md:h-36 bg-gradient-to-br ${user.avatarBg} rounded-3xl flex items-center justify-center text-white text-5xl font-bold ring-8 ring-white shadow-2xl ${(avatarPreview || avatarSrc) ? 'hidden' : 'flex'}`}
                        >
                          {user.name?.[0] || "U"}
                        </div>
                        
                        {/* Online Status */}
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full ring-4 ring-white"></div>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 pt-2">
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                          {user.name}
                        </h1>
                        {user.verified && (
                          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center ring-4 ring-blue-100">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 rounded-full">
                          <Award size={14} className="text-white" />
                          <span className="text-xs font-bold text-white">VIP</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-lg mb-3">{user.handle} • {user.role}</p>
                      
                      <p className="text-gray-700 mb-4 text-lg">{user.tagline}</p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border border-purple-200">
                          <MapPin size={16} />
                          <span className="font-medium">{user.bioBadges[0]}</span>
                        </span>
                        {user.bioBadges.slice(1).map((badge, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 border border-gray-200 font-medium"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail size={16} />
                        <span className="font-medium">{user.contact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Stats + Actions */}
                  <div className="w-full md:w-auto space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                      <div className="bg-white px-6 py-4 text-center">
                        <div className="text-3xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                          {user.stats.posts}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Bài viết</div>
                      </div>
                      <div className="bg-white px-6 py-4 text-center">
                        <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          {user.stats.followers}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Followers</div>
                      </div>
                      <div className="bg-white px-6 py-4 text-center">
                        <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          {user.stats.following}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Following</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setIsEditOpen(true)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold"
                      >
                        <Edit size={18} />
                        <span>Chỉnh sửa</span>
                      </button>
                      <button className="px-4 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-200">
                        <Sparkles size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-sm border border-white/60">
            <div className="flex space-x-2">
              {[
                { id: 'posts', label: 'Bài viết', icon: ImageIcon },
                { id: 'favorites', label: 'Yêu thích', icon: Heart },
                { id: 'saved', label: 'Đã lưu', icon: Bookmark }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/60"
              >
                {/* Post Header */}
                <header className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {(avatarPreview || avatarSrc) ? (
                        <img
                          src={avatarPreview || avatarSrc}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow"
                        />
                      ) : (
                        <div className={`w-12 h-12 bg-gradient-to-br ${user.avatarBg} rounded-full flex items-center justify-center text-white font-semibold shadow`}>
                          {user.name?.[0] || "U"}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{post.timeAgo}</div>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                    <MoreHorizontal size={20} className="text-gray-500" />
                  </button>
                </header>

                {/* Post Content */}
                <div className="px-6 py-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.content}</p>
                </div>

                {/* Post Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* Post Actions */}
                <footer className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors group">
                      <Heart size={20} className="group-hover:fill-current" />
                      <span className="font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <MessageCircle size={20} />
                      <span className="font-medium">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                      <Share size={20} />
                      <span className="font-medium">{post.shares}</span>
                    </button>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Bookmark size={20} />
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Enhanced Edit Profile Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Chỉnh sửa hồ sơ</h2>
                <p className="text-gray-500 mt-1">Cập nhật thông tin cá nhân của bạn</p>
              </div>
              <button
                onClick={() => setIsEditOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : me?.avatarUrl ? (
                      <img src={buildAssetUrl(me.avatarUrl)} alt="Current" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-gray-500">
                        {formData.fullName?.[0] || "U"}
                      </span>
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl cursor-pointer hover:shadow-lg transition-all">
                    <Camera size={18} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Ảnh đại diện</p>
                  <p className="text-gray-500 mt-1">PNG, JPG tối đa 5MB</p>
                  <p className="text-sm text-gray-400 mt-1">Khuyến nghị: 400x400px</p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Nhập họ tên đầy đủ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên người dùng *
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0123 456 789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="TP. Hồ Chí Minh"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giới tính
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-semibold"
                >
                  <Save size={20} />
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;