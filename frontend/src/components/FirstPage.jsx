import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assests/logo-removebg.png";

const FirstPage = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/adminlogin');
  };

  const handleEmployeeLogin = () => {
    navigate('/login');
  };

  return (
    <div className='bg-red-500 h-[100vh] text-white flex items-center justify-center'>
      <div className='text-center text-2xl font-bold'>
        <div>
          <img className='m-10' src={logo} alt="Logo" />
        </div>
        <div>
          <h1 className='mt-8 text-4xl'>Login As</h1>
          <div className='flex items-center justify-center gap-10 mt-16'>
            <button
              className='bg-black px-14 py-4 rounded-2xl hover:bg-gray-800 transition-all ease-in-out duration-200 hover:scale-110 hover:shadow-xl hover:shadow-black'
              onClick={handleAdminLogin}
            >
              Admin
            </button>
            <button
              className='bg-black px-10 py-4 rounded-2xl hover:bg-gray-800 transition-all ease-in-out duration-200 hover:scale-110 hover:shadow-xl hover:shadow-black'
              onClick={handleEmployeeLogin}
            >
              Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
