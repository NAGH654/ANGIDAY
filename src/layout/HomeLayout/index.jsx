import React from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "@components/Header"; // chỉnh alias nếu khác
import ChatWidget from "@components/ChatWidget";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <SiteHeader />

      {/* Main content */}
      <main id="main" className="flex-1">
        <Outlet />
      </main>

      {/* Chat Widget - appears on all pages */}
      <ChatWidget />
    </div>
  );
};

export default AppLayout;
