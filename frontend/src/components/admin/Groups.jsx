import React, { useState } from "react";
import { BiSolidMessageAdd } from "react-icons/bi";
import CreateGroup from "./CreateGroup"; // Ensure this path is correct
import { FaSearch } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const teams = [
  { name: "Karnataka Team", message: "Good morning guys...", time: "05 min" },
  { name: "Andhra Pradesh Team", message: "What's the update?", time: "25 min" },
  { name: "Tamil Nadu Team", message: "Is there any problem?", time: "12 min" },
  { name: "Kerala Team", message: "I hope you guys are doing well..", time: "12/05" },
  { name: "Pondicherry Team", message: "Good morning guys...", time: "25/05" },
];

const Groups = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="flex flex-col w-[30vw] bg-indigo-100 h-screen">
      <div className="h-24 flex justify-between px-6 py-8">
        <h1 className="text-3xl text-gray-700 font-semibold">Chats</h1>
        <p
          className="text-3xl font-semibold text-gray-500 cursor-pointer"
          onClick={handleShow}
        >
          <BiSolidMessageAdd />
        </p>
      </div>
      <div className="h-16 bg-indigo-200 mx-6 flex items-center rounded-md">
        <p className="text-2xl text-gray-500 mx-6">
          <FaSearch />
        </p>
        <input
          type="text"
          placeholder="Search messages or users"
          className="p-4 text-xl placeholder:text-xl w-80 bg-transparent placeholder:text-gray-600 placeholder:font-medium focus:outline-none"
        />
      </div>
      <div className="h-full overflow-y-auto">
        {teams.map((team, index) => (
          <div
            key={index}
            className="hover:bg-indigo-200 h-24 mt-6 mx-4 px-6 rounded-md cursor-pointer flex items-center gap-4"
          >
            <Stack direction="row" spacing={2}>
              <Avatar>{team.name.charAt(0)}</Avatar>
            </Stack>
            <section className="flex flex-col w-64 p-2">
              <p className="text-xl font-medium font-sans">{team.name}</p>
              <span className="text-lg text-gray-700">{team.message}</span>
            </section>
            <span className="text-gray-500">{team.time}</span>
          </div>
        ))}
      </div>
      <CreateGroup show={show} handleClose={handleClose} />
    </div>
  );
};

export default Groups;
