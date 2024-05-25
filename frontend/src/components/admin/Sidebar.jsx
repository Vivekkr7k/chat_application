import { CgProfile } from "react-icons/cg";
import { BsChatSquareDots } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";


const Sidebar = () => {
  return (
    <div className='flex flex-col h-screen w-[65px] left-0 bg-white border-r shadow-md justify-between items-center py-[20px] text-gray-500 text-3xl'>
      <span>logo</span>
      <div className=" flex flex-col gap-[40px]">
        <CgProfile/>
        <BsChatSquareDots/>
        <MdGroups/>
        <RiContactsLine/>
      </div>
      <div><BiLogOut/></div>
    </div>
  )
}

export default Sidebar