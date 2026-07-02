import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
// import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user,
  );
  const isOnline = onlineUsers?.includes(selectedUser?._id);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   return () => dispatch(setSelectedUser(null));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[550px] flex flex-col h-full">
          <div className="flex gap-2 items-center bg-gray-700 px-4 py-2 mb-2">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="profile_photo" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2 text-white">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center">
          <h1 className="text-black text-4xl font-bold">
            Hello, {authUser?.fullName}
          </h1>
          <h1 className="text-black text-2xl">Let's start a conversation!!</h1>
        </div>
      )}
    </>
  );
};
export default MessageContainer;
