// pages/RegisterClassroom.js
import React from 'react';
import Sidebar from '../components/Sidebar.js'; 
const RegisterClassroom = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800">
        <Sidebar />
      </div>
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Register className</h1>
        {/* Your form or content here */}
      </div>
    </div>
  );
};

export default RegisterClassroom;
