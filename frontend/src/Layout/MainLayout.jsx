import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
