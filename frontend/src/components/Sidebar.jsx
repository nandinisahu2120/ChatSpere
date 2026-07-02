import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import { HiOutlineLogout } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setAuthUser } from "../redux/userSlice";
import { setAuthUser, setSelectedUser } from "../redux/userSlice";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/logout");
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server not responding. Please try again.");
      }
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    setAppliedSearch(search);
  };

  const filteredUsers = appliedSearch
    ? otherUsers?.filter((user) =>
        user.fullName.toLowerCase().startsWith(appliedSearch.toLowerCase()),
      )
    : otherUsers;

  return (
    <div className="border-r border-slate-400 p-4 flex flex-col h-full">
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md bg-gray-600 text-white"
          type="text"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="btn bg-gray-600 text-white border-none"
        >
          <BiSearchAlt2 className="w-6 h-6 " />
        </button>
      </form>
      <div className="divider px-3"></div>

      <div className="flex-1 overflow-y-auto">
        <OtherUsers users={filteredUsers} />
      </div>

      <div className="mt-2 ">
        <button
          onClick={logoutHandler}
          className="btn btn-sm h-full  text-black bg-gray-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-800 
 hover:bg-gray-400 "
        >
          <HiOutlineLogout />
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
