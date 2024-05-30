import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from './Message';
import { RiDeleteBinLine } from "react-icons/ri";

const GroupsList = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [grade, setGrade] = useState("A");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/groups');
        if (response.ok) {
          const data = await response.json();
          setGroups(data);
        } else {
          console.error('Failed to fetch groups');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleGroupClick = (groupName, groupGrade) => {
    setSelectedGroupName(groupName);
    setSelectedGrade(groupGrade);

    // Check screen size and navigate if small screen
    if (window.innerWidth < 1024) { // Adjust the width as needed for your breakpoint
      navigate(`/message/${encodeURIComponent(groupName)}/${encodeURIComponent(groupGrade)}`);
    }
  };

  const handleAddGroup = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setNewGroupName(e.target.value);
  };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleSubmit = async () => {
    if (newGroupName.trim() !== "") {
      try {
        const response = await fetch('http://localhost:5001/api/groups', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ groupName: newGroupName, grade }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result.message);

          setGroups([...groups, { group: newGroupName, grade }]);
          setShowModal(false);
          setNewGroupName("");
        } else {
          console.error('Failed to create group');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleDeleteGroup = async (groupName, groupGrade) => {
    try {
      const response = await fetch(`http://localhost:5001/api/groups/${groupName}/${groupGrade}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);

        setGroups(groups.filter(group => !(group.group === groupName && group.grade === groupGrade)));
        setSelectedGroupName("");
        setSelectedGrade("");
      } else {
        console.error('Failed to delete group');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex flex-col w-full lg:w-[24vw] bg-[#ffffff] text-[#5443c3] border shadow shadow-blue-500/65">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl lg:text-3xl font-bold">Groups</h1>
          <button 
            className="bg-[#5443c3] hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddGroup}
          >
            +
          </button>
        </div>
        <div className="overflow-y-auto mt-8">
          {groups.map((group, index) => (
            <div 
              key={index} 
              className="p-4 cursor-pointer text-[#5443c3] hover:bg-[#eef2fa] flex justify-between items-center"
              onClick={() => handleGroupClick(group.group, group.grade)}
            >
              <div>
                <h1 className="text-lg font-bold text-[#5443c3]">{group.group}</h1>
                <p className="text-[#8b7ed5]">Grade: {group.grade}</p>
              </div>
              <button 
                className="text-red-400 hover:text-red-600 text-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteGroup(group.group, group.grade);
                }}
              >
                <RiDeleteBinLine />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:flex-1 hidden lg:block">
        {selectedGroupName && selectedGrade && (
          <Message selectedGroupName={selectedGroupName} selectedGrade={selectedGrade} />
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 lg:p-8 rounded-lg w-11/12 lg:w-auto">
            <h2 className="text-2xl font-bold mb-4 text-[#5443c3]">Add Group</h2>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Group Name"
              value={newGroupName}
              onChange={handleInputChange}
            />
            <select
              className="w-full p-2 mb-4 border rounded"
              value={grade}
              onChange={handleGradeChange}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
            <div className="flex justify-end">
              <button 
                className="bg-[#5443c3] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleSubmit}
              >
                Add
              </button>
              <button 
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsList;
