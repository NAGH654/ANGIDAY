import React, { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


// Input Field
const InputField = ({ type, placeholder, icon: Icon, onChange }) => {
  const [show, setShow] = useState(false);
  const inputType = type === "password" && show ? "text" : type;

  return (
    <div className="mb-4 relative">
      <input
        type={inputType}
        placeholder={placeholder}
        onChange={onChange}   // ⬅️ thêm dòng này
        className="w-full px-10 py-3 text-sm text-gray-700 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-1 focus:ring-pink-500 
                   hover:border-pink-400 hover:shadow-md hover:shadow-pink-100
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
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};


// Auth Button
const AuthButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-lg 
               flex items-center justify-center shadow-lg hover:brightness-90 
               hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] 
               transition-all duration-300 ease-out"
  >
    {children}
  </button>
);

// Social Button
const SocialButton = ({ children, icon: Icon, className }) => (
  <button
    className={`w-1/2 flex items-center justify-center py-2.5 border border-gray-300 rounded-lg 
                text-sm font-semibold text-gray-700 bg-white 
                hover:bg-gray-50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] 
                transition-all duration-300 ${className}`}
  >
    {Icon && <Icon className="w-5 h-5 mr-2" />}
    {children}
  </button>
);

const RegisterPage = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu không khớp');
      return;
    }

    if (!formData.agreedToTerms) {
      alert('Vui lòng đồng ý với điều khoản');
      return;
    }

    // Simulate API call
    console.log("Register form submitted with data:", formData);
    
    // Mock successful registration
    setTimeout(() => {
      // Navigate to onboarding
      onRegisterSuccess?.();
    }, 1000);
  };

  return (
    <>
      <InputField 
        type="text" 
        placeholder="Full Name" 
        icon={User}
        onChange={(e) => handleInputChange('fullName', e.target.value)}
      />
      <InputField 
        type="email" 
        placeholder="Email Address" 
        icon={Mail}
        onChange={(e) => handleInputChange('email', e.target.value)}
      />
      <InputField 
        type="tel" 
        placeholder="Phone Number" 
        icon={Phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
      />
      <InputField 
        type="password" 
        placeholder="Password" 
        icon={Lock}
        onChange={(e) => handleInputChange('password', e.target.value)}
      />
      <InputField 
        type="password" 
        placeholder="Confirm Password" 
        icon={Lock}
        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
      />

      <div className="flex items-center mb-6 text-sm">
        <input
          type="checkbox"
          checked={formData.agreedToTerms}
          onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
          className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
        />
        <span className="ml-2 text-gray-600">
          I agree to the{" "}
          <button className="text-pink-500 font-semibold hover:text-pink-600 hover:underline">
            Terms of Service
          </button>{" "}
          and{" "}
          <button className="text-pink-500 font-semibold hover:text-pink-600 hover:underline">
            Privacy Policy
          </button>
        </span>
      </div>

      <AuthButton onClick={handleSubmit}>
        Create Account
        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </AuthButton>

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

export default RegisterPage;