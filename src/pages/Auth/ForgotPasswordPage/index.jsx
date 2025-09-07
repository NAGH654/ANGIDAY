import React from "react";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { endPoint } from "@routes/router";

// Input Field
const InputField = ({ type, placeholder, icon: Icon }) => (
  <div className="mb-4 relative">
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-10 py-3 text-sm text-gray-700 border border-gray-300 rounded-lg 
                 hover:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-500 
                 transition duration-300"
    />
    {Icon && (
      <Icon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
    )}
  </div>
);

// Auth Button
const AuthButton = ({ children }) => (
  <button
    type="submit"
    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:brightness-90 text-white font-semibold py-3 rounded-lg 
               flex items-center justify-center shadow-md hover:shadow-xl hover:scale-[1.02] 
               active:scale-[0.98] transition-all duration-300"
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
        <InputField type="email" placeholder="Email Address" icon={Mail} />
        <AuthButton>
          Send Reset Link <ArrowRight className="ml-2" size={16} />
        </AuthButton>
      </form>

      <div className="flex justify-center">
        <Link
          to={endPoint.LOGIN}
          className="mt-6 inline-flex items-center justify-center text-sm font-medium text-gray-500 
               hover:text-orange-600 transition-all duration-300 group"
        >
          <ArrowLeft
            size={16}
            className="mr-2 transform transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span className="transition-all duration-300 group-hover:underline group-hover:-translate-x-1">
            Back to Sign In
          </span>
        </Link>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
