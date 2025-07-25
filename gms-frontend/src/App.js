import "./App.css";
import Sidebar from "./Components/Sidebar/sidebar";
import Dashboard from "./Pages/Dashboard/dashboard";
import Home from "./Pages/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Member from "./Pages/Member/member";
import GeneralUser from "./Pages/GeneralUser/generalUser";
import MemberDetail from "./Pages/MemberDetail/memberDetail";

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    let isLogedIn = sessionStorage.getItem("isLogin");
    if (isLogedIn) {
      setIsLogin(true);
      //navigate("/dashboard");
    } else {
      setIsLogin(false);
      navigate("/");
    }
  }, [sessionStorage.getItem("isLogin")]);

  return (
    <div className="flex">
      {isLogin && <Sidebar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/member" element={<Member />} />
        <Route path="/specific/:page" element={<GeneralUser />} />
        <Route path="/member/:id" element={<MemberDetail />} />
      </Routes>
    </div>
  );
}

export default App;
