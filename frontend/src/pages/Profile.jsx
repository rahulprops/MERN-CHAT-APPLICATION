import React from 'react';

const Profile = () => {
  const user = {
    fullName: "John Doe",
    email: "johndoe@example.com",
    bio: "Passionate about technology and programming.",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Profile
        </h2>
        {/* Profile Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <p className="bg-gray-100 px-4 py-2 rounded-md">{user.fullName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="bg-gray-100 px-4 py-2 rounded-md">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <p className="bg-gray-100 px-4 py-2 rounded-md">{user.bio}</p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
