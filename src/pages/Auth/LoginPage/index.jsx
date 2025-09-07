import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { endPoint } from "@routes/router";

// Input Field
const InputField = ({ type, placeholder, icon: Icon }) => {
  const [show, setShow] = useState(false);
  const inputType = type === "password" && show ? "text" : type;

  return (
    <div className="mb-4 relative">
      <input
        type={inputType}
        placeholder={placeholder}
        className="w-full px-10 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-1 focus:ring-orange-500 
                   hover:border-orange-400 hover:shadow-md hover:shadow-orange-100
                   transition-all duration-300"
      />
      {Icon && (
        <Icon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
      )}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};

// Auth Button
const AuthButton = ({ children }) => (
  <button
    type="submit"
    className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-3 rounded-lg 
               flex items-center justify-center shadow-lg hover:brightness-90 
               hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] 
               transition-all duration-300 ease-out"
  >
    {children}
  </button>
);

// Social Button
const SocialButton = ({ icon: Icon, children, className = "" }) => (
  <button
    className={`w-1/2 flex items-center justify-center py-2.5 border border-gray-300 rounded-lg 
                text-sm font-semibold text-gray-700 bg-white
                hover:bg-gray-100 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] 
                transition-all duration-300 ${className}`}
  >
    {Icon && <Icon className="mr-2" size={18} />}
    {children}
  </button>
);

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted!");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputField type="email" placeholder="Email Address" icon={Mail} />
        <InputField type="password" placeholder="Password" icon={Lock} />

        <div className="flex items-center justify-between mb-6 text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="ml-2 text-gray-600">Remember me</span>
          </label>
          <Link
            to={endPoint.FORGOTPASSWORD}
            className="text-orange-600 font-medium hover:brightness-75 hover:underline transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <AuthButton>Sign In →</AuthButton>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500">Or continue with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Social login */}
      <div className="flex gap-4">
        <SocialButton icon={FcGoogle}>Google</SocialButton>
        <SocialButton
          icon={() => <FaFacebook className="w-5 h-5 mr-2 text-blue-600" />}
          className="text-blue-600 hover:bg-blue-50"
        >
          Facebook
        </SocialButton>
      </div>
    </>
  );
};

export default LoginPage;
