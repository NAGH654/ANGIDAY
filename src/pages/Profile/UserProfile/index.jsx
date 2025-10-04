import React from "react";
import {
  Search,
  Edit,
  MoreHorizontal,
  MapPin,
  Users,
  Heart,
  Plus,
} from "lucide-react";
import CustomerSideBar from "@layout/SideBar";

function UserProfile() {
  // Mock user
  const user = {
    name: "Alex",
    handle: "@foodlover",
    role: "Food Blogger",
    tagline: "Saigon Explorer",
    avatarBg: "bg-pink-500",
    cover:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=360&fit=crop",
    stats: {
      posts: 127,
      followers: "2.4k",
      following: 892,
    },
    bioBadges: [
      "Khám phá ẩm thực Sài Gòn",
      "TP.HCM",
      "Chia sẻ những món ngon, quán hay",
      "🇻🇳",
    ],
    contact: "contact@foodlover.com",
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Left rail (app’s sidebar) */}
      <CustomerSideBar />

      <main className="lg:ml-20">
        

        {/* Cover + profile header */}
        <section className="max-w-5xl mx-auto px-4 mt-4">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={user.cover}
              alt="cover"
              className="w-full h-40 md:h-52 object-cover"
            />
          </div>

          {/* Profile row */}
          <div className="mt-0 md:mt-2 bg-white rounded-2xl border border-gray-200 p-4 md:p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 md:gap-4 -mt-12 md:-mt-14">
                {/* Avatar with initial */}
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 ${user.avatarBg} rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold ring-4 ring-white shadow`}
                >
                  {user.name?.[0] || "U"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                      {user.name}
                    </h1>
                    <span className="text-sm text-gray-500">{user.handle}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {user.role} · {user.tagline}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span>
                      <strong className="text-gray-900">{user.stats.posts}</strong>{" "}
                      bài viết
                    </span>
                    <span className="text-gray-300">•</span>
                    <span>
                      <strong className="text-gray-900">
                        {user.stats.followers}
                      </strong>{" "}
                      người theo dõi
                    </span>
                    <span className="text-gray-300">•</span>
                    <span>
                      <strong className="text-gray-900">
                        {user.stats.following}
                      </strong>{" "}
                      đang theo dõi
                    </span>
                  </div>

                  {/* Badges row */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs border border-amber-100">
                      <MapPin size={14} />
                      TP.HCM
                    </span>
                    {user.bioBadges.map((b, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs border border-gray-200"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-gray-600 mt-2">
                    Hợp tác: <span className="font-medium">{user.contact}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
                  <Edit size={16} />
                  <span className="text-sm font-medium">
                    Chỉnh sửa trang cá nhân
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feed */}
        <section className="max-w-5xl mx-auto px-4 mt-4 mb-10">
          {/* Post card */}
          <article className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <header className="px-4 md:px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 ${user.avatarBg} rounded-full flex items-center justify-center text-white font-semibold`}
                >
                  {user.name?.[0] || "U"}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">5 phút trước</div>
                </div>
              </div>
              <button className="w-9 h-9 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                <MoreHorizontal size={18} className="text-gray-500" />
              </button>
            </header>

            <div className="px-4 md:px-5 pb-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                Top 5 món ăn ngon ở Quận 1
              </h3>
              <ol className="list-decimal pl-5 text-gray-800 space-y-1">
                <li>Bún Bò Huế Đông Ba</li>
                <li>Cơm Tấm Ba Ghiền</li>
                <li>Phở Lệ</li>
                <li>Pizza 4P's Saigon</li>
                <li>Bún Thịt Nướng Chị Thông</li>
              </ol>
            </div>

            <div className="w-full h-56 md:h-72 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&h=600&fit=crop"
                alt="post"
                className="w-full h-full object-cover"
              />
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default UserProfile;
