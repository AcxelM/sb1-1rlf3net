import React, { useState } from 'react';
import { ArrowLeft, LogIn, UserPlus } from 'lucide-react';

const LoginPage = ({ navigateTo }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would handle authentication
    alert(isLogin ? 'Login functionality would be implemented here' : 'Registration functionality would be implemented here');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {isLogin ? 'Login to Your Account' : 'Create an Account'}
        </h2>
        
        <div className="flex border border-gray-200 rounded-lg mb-6">
          <button
            className={`flex-1 py-2 text-center ${isLogin ? 'bg-green-600 text-white' : 'bg-white text-gray-700'} rounded-l-lg transition-colors`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-center ${!isLogin ? 'bg-green-600 text-white' : 'bg-white text-gray-700'} rounded-r-lg transition-colors`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          
          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          
          {isLogin && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg flex items-center justify-center transition-colors"
          >
            {isLogin ? (
              <>
                <LogIn size={18} className="mr-2" />
                Login
              </>
            ) : (
              <>
                <UserPlus size={18} className="mr-2" />
                Register
              </>
            )}
          </button>
        </form>
        
        <div className="mt-6">
          <button
            className="text-gray-600 hover:text-gray-800 font-medium flex items-center transition-colors"
            onClick={() => navigateTo('home')}
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;