import React, { useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
const Addmembers = () => {
  const [inputField, setInputField] = useState({
    name: "",
    mobileName: "",
    address: "",
    membership: "",
    profilePic:
      "https://th.bing.com/th/id/OIP.gj6t3grz5no6UZ03uIluiwHaHa?rs=1&pid=ImgDetMain",
    joiningDate: "",
  });

  const [imageLoader, setImageLoader] = useState(false);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  console.log(inputField);
  const uploadImage = async (event) => {
    setImageLoader(true);
    console.log("Image Uploading");
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    // dvpkjcisn

    data.append("upload_preset", "gym-management");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvpkjcisn/image/upload",
        data
      );
      console.log(response);
      const imageUrl = response.data.url;
      setInputField({ ...inputField, ["profilePic"]: imageUrl });
      setImageLoader(false);
    } catch (err) {
      console.log(err);
      setImageLoader(false);
    }
  };

  return (
    <div className="text-black">
      <div className="grid gap-5 grid-cols-2 text-lg">
        <input
          value={inputField.name}
          onChange={(event) => {
            handleOnChange(event, "name");
          }}
          placeholder="Name Off Joinee"
          type="text"
          className="border-2 w-[90%] pl-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.mobileName}
          onChange={(event) => {
            handleOnChange(event, "mobileName");
          }}
          placeholder="Mobile No"
          type="text"
          className="border-2 w-[90%] pl-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.address}
          onChange={(event) => {
            handleOnChange(event, "address");
          }}
          placeholder="Adress"
          type="text"
          className="border-2 w-[90%] pl-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.joiningDate}
          onChange={(event) => {
            handleOnChange(event, "joiningDate");
          }}
          type="date"
          className="border-2 w-[90%] pl-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <select className="border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray">
          <option>1 Mounth Membership</option>
          <option>2 Mounth Membership</option>
        </select>

        <input type="file" onChange={(e) => uploadImage(e)} />

        <div className="w-[100px] h-[100px]">
          <img
            src={inputField.profilePic}
            className="w-full h-full rounded-full"
          />{" "}
          {imageLoader && (
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="secondary" />
            </Stack>
          )}
        </div>

        <div className="p-3 border-2 w-28 text-lg h-14 text-center bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Register
        </div>
      </div>
    </div>
  );
};

export default Addmembers;
