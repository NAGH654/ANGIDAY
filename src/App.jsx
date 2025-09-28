import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { endPoint } from "@routes/router";

// Auth wrapper
import AuthPage from "@pages/Auth/AuthPage";

// Home Layout
import HomeLayout from "@layout/HomeLayout";

// Public pages
import HomePage from "@pages/HomePage/mainLayout";
import CommunityPage from "@pages/CommunityPage/communityPage";
import RestaurantBookMarkPage from "@pages/BookMarkPage/RestaurantBookMarkPage/RestaurantPage";
import PostBookMarkPage from "@pages/BookMarkPage/PostBookMarkPage/PostBookMarkPage";
import PackagePage from "@pages/PackagePage";
import PostPage from "@pages/PostPage";

function App() {
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
        </Route>

        {/* Package Page */}
        <Route path={endPoint.PACKAGE} element={<PackagePage />} />

        {/* Auth (login/register/forgot) */}
        <Route path={endPoint.AUTH} element={<AuthPage />} />

        {/* 404 fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
