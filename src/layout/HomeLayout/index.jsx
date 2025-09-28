import React from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "@components/Header"; // chỉnh alias nếu khác

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <SiteHeader />

      {/* Main content */}
      <main id="main" className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
