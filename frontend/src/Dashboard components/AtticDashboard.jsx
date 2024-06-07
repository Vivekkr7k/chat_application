import React, { useState, useEffect } from 'react';
import Table from './Table';
import GoogleMapComponent from './GoogleMap';
import Sidebar from '../components/admin/Sidebar';
import back5 from '../assests/back5.png'
import back19 from '../assests/back19.png'
import back15 from '../assests/back15.png'
import back13 from '../assests/back13.png'
import wave3 from '../assests/wave3.svg'
// import back19 from '../assets/back19.png';
// import back15 from '../assets/back15.png';
// import back13 from '../assets/back13.png';

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

const Dashboard = () => {
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
        const response = await fetch('http://localhost:5001/api/employee/getAllEmployees');
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

  return (
    <div
      className="lg:flex block bg-cover bg-center min-h-screen relative bg-[#e8effe]"
      // style={{ backgroundImage: `url(${back5})` }}
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
            <div className="text-2xl text-white">12</div>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="text-xl font-bold text-gray-700">Sessions Device</div> */}
            {/* <Pie data={data} /> */}
          {/* </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="text-xl font-bold text-gray-700">Browser Usage</div> */}
            {/* Add a table or graph here */}
          {/* </div>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Table />
          <GoogleMapComponent />
        </div>
      </div>
    
    </div>
  );
};

export default Dashboard;
