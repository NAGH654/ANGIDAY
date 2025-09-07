import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { endPoint } from "@routes/router";

// Auth wrapper
import AuthPage from "@pages/Auth/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default → login */}
        <Route
          path={endPoint.HOMEPAGE}
          element={<Navigate to={endPoint.LOGIN} replace />}
        />

        {/* Auth (login/register/forgot) */}
        <Route path={endPoint.AUTH} element={<AuthPage />} />

        {/* 404 fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
