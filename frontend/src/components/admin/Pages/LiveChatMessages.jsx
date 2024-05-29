import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";

const adminId = localStorage.getItem("AdminId");

const LiveChatMessages = () => {
  const [liveChatMessages, setLiveChatMessages] = useState([]);

  useEffect(() => {
    fetchLiveChatMessages();
  }, []);

  const fetchLiveChatMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/messages/last-24-hours"
      );
      setLiveChatMessages(response.data);
    } catch (error) {
      console.error("Error fetching live chat messages:", error);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full">
        <div className="flex flex-col flex-1 bg-gray-100 border-l border-gray-200 overflow-y-auto">
          <h2 className="text-lg font-bold p-4 bg-gray-300">
            Live Chat (Last 24 Hours)
          </h2>
          <div className="flex flex-col flex-1 p-4">
            {liveChatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.employeeId === adminId ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`bg-blue-500 text-white py-2 px-4 rounded-lg max-w-md ${
                    msg.employeeId === adminId ? "self-end" : "self-start"
                  }`}
                >
                  <p className="text-sm font-bold">Group : {msg.group}</p>
                  <p className="text-sm font-bold">Grade : {msg.grade}</p>
                  <p className="text-sm font-bold">
                    {msg.employeeId}
                    <span> : </span>
                  </p>
                  <p className="text-lg">{msg.messages}</p>
                  <p className="text-xs">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChatMessages;
