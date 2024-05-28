import { CgProfile } from "react-icons/cg";
import { BsChatSquareDots } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import logo from "../../assests/logo.png";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const navigate = useNavigate();
 
  const handleEmployeeResiter=()=>{
    navigate("/register")
  }
  const handleGroup=()=>{
    navigate("/Groups")
  }

  const handleLogout=()=>{
    navigate("/")
    localStorage.clear();
  }





  return (
    <div className='flex flex-col h-screen w-[100px] left-0 bg-white border-r shadow-md justify-between items-center py-[20px] text-gray-500 text-3xl'>
      <img className="p-2" src={logo} alt="Logo" />
      <div className="flex flex-col gap-[40px] relative">
        <div className="group relative flex items-center">
          <CgProfile />
          <span className="absolute left-full ml-2 whitespace-nowrap bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Profile
          </span>
        </div>
        <div onClick={handleGroup} className="group relative flex items-center">
          <BsChatSquareDots />
          <span className="absolute left-full ml-2 whitespace-nowrap bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Chat
          </span>
        </div>
        <div onClick={handleEmployeeResiter} className="group relative flex items-center">
          <MdGroups />
          <span className="absolute left-full ml-2 whitespace-nowrap bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Regitser Employee
          </span>
        </div>
        <div className="group relative flex items-center">
          <RiContactsLine />
          <span className="absolute left-full ml-2 whitespace-nowrap bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Contacts
          </span>
        </div>
      </div>
      <div onClick={handleLogout}>
        <BiLogOut />
      </div>
    </div>
  );
};

export default Sidebar;
