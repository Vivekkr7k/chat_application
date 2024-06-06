import React from 'react';
// import { Pie } from 'react-chartjs-2';
import Table from './Table';
import GoogleMapComponent from './GoogleMap';

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
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="text-3xl font-bold mb-6 text-gray-800">Attic's Chat-up Dashboard</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="text-xl font-bold text-gray-700">No of Registered Employees</div>
          <div className="text-2xl text-gray-800">842</div>
          {/* <div className="text-green-500">+6%</div> */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="text-xl font-bold text-gray-700">No of Registered Branch Managers</div>
          <div className="text-2xl text-gray-800">352</div>
          {/* <div className="text-green-500">+2%</div> */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="text-xl font-bold text-gray-700">No of Branches</div>
          <div className="text-2xl text-gray-800">12</div>
          {/* <div className="text-green-500">+5%</div> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          {/* <div className="text-xl font-bold text-gray-700">Sessions Device</div> */}
          {/* <Pie data={data} /> */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          {/* <div className="text-xl font-bold text-gray-700">Browser Usage</div> */}
          {/* Add a table or graph here */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Table />
        <GoogleMapComponent />
      </div>
    </div>
  );
};

export default Dashboard;
