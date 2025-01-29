import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLoadUserQuery, useLogoutMutation } from '../featurs/userApi';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate=useNavigate()
  const [logout , {isSuccess}]=useLogoutMutation()
  const handlerLogout= async ()=>{
        await logout()
  }
  useEffect(()=>{
     if(isSuccess){
      navigate("/login")
     }
  },[isSuccess])
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          ChatApp
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="hover:text-gray-200">
              Home
            </a>
          </li>
          <li>
            <a href="/chats" className="hover:text-gray-200">
              Chats
            </a>
          </li>
          <li>
            <a href="/profile" className="hover:text-gray-200">
              Profile
            </a>
          </li>
        </ul>

        {/* User Profile or Logout Button */}
        {user ? (
          <div className="flex items-center space-x-4">
            {/* Display User Information */}
            <span className="text-sm">
              Welcome, {user.name || 'User'}
            </span>
            <button onClick={handlerLogout} className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm">
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/login"
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
