import React from "react";

const Member = () => {
  return (
    <div className="text-black p-5 w-3/4">
      {/* block for banner */}
      <div className="border -2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">
        <div className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2x1 cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-block">
          Add Member
        </div>
        <div>Membership</div>
      </div>
    </div>
  );
};

export default Member;
