import React from "react";
import CircleIcon from "@mui/icons-material/Circle";

const MemberCard = () => {
  return (
    <div className="bg-white rounded-lg p-3 hover:bg-gradient-to-r from-indigo-500 via-puple-500 to-pink-500 hover:text-white cursor-pointer">
      <div className="w-28 h-28 flex justify-center relative items-center border-2 p-2 mx-auto rounded-full">
        <img
          className="w-full h-full rounded-full "
          src="http://res.cloudinary.com/dhlklhfgj/image/upload/v1727796565/sduu4dh2lzowc6abiv9z.jpg"
          alt="Profile Pic"
        />
        <CircleIcon
          className="absolute top-0 left-0"
          sx={{ color: "greenyellow" }}
        />
      </div>
      <div className="mx-auto mt-5 text-center text-xl font-semibold font-mono">
        {"Rizky Esa"}
      </div>
      <div className="mx-auto mt-2 text-center text-xl font-mono">
        {"+62 " + "87124398723"}
      </div>
      <div className="mx-auto mt-2 text-center text-lg font-mono">
        Next Bill Date : {"12-09-2024"}
      </div>
    </div>
  );
};

export default MemberCard;
