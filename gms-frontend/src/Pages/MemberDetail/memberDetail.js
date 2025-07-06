import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
const MemberDetail = () => {
  const [status, setStatus] = useState("Pending");
  const [renew, setRenew] = useState(false);
  const navigate = useNavigate();

  const handleSwitchBtn = () => {
    let statuss = status === "Active" ? "Pending" : "Active";
    setStatus(statuss);
  };
  return (
    <div className="w-3/4 text-black p-5">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="border-2 w-fit text-xl font-sans text-white p-2 rounded-xl bg-slate-900 cursor-pointer "
      >
        <ArrowBackIcon /> Go Back
      </div>

      <div className="mt-10 p-2">
        <div className="w-[100%] h-fit flex">
          <div className="w-1/3 mx-auto">
            <img
              src="http://res.cloudinary.com/dhlklhfgj/image/upload/v1727794738/xkus7wo1nw36pfstgtlh.jpg"
              className="w-full mx-auto"
            />
          </div>

          <div className="w-2/3 mt-5 text-xl p-5">
            <div className="mt-1 mb-2 text-2xl font-semibold">Name : Esak</div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Mobile : +6281229939229
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Adress : burhan, ksang, jambi
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Joined Date : 10-11-2025
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Next Bill Date : 10-11-2025
            </div>
            <div className="mt-1 mb-2 flex gap-4 text-2xl font-semibold">
              Status{" "}
              <Switch
                onColor="#6366f1"
                checked={status === "Active"}
                onChange={() => {
                  handleSwitchBtn();
                }}
              />
            </div>
            <div
              onClick={() => {
                setRenew((prev) => !prev);
              }}
              className={`mt-1 rounded-lg p-3 border-2 border-slate-900 text-center ${
                renew && status === "Active"
                  ? "bg-gradient-to-r from-indigo-500 via-puple-500 to-pink-500 text-white"
                  : null
              } w-full md:w-1/2 cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-puple-500 to-pink-500`}
            >
              Renew
            </div>
            {renew && status === "Active" ? (
              <div className="rounded-lg p-3 mt-5 mb-5 h-fit bg-slate-50 w-[100%]">
                <div className="w-full">
                  <div className=" my-5">
                    <div>Membership</div>
                    <select className="w-full border-2 p-2 rounded-lg">
                      <option>1 Month Plan</option>
                      <option>2 Month Plan</option>
                    </select>
                    <div
                      className={`mt-3 rounded-lg p-3 border-2 border-slate-900 text-center w-1/2 mx-auto cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-puple-500 to-pink-500`}
                    >
                      Save
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
