import React from "react";
import { useSearchParams } from "react-router-dom";

// Layout
import AuthLayout from "../AuthLayout";

// Pages
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import ForgotPasswordPage from "../ForgotPasswordPage";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "login";

  const renderPage = () => {
    switch (view) {
      case "register":
        return <RegisterPage />;
      case "forgotPassword":
        return <ForgotPasswordPage />;
      default:
        return <LoginPage />;
    }
  };

  return <AuthLayout>{renderPage()}</AuthLayout>;
};

export default AuthPage;
