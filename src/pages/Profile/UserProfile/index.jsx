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
import { useGetMeQuery } from "@redux/api/userApi";

function UserProfile() {
  const { data: me, isLoading, isError, refetch } = useGetMeQuery();

  // Map API -> UI fields with robust fallbacks
  const user = {
    name: me?.fullName || me?.fullname || me?.username || "Người dùng",
    handle: me?.email ? `@${String(me.email).split("@")[0]}` : "@user",
    role: me?.roleName || me?.role || "customer",
    tagline: me?.address || me?.city || "",
    avatarBg: "bg-pink-500",
    cover:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=360&fit=crop",
    stats: {
      posts: me?.totalPosts ?? 0,
      followers: me?.followers ?? me?.totalFollowers ?? 0,
      following: me?.following ?? me?.totalFollowing ?? 0,
    },
    bioBadges: [
      me?.address || me?.city || "TP.HCM",
      me?.gender || "",
      me?.phoneNumber ? `📞 ${me.phoneNumber}` : "",
    ].filter(Boolean),
    contact: me?.email || "",
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <CustomerSideBar />
        <main className="lg:ml-20">
          <div className="max-w-5xl mx-auto px-4 mt-10">
            <div className="animate-pulse h-40 bg-gray-200 rounded-2xl" />
            <div className="mt-4 h-24 bg-gray-200 rounded-2xl" />
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <CustomerSideBar />
        <main className="lg:ml-20">
          <div className="max-w-5xl mx-auto px-4 mt-10">
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
              Không tải được thông tin hồ sơ. Vui lòng thử lại.
              <button onClick={() => refetch()} className="ml-3 underline">
                Thử lại
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Left rail (app’s sidebar) */}
      <CustomerSideBar />

      <main className="lg:ml-20">
        {/* Cover */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 pt-4">
          <div className="relative h-40 md:h-56 rounded-2xl overflow-hidden shadow">
            <img
              src={user.cover}
              alt="cover"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/20" />
          </div>

          {/* Profile card */}
          <div className="relative -mt-8 md:-mt-10">
            <div className="bg-white/90 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 ${user.avatarBg} shrink-0 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold ring-4 ring-white shadow -mt-8`}
                  >
                    {user.name?.[0] || "U"}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 leading-none">
                        {user.name}
                      </h1>
                      <span className="text-sm text-gray-500">{user.handle}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {user.role}
                      {user.tagline && <span> · {user.tagline}</span>}
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs border border-amber-100">
                        <MapPin size={14} />
                        {user.bioBadges[0] || "TP.HCM"}
                      </span>
                      {user.bioBadges.slice(1).map((b, i) => (
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

                {/* Stats + action */}
                <div className="w-full md:w-auto">
                  <div className="grid grid-cols-3 divide-x divide-gray-100 rounded-xl border border-gray-100 overflow-hidden bg-white">
                    <div className="px-4 py-2 text-center">
                      <div className="text-xl font-bold text-gray-900">
                        {user.stats.posts}
                      </div>
                      <div className="text-xs text-gray-500">bài viết</div>
                    </div>
                    <div className="px-4 py-2 text-center">
                      <div className="text-xl font-bold text-gray-900">
                        {user.stats.followers}
                      </div>
                      <div className="text-xs text-gray-500">người theo dõi</div>
                    </div>
                    <div className="px-4 py-2 text-center">
                      <div className="text-xl font-bold text-gray-900">
                        {user.stats.following}
                      </div>
                      <div className="text-xs text-gray-500">đang theo dõi</div>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition shadow-sm">
                      <Edit size={16} />
                      <span className="text-sm font-medium">Chỉnh sửa trang cá nhân</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feed */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 mt-6 mb-10">
          <article className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/60 shadow overflow-hidden">
            <header className="px-5 py-4 flex items-center justify-between">
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

            <div className="px-5 pb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
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
