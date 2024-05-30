import React, { useState, useEffect, useRef } from 'react';
import { FaDotCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { IoMdDocument } from "react-icons/io";
import UploadModel from './UploadModel';

const ChatPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [grade, setGrade] = useState('');
  const [notifications, setNotifications] = useState([]);
  const messagesEndRef = useRef(null);

  const navigate = useNavigate();
  // console.log(messages)

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
      const response = await fetch(`http://localhost:5001/api/employeeDetails/${employeeId}`);
      if (response.ok) {
        const data = await response.json();
        setEmployeeDetails(data);
        setTeamName(data.group);
        setGrade(data.grade);

        const messagesResponse = await fetch(`http://localhost:5001/api/Emessages?teamName=${data.group}&grade=${data.grade}`);
        if (messagesResponse.ok) {
          const messagesData = await messagesResponse.json();
          if (Array.isArray(messagesData)) {
            setMessages(messagesData);
          } else {
            setMessages([]);
          }
        }
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
            grade: grade
          })
        });

        if (response.ok) {
          const newMessage = {
            employeeId: employeeId,
            message: inputValue,
            time: new Date().toLocaleTimeString(),
            senderType: 'sent'
          };
          setMessages(prevMessages => [...prevMessages, newMessage]);
          setInputValue('');
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
        <div className='h-16 bg-[#ffffff] flex justify-between items-center px-4 border-b-2 border-gray-300'>
          <div className='flex items-center gap-2'>
            <h1 className='text-2xl text-[#5443c3]'>{localStorage.getItem("EmployeeId")}</h1>
            <p><FaDotCircle className='text-green-500 ' /></p>
          </div>
          <div className='flex items-center gap-7 -ml-10 mr-10'>
            <div onClick={handleLogout} className='text-3xl text-[#5443c3]'>
              <BiLogOut />
            </div>
          </div>
        </div>

        <div className='flex-1 bg-[#f6f5fb] border-b-2 border-gray-300 overflow-y-scroll'>
          {Array.isArray(messages) && messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.employeeId === localStorage.getItem("EmployeeId") ? 'justify-end' : 'justify-start'} mt-4 mx-4`}
            >
              <div className={`max-w-xs p-3 rounded-md ${message.employeeId === localStorage.getItem("EmployeeId") ? 'bg-[#5443c3] text-white rounded-tl-3xl rounded-bl-3xl  rounded-tr-3xl' : 'bg-white text-[#5443c3] rounded-tl-3xl rounded-br-3xl rounded-tr-3xl'}`}>

                <div className='flex gap-2 text-xs mt-2'>
                  <p>{message.time}</p>
                  
                </div>
                <div className='flex gap-2 text-xs my-2'>
                  {
                    message.employeeId.endsWith("@gmail.com")
                      ? (<p>AdminID: {message.employeeId}</p>)
                      : (<p>EmployeeID: {message.employeeId}</p>)
                  }
                </div>
                
                {message.Document && (
                  <div className='text-8xl my-2'>
                    <a href={message.Document} download target="_blank" rel="noopener noreferrer">
                      <IoMdDocument />
                    </a>
                  </div>
                )}
                {message.video && (
                  <div className='text-8xl my-2'>
                    <video src={message.video} controls></video>
                  </div>
                )}
                <div>
                  <img src={message.Image} alt="" className='rounded-lg' />
                </div>
                <p className='mt-2'>{message.message}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className=' bg-[#f6f5fb] h-24 flex items-center  rounded-l-lg border-t border-b border-l text-gray-800   w-full focus:outline-none '>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Type your Message'
            className='w-full h-10 ml-6 border-gray-200 bg-white rounded-md cursor-text pl-4 placeholder-[#5443c3] focus:outline-none '
          />
          <div className='flex justify-center items-center gap-4 ml-4'>
            <button onClick={handleSendClick} className='text-2xl bg-[#5443c3] p-3 text-white rounded-md mr-4'>
              <IoMdSend />
            </button>
          </div>
          <UploadModel selectedGroupName={teamName} selectedGrade={grade} />
        </div>
      </div>

      {notifications.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`fixed p-12 px-16 text-2xl rounded-lg shadow-lg z-50 transition-transform transform ${index % 2 === 0 ? 'left-1/4' : 'right-1/4'} bg-green-500 text-white`}
          style={{ top: `${index * 120 + 60}px`, width: '300px' }}
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
