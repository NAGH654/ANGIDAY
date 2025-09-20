import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { endPoint } from "@routes/router";
import OnboardingPage from "../OnboardingPage";

const AuthLayout = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const view = searchParams.get("view") || "login";

  const titles = {
    login: {
      title: "Welcome Back",
      subtitle: "Sign in to continue your culinary journey",
    },
    register: {
      title: "Create Account",
      subtitle: "Join thousands of food lovers today",
    },
    forgotPassword: {
      title: "Forgot Password?",
      subtitle: "No worries! Enter your email address and we'll send you a link to reset your password.",
    },
  };

  const { title, subtitle } = titles[view] || titles.login;

  const handleRegisterSuccess = () => {
    setShowOnboarding(true);
  };

  // Show onboarding if registration was successful
  if (showOnboarding) {
    return <OnboardingPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full opacity-5"></div>
      <div className="absolute top-32 right-32 w-24 h-24 bg-pink-500 rounded-full opacity-5"></div>
      <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-pink-500 rounded-full opacity-5"></div>
      <div className="absolute bottom-20 right-1/4 w-36 h-36 bg-pink-500 rounded-full opacity-5"></div>

      {/* Content box */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
            <span className="text-white text-4xl font-bold">F</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {title}
        </h1>
        <p className={`text-center text-gray-500 mb-6 ${view === 'forgotPassword' ? 'text-sm leading-relaxed mb-8' : ''}`}>
          {subtitle}
        </p>

        {/* Tabs */}
        {(view === "login" || view === "register") && (
          <div className="bg-gray-100 rounded-lg p-1 flex justify-between mb-6">
            <Link
              to={endPoint.LOGIN}
              className={`w-1/2 py-2 text-sm font-semibold rounded-md text-center transition-all duration-300 ${
                view === "login"
                  ? "bg-white text-gray-800 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign In
            </Link>
            <Link
              to={endPoint.REGISTER}
              className={`w-1/2 py-2 text-sm font-semibold rounded-md text-center transition-all duration-300 ${
                view === "register"
                  ? "bg-white text-gray-800 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* Child form - pass onRegisterSuccess for register page */}
        {React.cloneElement(children, view === "register" ? { onRegisterSuccess: handleRegisterSuccess } : {})}
      </div>
    </div>
  );
};

export default AuthLayout;