import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { endPoint } from "@routes/router";

// Auth wrapper
import AuthPage from "@pages/Auth/AuthPage";

// Public pages
import HomePage from "@pages/HomePage/mainLayout";
import CommunityPage from "@pages/CommunityPage";
import RestaurantBookMarkPage from "@pages/BookMarkPage/RestaurantBookMarkPage";
import PostBookMarkPage from "@pages/BookMarkPage/PostBookMarkPage";
import PackagePage from "@pages/PackagePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default → homePage */}
        <Route path={endPoint.HOMEPAGE} element={<HomePage />} />
        {/* Community Page */}
        <Route path={endPoint.COMMUNITY} element={<CommunityPage />} />
        <Route
          path={endPoint.RESTAURANT_BOOKMARK}
          element={<RestaurantBookMarkPage />}
        />
        <Route path={endPoint.POST_BOOKMARK} element={<PostBookMarkPage />} />
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
