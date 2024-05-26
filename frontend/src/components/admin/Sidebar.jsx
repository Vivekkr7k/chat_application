import { CgProfile } from "react-icons/cg";
import { BsChatSquareDots } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const navigate=useNavigate();
  
  const handleClick=()=>{
    navigate('/register')
  }

  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/adminlogin')
  }
  return (
    <div className='flex flex-col h-screen w-24 left-0 bg-white border-r shadow-md justify-between items-center py-[20px] text-gray-500 text-3xl'>
      <span>logo</span>
      <div className=" flex flex-col gap-10 text-4xl cursor-pointer">
        <CgProfile/>
        <BsChatSquareDots/>
        <MdGroups/>
        <RiContactsLine/>
        <p onClick={handleClick}><IoMdPersonAdd /></p>
      </div>
      <div
      className="cursor-pointer" 
      onClick={handleLogout}><BiLogOut/></div>
    </div>
  )
}

export default Sidebar