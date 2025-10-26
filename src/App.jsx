import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { endPoint } from "@routes/router";
// Auth wrapper
import AuthPage from "@pages/Auth/AuthPage";
// Home Layout
import HomeLayout from "@layout/HomeLayout";
// Service
import AuthTokenWatcher from "@services/authTokenWatcher";
// Public pages
import HomePage from "@pages/HomePage/mainLayout";
import CommunityPage from "@pages/CommunityPage/communityPage";
import RestaurantBookMarkPage from "@pages/BookMarkPage/RestaurantBookMarkPage/RestaurantPage";
import PostBookMarkPage from "@pages/BookMarkPage/PostBookMarkPage/PostBookMarkPage";
import PackagePage from "@pages/PackagePage";
import PostPage from "@pages/PostPage";

import CardDetailPage from "@pages/CardDetailPage";
import MenuPage from "@pages/CardDetailPage/MenuPage";
import ReviewDetailPage from "@pages/CardDetailPage/ReviewDetailPage";
import RestaurantProfilePage from "@pages/Profile/RestaurantProfile";
import EditRestaurantProfilePage from "@pages/Profile/RestaurantProfile/EditRestaurantProfilePage";
import UserProfilePage from "@pages/Profile/UserProfile";

function VerifyEmailAliasRedirect() {
  const { search } = useLocation(); // ví dụ "?token=abcd"
  const p = new URLSearchParams(search);
  const token = p.get("token") || "";
  return <Navigate to={endPoint.VERIFY_EMAIL(token)} replace />;
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Default → HomeLayout (home, community, post,...) */}
        <Route element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path={endPoint.COMMUNITY} element={<CommunityPage />} />
          <Route path={endPoint.POST} element={<PostPage />} />
          <Route
            path={endPoint.RESTAURANT_BOOKMARK}
            element={<RestaurantBookMarkPage />}
          />
          <Route path={endPoint.POST_BOOKMARK} element={<PostBookMarkPage />} />

          {/* User Profile */}
          <Route
            path={`${endPoint.USER_BASE}/${endPoint.PROFILE}`}
            element={<UserProfilePage />}
          />

          {/* Restaurant Profile */}
          <Route
            path="/restaurant/profile"
            element={<RestaurantProfilePage />}
          />

          {/* Chi tiết */}
          <Route
            path={endPoint.RESTAURANT_DETAIL()}
            element={<CardDetailPage />}
          />
          <Route path={endPoint.RESTAURANT_MENU()} element={<MenuPage />} />
          <Route
            path={endPoint.RESTAURANT_REVIEWS()}
            element={<ReviewDetailPage />}
          />
          <Route
            path={endPoint.RESTAURANT_EDIT()}
            element={<EditRestaurantProfilePage />}
          />

          {/* Package Page */}
          <Route path={endPoint.PACKAGE} element={<PackagePage />} />
        </Route>

        {/* Auth (login/register/forgot) */}
        <Route path={endPoint.AUTH} element={<AuthPage />} />
        <Route path="/verify-email" element={<VerifyEmailAliasRedirect />} />

        {/* 404 fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <>
      {/* Theo dõi & tự logout nếu token mất/hết hạn */}
      <AuthTokenWatcher redirect="/" pollMs={100} />
      {/* <CurrentUserHydrator /> */}
      <AppRoutes />
    </>
  );
}

export default App;
