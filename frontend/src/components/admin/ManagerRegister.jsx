import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ManagerRegisterModal from './ManagerRegisterModal';

const ManagerRegister = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* <Sidebar /> */}
      <div className="container mx-auto mt-10 flex flex-col items-center">
        <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Register Manager
        </button>
      </div>
      <ManagerRegisterModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ManagerRegister;
