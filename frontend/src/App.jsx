import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRequired from "./components/authentication/AuthRequired";
import Dashboard from "./components/admin/Dashboard";
import Login from "./components/employee/Login";
import ChatPage from "./components/employee/ChatPage";
import AdminRoutes from "./components/admin/AdminRoutes";
import AdminLogin from "./components/admin/AdminLogin";
import { Register } from "./components/admin/Register";
import FirstPage from "./components/FirstPage";
import Groups from "./components/admin/Pages/Groups";
import LiveChatMessages from "./components/admin/Pages/LiveChatMessages";
import Message from "./components/admin/Message";
import SuperAdminLogin from './components/SuperAdmin/SuperAdminLogin'
import SuperAdminDashboard from './components/SuperAdmin/SuperAdminDashboard'
import AdminEmpChat from "./components/admin/AdminEmpChat";
import EmpAdminChat from "./components/employee/EmpAdminChat";
import { Empdashbord } from "./components/employee/Empdashbord";
import ManagerLogin from "./components/manager/ManagerLogin";
import ManagerChat from "./components/manager/ManagerChat";
import ManagerRegister from "./components/admin/ManagerRegister";
import BillingTeamManagerLogin from "./components/admin/BillingTeamManagerLogin";
import BillingTeamChat from "./components/BillingTeam/BillingTeamChat";
import BillingRegistrationModal from "./components/admin/BillingRegistrationModal";
import AtticDashboard from "./components/DashboardComponents/AtticDashboard"

// import AdminRegistration from "./components/admin/AdminRegistration";

const App = () => {
  return (
    <BrowserRouter>
          <Routes>
          <Route path="/" element={<FirstPage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/adminlogin" element={<AdminLogin/>} />
            <Route path="/kitkat" element={<SuperAdminLogin/>} />
            <Route path="/superAdminDashboard" element={<SuperAdminDashboard/>} />
            {/* <Route path="/adminRegistration" element={<AdminRegistration/>}/> */}
            <Route element={<AuthRequired/>}>
              <Route path="/chat" element={<ChatPage/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/adminToemp" element={<AdminEmpChat/>} />
            <Route path="/empToadmin" element={<EmpAdminChat/>} />
            <Route path="/empDashbord" element={<Empdashbord/>} />
            <Route path="/managerLogin" element={<ManagerLogin/>} />
            <Route path="/managerChat" element={<ManagerChat/>} />
            <Route path="/billingTeamRegister" element={<BillingRegistrationModal/>} />
            <Route path="/managerRegister" element={<ManagerRegister/>} />
            <Route path="/BillingTeamManagerLogin" element={<BillingTeamManagerLogin/>} />
            <Route path="/BillingTeamChat" element={<BillingTeamChat/>} />
          
  <Route path="/atticDashboard" element={<AtticDashboard/>} />
             
              <Route element={<AdminRoutes/>}>
                <Route path="/admin/dashboard" element={<Dashboard/>} />
                <Route path="/chat" element={<ChatPage/>}/>
                <Route path="/Groups" element={<Groups/>}/>
                <Route path="/livemesages" element={<LiveChatMessages/>}/>
                <Route path="/message/:selectedGroupName/:selectedGrade" element={<Message />} />
              </Route>
            </Route>
          </Routes>
    </BrowserRouter>
  )
} 

export default App 