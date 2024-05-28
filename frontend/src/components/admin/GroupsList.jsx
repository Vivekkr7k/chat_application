import React, { useState, useEffect } from 'react';
import Message from './Message';

const GroupsList = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(""); // New state for selected grade
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [grade, setGrade] = useState("A"); // New state for selected grade

  // Fetch groups from the backend
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

     // Console log the selected group and grade
    //  console.log(`Selected Group: ${groupName}, Grade: ${groupGrade}`);
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
          body: JSON.stringify({ groupName: newGroupName, grade }), // Include grade in the request body
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result.message);

          // Add the new group to the groups list
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

        // Remove the deleted group from the groups list
        setGroups(groups.filter(group => !(group.group === groupName && group.grade === groupGrade)));
        setSelectedGroupName(""); // Clear selected group name
        setSelectedGrade(""); // Clear selected grade
      } else {
        console.error('Failed to delete group');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col w-[24vw] bg-gray-800 text-white">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">Groups</h1>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddGroup}
          >
            +
          </button>
        </div>
        <div className="overflow-y-auto">
          {groups.map((group, index) => (
            <div 
              key={index} 
              className="p-4 cursor-pointer hover:bg-gray-700 flex justify-between items-center"
              onClick={() => handleGroupClick(group.group, group.grade)}
            >
              <div>
                <h1 className="text-lg font-bold text-blue-500">{group.group}</h1>
                <p className="text-gray-400">Grade: {group.grade}</p>
              </div>
              <button 
                className="text-red-400 hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click on group from triggering handleGroupClick
                  handleDeleteGroup(group.group, group.grade);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedGroupName && selectedGrade && (
        <Message selectedGroupName={selectedGroupName} selectedGrade={selectedGrade} />
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add Group</h2>
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
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
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
      )}
    </div>
  );
};

export default GroupsList;
