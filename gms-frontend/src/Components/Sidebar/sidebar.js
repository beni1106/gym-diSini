import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [greeting, setGreting] = useState("");
  const location = useLocation(); //get the current location

  const greetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreting("Good Morning");
    } else if (currentHour < 18) {
      setGreting("Good Afternoon");
    } else if (currentHour < 21) {
      setGreting("Good Evening");
    } else {
      setGreting("Good Night");
    }
  };

  useEffect(() => {
    greetingMessage();
  }, []);
  return (
    <div className="w-1/4 h-[100vh] border-2 bg-black text-white p-5 font-extralight">
      <div className="text-center font-semibold text-3xl">Power Zone</div>
      <div className="flex gap-5 my-5">
        <div className="w-[100px] h-[100px] rounded-lg">
          <img
            alt="gym pict"
            className="w-full h-full rounded-full"
            src="https://b3327586.smushcdn.com/3327586/wp-content/uploads/2024/05/gb-botanica-gym-link-spaces-slough-1024x683.jpg?lossy=0&strip=1&webp=1"
          />
        </div>
        <div>
          <div className="text-2xl">{greeting}</div>
          <div className="text-2xl mt-1 font-semibold">Admin</div>
        </div>
      </div>
      <div className="mt-10 py-10 border-t-2 border-gray-700 ">
        <Link
          to="/dashboard"
          className={`flex items-center gap-8 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black ${
            location.panthname === "/dashboard"
              ? "border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              : null
          }`}
        >
          <div>
            <HomeIcon />
          </div>
          <div>Dashboard</div>
        </Link>
        <Link
          to="/member"
          className={`flex items-center mt-5 gap-8 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black ${
            location.panthname === "/member"
              ? "border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              : null
          }`}
        >
          <div>
            <PeopleAltIcon />
          </div>
          <div>Members</div>
        </Link>
        <div className="flex items-center mt-5 gap-8 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black">
          <div>
            <LogoutIcon />
          </div>
          <div>LogOut</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
