import React, { useEffect, useState } from 'react';
import { useUserLoginMutation } from '../featurs/userApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const [userLogin, { data, isLoading, isSuccess, isError, error }] =
    useUserLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Trigger the login mutation

      const response = await userLogin({ email, password }).unwrap();
      console.log('Login Successful:', response);
    } catch (err) {
      console.error('Login Failed:', err);
    }
  };
  useEffect(()=>{
   if(isSuccess){
    navigate("/")
   }
  },[isSuccess])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Status Messages */}
        {isSuccess && <p className="text-green-600 mt-4">Login successful!</p>}
        {isError && (
          <p className="text-red-600 mt-4">
            {error?.data?.message || 'An error occurred. Please try again.'}
          </p>
        )}

        {/* Signup Redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
