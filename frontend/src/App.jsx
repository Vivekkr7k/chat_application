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
// import AdminRegistration from "./components/admin/AdminRegistration";

const App = () => {
  return (
    <BrowserRouter>
          <Routes>
          <Route path="/" element={<FirstPage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/adminlogin" element={<AdminLogin/>} />
            {/* <Route path="/adminRegistration" element={<AdminRegistration/>}/> */}
            <Route element={<AuthRequired/>}>
              <Route path="/chat" element={<ChatPage/>} />
            <Route path="/register" element={<Register/>} />
              <Route element={<AdminRoutes/>}>
                <Route path="/admin/dashboard" element={<Dashboard/>} />
                <Route path="/chat" element={<ChatPage/>}/>
                <Route path="/Groups" element={<Groups/>}/>
              </Route>
            </Route>
          </Routes>
    </BrowserRouter>
  )
} 

export default App 