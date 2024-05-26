import React, { useState } from 'react';
import { FaDotCircle, FaClock } from "react-icons/fa";
import { MdEmojiEmotions, MdOutlineAttachFile } from "react-icons/md";
import { SlOptions, SlOptionsVertical } from "react-icons/sl";
import { IoMdSend } from "react-icons/io";

const Chat = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { text: "Good morning", sender: "Doris Brown", time: "10:00 am", senderType: "received" },
    { text: "Good morning, How are you? What about our next meeting?", sender: "Patricia Smith", time: "10:00 am", senderType: "sent" }
  ]);
  const [showOptions, setShowOptions] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    if (inputValue.trim() !== '') {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages([...messages, { text: inputValue, sender: "You", time: formattedTime, senderType: "sent" }]);
      setInputValue('');
    }
  };

  const handleOptionsClick = (index) => {
    setShowOptions(showOptions === index ? null : index);
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    setShowOptions(null);
  };

  const handleDeleteMessage = (index) => {
    setMessages(messages.filter((_, i) => i !== index));
    setShowOptions(null);
  };

  return (
    <div className='w-4/6 h-screen flex flex-col'>
      <div className='h-24  flex justify-between items-center px-4 border-b-2 border-gray-300'>
        <div className='flex items-center gap-2'>
          <h1 className='text-xl'>Doris Brown</h1>
          <p><FaDotCircle className='text-green-500' /></p>
        </div>
        <div className='flex items-center gap-7 -ml-10 mr-10'>
          <SlOptions className='text-2xl text-gray-500' />
        </div>
      </div>

      <div className='flex-grow  border-b-2 border-gray-300 overflow-hidden'>
        <div className='flex flex-col gap-4 mx-4 my-4'>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.senderType === 'sent' ? 'justify-end' : ''}`}>
              <div className={`max-w-xs p-3 rounded-md ${message.senderType === 'sent' ? 'bg-gray-200' : 'bg-indigo-500 text-white'}`}>
                <p>{message.text}</p>
                <div className='flex gap-2 text-xs mt-2'>
                  <FaClock />
                  <p>{message.time}</p>
                </div>
              </div>
              <div className='relative'>
                <SlOptionsVertical
                  className='text-2xl text-gray-400 ml-2 cursor-pointer'
                  onClick={() => handleOptionsClick(index)}
                />
                {showOptions === index && (
                  <div className='absolute right-0 bg-white shadow-lg rounded-lg py-2 mt-2 w-24'>
                    <p
                      className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                      onClick={() => handleCopyMessage(message.text)}
                    >
                      Copy
                    </p>
                    <p
                      className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                      onClick={() => handleDeleteMessage(index)}
                    >
                      Delete
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=' h-24 flex items-center'>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder='Type Message'
          className='w-[80vw] h-14 ml-6 bg-gray-300 rounded-md cursor-text text-xl pl-4 placeholder-black placeholder:text-xl border-none focus:outline-none'
        />
        <div className='flex justify-center items-center gap-4 ml-4'>
          <MdEmojiEmotions className='text-3xl text-indigo-400' />
          <MdOutlineAttachFile className='text-3xl text-indigo-400' />
          <button onClick={handleSendClick} className='text-2xl bg-indigo-500 p-3 text-white rounded-md'>
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
