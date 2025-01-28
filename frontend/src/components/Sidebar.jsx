import React from 'react';
import { Link } from 'react-router-dom';
import { useGetUserSidebarQuery } from '../featurs/messageApi';

const Sidebar = () => {
  const { data, isLoading, isError } = useGetUserSidebarQuery();

  if (isLoading) {
    return (
      <div className="w-64 bg-gray-800 text-white h-screen p-4 flex items-center justify-center">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-64 bg-gray-800 text-white h-screen p-4 flex items-center justify-center">
        <span className="text-red-500">Failed to load users.</span>
      </div>
    );
  }

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-lg font-bold mb-4">Chat Users</h2>
      <ul className="space-y-2">
        {data?.map((user) => (
          <li
            key={user._id}
            className="flex items-center justify-between bg-gray-700 p-3 rounded-md hover:bg-gray-600"
          >
            <Link to={`/chat/${user._id}`} className="flex justify-between w-full">
              <span>{user.fullName}</span>
              <span
                className={`w-3 h-3 rounded-full ${
                  user.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                }`}
                title={user.status}
              ></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
