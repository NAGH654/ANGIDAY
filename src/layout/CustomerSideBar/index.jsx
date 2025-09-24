import React from "react";
import { Home, Heart, Users, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { endPoint } from "@routes/router";

function CustomerSideBar() {
  return (
    <aside className="hidden lg:block w-20 bg-white shadow-lg fixed left-0 top-0 h-full z-50">
      <div className="flex flex-col items-center py-4 space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
            <span className="text-white text-4xl font-bold">F</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col space-y-6">
          <NavLink
            to={endPoint.HOMEPAGE}
            className={({ isActive }) =>
              `w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                isActive ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            <Home size={20} />
          </NavLink>
          
          <NavLink
            to={endPoint.COMMUNITY}
            className={({ isActive }) =>
              `w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                isActive ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            <Users size={20} />
          </NavLink>
          <a
            href="#"
            className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors group"
          >
            <Heart
              size={20}
              className="text-gray-600 group-hover:text-pink-500"
            />
          </a>
        </nav>

        {/* Settings */}
        <div className="flex flex-col space-y-6 mt-auto">
          <a
            href="#"
            className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Settings size={20} className="text-gray-600" />
          </a>
        </div>
      </div>
    </aside>
  );
}

export default CustomerSideBar;