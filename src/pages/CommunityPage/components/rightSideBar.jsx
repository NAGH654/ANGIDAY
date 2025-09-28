import React from "react";
import { Award, TrendingUp, Zap } from "lucide-react";

const RightSidebar = ({ topUsers = [] }) => {
  return (
    <aside className="w-[360px] hidden xl:block space-y-7">
      {/* Leaderboard */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow border border-white/60 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Bảng xếp hạng</h3>
              <p className="text-white/85 text-xs">Nhiều đánh giá nhất</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Award size={20} />
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-3.5">
            {topUsers.map((u, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-3.5 rounded-xl transition ${
                  i === 0
                    ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-11 h-11 rounded-full object-cover border border-white shadow"
                    />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs shadow">
                      {u.badge}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {u.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500">{u.points} ⭐</span>
                      <span className="text-green-600 font-semibold">
                        {u.trend}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-500">#{i + 1}</div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow transition">
            Xem thêm
          </button>
        </div>
      </div>

      {/* Trending */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow border border-white/60 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900">Xu hướng</h3>
          <TrendingUp size={18} className="text-pink-500" />
        </div>
        <div className="space-y-3">
          {[
            { tag: "#QuanAn", posts: "1.2k bài viết", trend: "+15%" },
            { tag: "#BanhMi", posts: "856 bài viết", trend: "+8%" },
            { tag: "#Pho", posts: "643 bài viết", trend: "+12%" },
            { tag: "#CongThuc", posts: "534 bài viết", trend: "+5%" },
            { tag: "#Review", posts: "423 bài viết", trend: "+18%" },
          ].map((it, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              <div>
                <p className="font-semibold text-gray-900 text-sm">{it.tag}</p>
                <p className="text-xs text-gray-500">{it.posts}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-green-600 text-xs font-semibold">
                  {it.trend}
                </span>
                <Zap size={14} className="text-green-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow border border-white/60 p-5">
        <h3 className="text-base font-bold text-gray-900 mb-4">
          Thống kê cộng đồng
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-pink-600 mb-1">12.5k</div>
            <div className="text-xs text-gray-600">Thành viên</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600 mb-1">8.9k</div>
            <div className="text-xs text-gray-600">Bài viết</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600 mb-1">45.2k</div>
            <div className="text-xs text-gray-600">Đánh giá</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
            <div className="text-2xl font-bold text-orange-600 mb-1">2.1k</div>
            <div className="text-xs text-gray-600">Nhà hàng</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default React.memo(RightSidebar);
