import React from 'react';
import { FaHome, FaUser, FaChartBar, FaEnvelope, FaClock, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-blue-800 to-blue-900 text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-6">MENU</div>
      <nav className="flex-1">
        <ul className="space-y-4">
          <li className="flex items-center space-x-2">
            <FaHome />
            <a href="#analytics">Analytics</a>
          </li>
          <li className="flex items-center space-x-2">
            <FaUser />
            <a href="#customers">Customers</a>
          </li>
          <li className="flex items-center space-x-2">
            <FaChartBar />
            <a href="#reports">Reports</a>
          </li>
          <li className="flex items-center space-x-2">
            <FaEnvelope />
            <a href="#inbox">Inbox</a>
          </li>
          <li className="flex items-center space-x-2">
            <FaClock />
            <a href="#time">Time Management</a>
          </li>
          <li className="flex items-center space-x-2">
            <FaCog />
            <a href="#settings">Settings</a>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        <button className="w-full py-2 bg-blue-700 hover:bg-blue-600 rounded-lg">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
