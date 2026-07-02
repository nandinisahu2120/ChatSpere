import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  console.log("authUser:", authUser);
  console.log("message senderId:", message?.senderId);
  return (
    <div
      ref={scroll}
      className={`chat ${authUser?._id === message?.senderId ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="chat bubble"
            src={
              message?.senderId === authUser?._id
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 text-gray-950">12:45</time>
      </div>
      <div
        className={`chat-bubble ${authUser?._id === message?.senderId ? "bg-gray-200 text-black " : "bg-gray-700 text-white "} `}
      >
        {message?.message}
      </div>
    </div>
  );
};
export default Message;
