import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRequired from "./components/authentication/AuthRequired";
import Dashboard from "./components/admin/Dashboard";
import Login from "./components/employee/Login";
import ChatPage from "./components/employee/ChatPage";
import AdminRoutes from "./components/admin/AdminRoutes";
import AdminLogin from "./components/admin/AdminLogin";
// import AdminRegistration from "./components/admin/AdminRegistration";

const App = () => {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/adminlogin" element={<AdminLogin/>} />
            {/* <Route path="/adminRegistration" element={<AdminRegistration/>}/> */}
            <Route element={<AuthRequired/>}>
              <Route path="/chat" element={<ChatPage/>} />
              <Route element={<AdminRoutes/>}>
                <Route path="/admin/dashboard" element={<Dashboard/>} />
                <Route path="/chat" element={<ChatPage/>}/>
              </Route>
            </Route>
          </Routes>
    </BrowserRouter>
  )
} 

export default App 