import React, { useState, useEffect, useRef } from 'react';
import { FaDotCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [grade, setGrade] = useState('');
  const [notifications, setNotifications] = useState([]);
  const messagesEndRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(checkForNewMessages, 1000);
    return () => clearInterval(interval);
  }, [messages]);

  const fetchEmployeeDetails = async () => {
    try {
      const employeeId = localStorage.getItem("EmployeeId");
      console.log("Fetching employee details for ID:", employeeId);
      const response = await fetch(`http://localhost:5001/api/employeeDetails/${employeeId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setEmployeeDetails(data);
        setTeamName(data.group);
        setGrade(data.grade);
        console.log("Employee Details:", data);

        // Fetch messages based on teamName and grade
        const messagesResponse = await fetch(`http://localhost:5001/api/Emessages?teamName=${data.group}&grade=${data.grade}`);
        if (messagesResponse.ok) {
          const messagesData = await messagesResponse.json();
          console.log("Messages Data:", messagesData);
          if (Array.isArray(messagesData)) {
            setMessages(messagesData); // Set messages state with fetched messages
          } else {
            console.error('Invalid messages data format:', messagesData);
            setMessages([]); // Set empty array if data format is invalid
          }
        } else {
          console.error('Failed to fetch messages');
        }
      } else {
        console.error('Failed to fetch employee details');
      }
    } catch (error) {
      console.error('Error fetching employee details:', error.message);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = async () => {
    if (inputValue.trim() !== '') {
      try {
        const employeeId = localStorage.getItem("EmployeeId");
        const response = await fetch('http://localhost:5001/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            employeeId: employeeId,
            message: inputValue,
            group: teamName,
            grade: grade // Send the team name as well
          })
        });

        if (response.ok) {
          const newMessage = {
            employeeId: employeeId,
            message: inputValue,
            time: new Date().toLocaleTimeString(), // Add time property
            senderType: 'sent' // Indicate this is a sent message
          };
          setMessages(prevMessages => [...prevMessages, newMessage]); // Update messages state to include the new message
          setInputValue(''); // Clear the input field
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };

  const checkForNewMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/Emessages?teamName=${teamName}&grade=${grade}`);
      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data) && data.length > messages.length) {
          const newMessages = data.slice(messages.length);
          const foreignMessages = newMessages.filter(msg => msg.employeeId !== localStorage.getItem("EmployeeId"));
          if (foreignMessages.length > 0) {
            setNotifications(prevNotifications => {
              const updatedNotifications = [...prevNotifications, ...foreignMessages.map(msg => ({
                employeeId: msg.employeeId,
                message: msg.message,
                time: msg.time
              }))];
              // Limit to the last 5 notifications
              return updatedNotifications.slice(-5);
            });
          }
          setMessages(data);
        }
      }
    } catch (error) {
      console.error('Error checking for new messages:', error);
    }
  };

  return (
    <div className="relative h-screen">
      <div className={`flex flex-col h-full ${notifications.length > 0 ? 'blur-sm' : ''}`}>
        <div className='h-16 bg-slate-100 flex justify-between items-center px-4 border-b-2 border-gray-300'>
          <div className='flex items-center gap-2'>
            <h1 className='text-xl'>{localStorage.getItem("EmployeeId")}</h1>
            <p><FaDotCircle className='text-green-500 ' /></p>
          </div>
          <div className='flex items-center gap-7 -ml-10 mr-10'>
            <div onClick={handleLogout} className='text-3xl'>
              <BiLogOut />
            </div>
          </div>
        </div>

        <div className='flex-1 bg-slate-100 border-b-2 border-gray-300 overflow-y-scroll'>
          {Array.isArray(messages) && messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.employeeId === localStorage.getItem("EmployeeId") ? 'justify-end' : 'justify-start'} mt-4 mx-4`}
            >
              <div className={`max-w-xs p-3 rounded-md ${message.employeeId === localStorage.getItem("EmployeeId") ? 'bg-gray-200' : 'bg-indigo-500 text-white'}`}>
                <p>{message.message}</p>
                <div className='flex gap-2 text-xs mt-2'>
                  <p>{message.time}</p>
                </div>
                <div className='flex gap-2 text-xs mt-2'>
                  <p>Employee ID: {message.employeeId}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className='bg-slate-100 h-24 flex items-center'>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Type Message'
            className='w-full h-10 ml-6 bg-gray-300 rounded-md cursor-text pl-4 placeholder-black border-none focus:outline-none '
          />
          <div className='flex justify-center items-center gap-4 ml-4'>
            <button onClick={handleSendClick} className='text-2xl bg-indigo-500 p-3 text-white rounded-md mr-4'>
              <IoMdSend />
            </button>
          </div>
        </div>
      </div>

      {notifications.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      {notifications.map((notification, index) => (
        <div 
          key={index} 
          className={`fixed p-12 px-16 text-2xl rounded-lg shadow-lg z-50 transition-transform transform ${index % 2 === 0 ? 'left-1/4' : 'right-1/4'} bg-green-500 text-white`}
          style={{ top: `${index * 120 + 60}px`, width: '300px' }} // Add dynamic spacing between notifications
        >
          <button
            className="absolute top-2 right-2 text-white hover:text-gray-200"
            onClick={() => setNotifications(notifications.filter((_, i) => i !== index))}
          >
            &times;
          </button>
          <p className="font-bold text-lg mb-2">{notification.employeeId}:</p>
          <p className="text-md mb-2">{notification.message}</p>
          <p className="text-xs text-gray-200">{notification.time}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatPage;
