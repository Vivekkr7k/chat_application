import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Message = ({ selectedGroupName, selectedGrade }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [notification, setNotification] = useState(null);
  const messagesEndRef = useRef(null);
  const adminId = localStorage.getItem("AdminId");
console.log(selectedGroupName, selectedGrade);
  useEffect(() => {
    fetchMessages();
  }, [selectedGroupName, selectedGrade]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    if (selectedGroupName && selectedGrade) {
      try {
        const response = await axios.get("http://localhost:5001/api/messages", {
          params: {
            group: selectedGroupName,
            grade: selectedGrade,
          },
        });

        const data = response.data;
        if (data && data.messages) {
          setMessages(data.messages);
        } else {
          setMessages([]);
        }
        setShowPrompt(false); // Hide the prompt when a group is selected
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    } else {
      setShowPrompt(true); // Show the prompt when no group is selected
    }
  };

  const sendMessage = async () => {
    if (message.trim() === "") return; // Don't send empty messages

    try {
      const newMessage = {
        employeeId: adminId,
        message: message,
        group: selectedGroupName,
        grade: selectedGrade,
      };

      const response = await axios.post(
        "http://localhost:5001/api/messages",
        newMessage
      );

      if (response.status === 201) {
        // Update messages state with the new message
        setMessages([...messages, newMessage]);

        // Clear the input field after sending the message
        setMessage("");
      } else {
        console.error("Error sending message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const checkForNewMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/messages", {
        params: {
          group: selectedGroupName,
          grade: selectedGrade,
        },
      });

      const data = response.data;
      if (data && data.messages && data.messages.length > messages.length) {
        const newMessages = data.messages.slice(messages.length);
        const foreignMessage = newMessages.find(
          (msg) => msg.employeeId !== adminId
        );

        if (foreignMessage) {
          setNotification({
            employeeId: foreignMessage.employeeId,
            message: foreignMessage.message,
          });
        }
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Error checking for new messages:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkForNewMessages, 1000); // Check for new messages every 5 seconds
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="flex flex-row h-screen w-[70vw]">
      <div className="flex-1 flex flex-col w-full">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {showPrompt && (
            <div className="bg-yellow-200 p-4 mb-4 text-yellow-800 rounded">
              Please select a group and grade to message.
            </div>
          )}

          {selectedGroupName && selectedGrade && (
            <div className="flex flex-col flex-1">
              <div className="bg-black text-white p-4 flex gap-2">
                <h1>{selectedGroupName}</h1>
                <p>(Grade: {selectedGrade})</p>
              </div>

              <div
                className="flex flex-col flex-1 px-4 pt-4 overflow-y-auto"
                style={{ maxHeight: "80vh" }}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.employeeId === adminId ? "justify-end" : "justify-start"
                    } mb-2`}
                  >
                    <div
                      className={`bg-${
                        msg.employeeId === adminId ? "white" : "green"
                      }-500 text-white py-2 px-4 rounded-lg max-w-md`}
                    >
                      <p className="text-sm text-red-500 font-bold">
                        {msg.employeeId}
                        <span> : </span>
                      </p>
                      <p className="text-sm text-black">{msg.message}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </div>

        <div className="mx-auto flex items-center p-4 sticky bottom-0 z-10 bg-white w-full">
          <input
            type="text"
            className="flex-1 py-2 px-4 rounded-l-lg border-t border-b border-l text-gray-800 border-gray-200 bg-white w-full focus:outline-none"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>

      {notification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-[80vw] md:w-[50vw]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setNotification(null)}
            >
              &times;
            </button>
            <p className="font-bold">{notification.employeeId}:</p>
            <p>{notification.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
