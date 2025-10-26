import React from "react";
import { useSearchParams } from "react-router-dom";
import AuthLayout from "../AuthLayout";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import RestaurantRegisterPage from "../RestaurantRegisterPage";
import ForgotPasswordPage from "../ForgotPasswordPage";
import VerifyEmailPage from "../VerifyEmailPage/verifyEmailPage";
import PleaseVerifyPage from "../VerifyEmailPage/pleaseVerify";

const RAW_VIEWS = new Set(["verify-email", "please-verify"]); // ❗️restaurant-register KHÔNG còn raw

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "login";

  const page = (() => {
    switch (view) {
      case "register":
        return <RegisterPage />;
      case "restaurant-register":
        return <RestaurantRegisterPage />;
      case "forgotPassword":
        return <ForgotPasswordPage />;
      case "verify-email":
        return <VerifyEmailPage />;
      case "please-verify":
        return <PleaseVerifyPage />;
      default:
        return <LoginPage />;
    }
  })();

  return RAW_VIEWS.has(view) ? page : <AuthLayout>{page}</AuthLayout>;
};

export default AuthPage;
