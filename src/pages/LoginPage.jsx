import React from 'react';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full opacity-5"></div>
      <div className="absolute top-32 right-32 w-24 h-24 bg-pink-500 rounded-full opacity-5"></div>
      <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-pink-500 rounded-full opacity-5"></div>
      <div className="absolute bottom-20 right-1/4 w-36 h-36 bg-pink-500 rounded-full opacity-5"></div>

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
            <span className="text-white text-4xl font-bold">F</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-6">Sign in to continue your culinary journey</p>

        <div className="bg-gray-100 rounded-lg p-1 flex justify-between mb-6">
          <button className="w-1/2 bg-white rounded-md py-2 text-sm font-semibold text-gray-800 shadow">Sign In</button>
          <button className="w-1/2 py-2 text-sm font-semibold text-gray-500">Sign Up</button>
        </div>

        <form>
          <div className="mb-4 relative">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-10 py-3 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {/* Email Icon */}
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657-1.007 3-2.25 3S12 13.657 12 12c0-1.657 1.007-3 2.25-3S16.5 10.343 16.5 12z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <div className="mb-4 relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-10 py-3 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {/* Lock Icon */}
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            {/* Eye Icon */}
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between mb-6 text-sm">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"/>
              <label htmlFor="remember" className="ml-2 text-gray-600">Remember me</label>
            </div>
            <a href="#" className="font-semibold text-pink-500 hover:text-pink-600">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-lg flex items-center justify-center"
          >
            Sign In
            <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">Or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex gap-4">
          <button className="w-1/2 flex items-center justify-center py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700">
            {/* Google Icon */}
            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.657-3.657-11.303-8h-6.571c1.649 6.343 7.895 11 14.874 11z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.245 44 30.028 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            Google
          </button>
          <button className="w-1/2 flex items-center justify-center py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700">
            {/* Facebook Icon */}
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#1877F2" d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.494v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.324V1.324C24 .593 23.407 0 22.676 0z"/>
            </svg>
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
