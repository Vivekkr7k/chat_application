import React, { useState, useEffect } from 'react';
import Table from './Table';
import Sidebar from '../admin/Sidebar';
import back19 from '../../assests/back19.png'
import back15 from '../../assests/back15.png'
import back13 from '../../assests/back13.png'
import wave3 from '../../assests/wave3.svg'

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [56, 30, 14],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
    },
  ],
};

const AtticDashboard = () => {
  const [manager, setManager] = useState([]);
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const AllManagers = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/manager/getAllManagers');
        if (response.ok) {
          const data = await response.json();
          setManager(data);
        } else {
          console.error('Failed to fetch AllManagers');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    AllManagers();
  }, []);



  useEffect(() => {
    const AllEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/employeeRegistration');
        if (response.ok) {
          const data = await response.json();
          setEmployee(data);
        } else {
          console.error('Failed to fetch AllEmployees');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    AllEmployees();
  }, []);

  const uniqueBranches= new Set(manager.map(item => item.branch_name))
const totalBranches=uniqueBranches.size

  return (
    <div
      className="lg:flex block bg-cover bg-center min-h-screen relative bg-[#e8effe]"
    >
      <Sidebar />
      <div className="flex-1 p-6 bg-opacity-75 bg-white relative ">
        <div className="lg:text-4xl  md:text-2xl text-2xl font-bold  text-white w-full lg:h-56 h-48 lg:pt-10 pl-5 pt-3 "  style={{ backgroundImage: `url(${wave3})`,   backgroundRepeat: 'no-repeat', backgroundSize: 'cover'  }}>
          Attic's Chat-up Dashboard</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="p-4 rounded-lg shadow-lg" style={{ backgroundImage: `url(${back15})` }}>
            <div className="text-xl font-bold text-white">No of Registered Employees</div>
            <div className="text-2xl text-white">{employee.length}</div>
          </div>
          <div className="p-4 rounded-lg shadow-lg" style={{ backgroundImage: `url(${back19})` }}>
            <div className="text-xl font-bold text-white">No of Registered Branch Managers</div>
            <div className="text-2xl text-white">{manager.length}</div>
          </div>
          <div className="p-4 rounded-lg shadow-lg" style={{ backgroundImage: `url(${back13})` }}>
            <div className="text-xl font-bold text-white">No of Branches</div>
            <div className="text-2xl text-white">{totalBranches}</div>
          </div>
        </div>
        <div className=" w-full">
          <Table />
         
        </div>
      </div>
    
    </div>
  );
};

export default AtticDashboard;
