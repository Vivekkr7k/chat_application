import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ show, onClose, employee, onUpdate }) => {
  const [formData, setFormData] = useState({ ...employee });

  useEffect(() => {
    setFormData({ ...employee });
  }, [employee]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-[#f7f7ff] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-[#5443c3]">Edit Employee Details</h2>
        <form>
          {/* Form inputs for employee details */}
          <div className="mb-4">
            <label className="block text-[#5443c3] text-sm font-bold mb-2">Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#5443c3] text-sm font-bold mb-2">Employee ID</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#5443c3] text-sm font-bold mb-2">State</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#5443c3] text-sm font-bold mb-2">Language</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              name="language"
              value={formData.language}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#5443c3] text-sm font-bold mb-2">Grade</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#5443c3] text-sm font-bold mb-2">Team Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              name="group"
              value={formData.group}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleUpdate}
              className="mr-2 bg-[#5443c3] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className=" bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/employeeRegistration');
        setEmployees(res.data);
      } catch (error) {
        console.error('Error fetching employees', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = async (employeeId) => {
    try {
      if (window.confirm("Are you sure? The data will be deleted permanently.")) {
        await axios.delete(`http://localhost:5001/api/employeeRegistration/${employeeId}`);
        setEmployees(employees.filter(employee => employee.employeeId !== employeeId));
        toast.success("Employee deleted successfully");
      }
    } catch (error) {
      console.error('Error deleting employee', error);
      toast.error("Error deleting employee");
    }
  };

  const handleUpdate = async (updatedEmployee) => {
    try {
      const res = await axios.put(`http://localhost:5001/api/employeeRegistration/${updatedEmployee.employeeId}`, updatedEmployee);
      setEmployees(employees.map(employee => employee.employeeId === updatedEmployee.employeeId ? res.data.updatedEmployee : employee));
      toast.success("Employee updated successfully");
    } catch (error) {
      console.error('Error updating employee', error);
      toast.error("Error updating employee");
    }
  };

  return (
    <div className="w-full p-6 bg-[#e8effe] text-[#5443c3] rounded-lg shadow-md">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <div className="overflow-x-auto ">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-[#5443c3]">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Employee ID</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">State</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Language</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Grade</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Team Name</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map(employee => (
              <tr key={employee._id}>
                <td className="py-4 px-4 whitespace-nowrap">{employee.name}</td>
                <td className="py-4 px-4 whitespace-nowrap">{employee.employeeId}</td>
                <td className="py-4 px-4 whitespace-nowrap">{employee.state}</td>
                <td className="py-4 px-4 whitespace-nowrap">{employee.language}</td>
                <td className="py-4 px-4 whitespace-nowrap">{employee.grade}</td>
                <td className="py-4 px-4 whitespace-nowrap">{employee.group}</td>
                <td className="py-4 px-4 whitespace-nowrap flex">
                  <button onClick={() => handleEdit(employee)} className="mr-2 bg-[#5443c3] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(employee.employeeId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    <RiDeleteBinLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedEmployee && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          employee={selectedEmployee}
          onUpdate={handleUpdate}
        />  
      )}
    </div>
  );
};

export default EmployeeDetails;
