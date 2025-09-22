// ForgotPasswordPage.jsx
import React from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { endPoint } from "@routes/router";

// Input Field
const InputField = ({ type, placeholder, icon: Icon, label }) => (
  <div className="mb-6">
    {label && <label className="block text-gray-700 text-sm font-medium mb-3">{label}</label>}
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-12 py-3 text-sm text-gray-700 border border-gray-300 rounded-lg 
                   hover:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-500 
                   transition duration-300"
      />
      {Icon && (
        <Icon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
      )}
    </div>
  </div>
);

// Auth Button
const AuthButton = ({ children }) => (
  <button
    type="submit"
    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-lg 
               flex items-center justify-center shadow-lg hover:brightness-90 
               hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] 
               transition-all duration-300 mb-6"
  >
    {children}
  </button>
);

const ForgotPasswordPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Forgot password form submitted!");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputField 
          type="email" 
          placeholder="Enter your email address" 
          icon={Mail} 
          label="Email Address"
        />
        <AuthButton>
          Send Reset Link
          <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.768 59.768 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </AuthButton>
      </form>

      <div className="flex justify-center mb-8">
        <Link
          to={endPoint.LOGIN}
          className="inline-flex items-center justify-center text-gray-600 hover:text-gray-800 
                     transition-colors duration-200"
        >
          <ArrowLeft
            size={16}
            className="mr-2 transform transition-transform duration-300"
          />
          <span className="transition-all duration-300">
            Back to Sign In
          </span>
        </Link>
      </div>

      <div className="text-center text-sm text-gray-500">
        Remember your password?{' '}
        <Link
          to={endPoint.LOGIN}
          className="text-pink-500 font-semibold hover:text-pink-600 transition-colors duration-200"
        >
          Sign in here
        </Link>
      </div>
    </>
  );
};

export default ForgotPasswordPage;