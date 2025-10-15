// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import UserMenu from "./userMenu";
import * as RouterEP from "@routes/router";
import { useSelector } from "react-redux";

const endPoint = RouterEP.endPoint || RouterEP.default || RouterEP;
const selectAuth = (s) => s.auth;

const Header = () => {
  const { accessToken } = useSelector(selectAuth);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="mx-auto pl-45 pr-20 h-16 flex items-center justify-between">
        <Link to={endPoint?.HOMEPAGE || "/"} className="font-bold text-lg">
          ANGIDAY
        </Link>

        <nav className="flex items-center gap-3">
          {!accessToken ? (
            <>
              <Link
                to={endPoint.LOGIN}
                className="h-9 px-3.5 flex items-center justify-center rounded-lg border border-pink-500 text-pink-600 text-sm font-medium 
                           hover:bg-pink-50 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Đăng nhập
              </Link>
              <Link
                to={endPoint.REGISTER}
                className="h-9 px-4 flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium 
                           shadow hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all"
              >
                Đăng ký
              </Link>
            </>
          ) : (
            <UserMenu placement="down" showNameOnMobile className="ml-2" />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
