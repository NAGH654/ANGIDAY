import React, { useState, useRef } from "react";
import {
  ArrowLeft,
  Upload,
  Plus,
  X,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomerSideBar from "@layout/SideBar";

function EditRestaurantProfilePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cover:
      "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=1200&h=400&fit=crop",
    logo:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&h=80&fit=crop",
    name: "Pizza 4P's",
    category: "Pizza",
    description:
      "🍕 Pizza Ý authentic với nguyên liệu tươi ngon nhập khẩu trực tiếp từ Italy | 🧀 Phô mai mozzarella tự làm hằng ngày | 🌿 Không gian hiện đại, phục vụ tận tâm | 📍 Nhiều chi nhánh tại TP.HCM & Hà Nội",
    address: "Quận 1, TP. Hồ Chí Minh",
    phone: "0901 345 678",
    website: "pizza4ps.com",
    email: "contact@pizza4ps.com",
    openTime: "10:00 - 23:00 (Hằng ngày)",
    socials: [
      { platform: "Facebook", url: "facebook.com/pizza4ps" },
      { platform: "Instagram", url: "instagram.com/pizza4ps" },
    ],
    amenities: [
      "WIFI miễn phí",
      "Bãi đậu xe",
      "Delivery",
      "Điều hoà",
      "Phục vụ tại bàn",
      "Takeaway",
    ],
  });

  const coverInputRef = useRef(null);
  const logoInputRef = useRef(null);

  const handleChange = (key, value) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSocialChange = (idx, key, value) =>
    setForm((f) => {
      const socials = [...f.socials];
      socials[idx] = { ...socials[idx], [key]: value };
      return { ...f, socials };
    });

  const addSocial = () =>
    setForm((f) => ({
      ...f,
      socials: [...f.socials, { platform: "", url: "" }],
    }));

  const removeSocial = (idx) =>
    setForm((f) => ({
      ...f,
      socials: f.socials.filter((_, i) => i !== idx),
    }));

  const addAmenity = () =>
    setForm((f) => ({ ...f, amenities: [...f.amenities, ""] }));

  const changeAmenity = (idx, value) =>
    setForm((f) => {
      const amenities = [...f.amenities];
      amenities[idx] = value;
      return { ...f, amenities };
    });

  const removeAmenity = (idx) =>
    setForm((f) => ({
      ...f,
      amenities: f.amenities.filter((_, i) => i !== idx),
    }));

  const onPickCover = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    handleChange("cover", url);
  };

  const onPickLogo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    handleChange("logo", url);
  };

  const onSave = () => {
    // TODO: call API
    alert("Đã lưu thay đổi (demo)");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <CustomerSideBar />

      {/* Top bar */}
      <div className="lg:ml-20 sticky top-0 z-40 bg-gray-50/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft size={18} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Chỉnh sửa thông tin nhà hàng
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Hủy
            </button>
            <button
              onClick={onSave}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-600 text-white text-sm font-semibold hover:bg-pink-700 shadow-sm"
            >
              <Save size={16} />
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="lg:ml-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Cover & Logo */}
          <section className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
              Ảnh bìa và logo
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Ảnh bìa</label>
                <div className="relative">
                  <img
                    src={form.cover}
                    alt="cover"
                    className="w-full h-44 md:h-56 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => coverInputRef.current?.click()}
                    className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 hover:bg-white"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Upload size={16} /> Tải ảnh bìa mới
                    </span>
                  </button>
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onPickCover}
                  />
                </div>
              </div>

              <div className="max-w-sm">
                <label className="block text-sm text-gray-600 mb-2">Logo nhà hàng</label>
                <div className="flex items-center gap-3">
                  <img
                    src={form.logo}
                    alt="logo"
                    className="w-14 h-14 rounded-xl object-cover border border-gray-200"
                  />
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    className="px-3 py-2 bg-white rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Upload size={16} /> Tải lên logo mới
                    </span>
                  </button>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onPickLogo}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Basic Info */}
          <section className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
              Thông tin cơ bản
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Tên nhà hàng <span className="text-pink-600">*</span>
                </label>
                <input
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="VD: Pizza 4P's"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Loại hình <span className="text-pink-600">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option>Pizza</option>
                  <option>Món Việt</option>
                  <option>Món Nhật</option>
                  <option>Món Hàn</option>
                  <option>Món Âu</option>
                  <option>Ăn vặt</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Mô tả nhà hàng
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Mô tả ngắn về nhà hàng..."
                />
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
              Thông tin liên hệ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Địa chỉ</label>
                <input
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Số điện thoại</label>
                <input
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Website</label>
                <input
                  value={form.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Giờ mở cửa</label>
                <input
                  value={form.openTime}
                  onChange={(e) => handleChange("openTime", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          </section>

          {/* Socials */}
          <section className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Mạng xã hội
              </h2>
              <button
                onClick={addSocial}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-gray-200 hover:bg-gray-50"
              >
                <Plus size={16} /> Thêm
              </button>
            </div>

            <div className="space-y-3">
              {form.socials.map((s, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center"
                >
                  <input
                    value={s.platform}
                    onChange={(e) =>
                      handleSocialChange(idx, "platform", e.target.value)
                    }
                    placeholder="Facebook / Instagram / TikTok…"
                    className="md:col-span-2 h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    value={s.url}
                    onChange={(e) =>
                      handleSocialChange(idx, "url", e.target.value)
                    }
                    placeholder="link..."
                    className="md:col-span-3 h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    onClick={() => removeSocial(idx)}
                    className="md:col-start-6 md:justify-self-end w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-pink-600 hover:border-pink-200"
                    title="Xoá"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Amenities */}
          <section className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Tiện ích & Dịch vụ
              </h2>
              <button
                onClick={addAmenity}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-gray-200 hover:bg-gray-50"
              >
                <Plus size={16} /> Thêm
              </button>
            </div>

            <div className="space-y-3">
              {form.amenities.map((a, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-3 items-center">
                  <input
                    value={a}
                    onChange={(e) => changeAmenity(idx, e.target.value)}
                    placeholder="Nhập tiện ích/dịch vụ…"
                    className="col-span-11 h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    onClick={() => removeAmenity(idx)}
                    className="col-span-1 w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-pink-600 hover:border-pink-200"
                    title="Xoá"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default EditRestaurantProfilePage;
