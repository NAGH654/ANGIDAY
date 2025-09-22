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

function App() {
  return (
    <Router>
      <Routes>
        {/* Default → homePage */}
         <Route path={endPoint.HOMEPAGE} element={<HomePage />} />

        {/* Auth (login/register/forgot) */}
        <Route path={endPoint.AUTH} element={<AuthPage />} />

        {/* 404 fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
