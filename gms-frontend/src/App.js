import "./App.css";
import Sidebar from "./Components/Sidebar/sidebar";
import Dashboard from "./Pages/Dashboard/dashboard";
import Home from "./Pages/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

<h1>pler ayama</h1>;

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    let isLogedIn = sessionStorage.getItem("isLogin");
    if (isLogedIn) {
      setIsLogin(true);
      navigate("/dashboard");
    }
  }, [sessionStorage.getItem("isLogin")]);

  return (
    <div className="flex">
      {isLogin && <Sidebar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
