// import React, { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";

// const Message = ({ message }) => {
//   const scroll = useRef();
//   const { authUser } = useSelector((store) => store.user);
//   useEffect(() => {
//     scroll.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message]);

//   return (
//     <div
//       ref={scroll}
//       className={`chat ${authUser?._id === message?.senderId ? "chat-end" : "chat-start"}`}
//     >
//       <div className="chat-image avatar">
//         <div className="w-10 rounded-full">
//           <img
//             alt="Tailwind CSS chat bubble component"
//             src="https://www.tensionends.com/wp-content/uploads/2022/09/Beautiful-Girl-DP-Images-21.jpg"
//           />
//         </div>
//       </div>
//       <div className="chat-header">
//         <time className="text-xs opacity-50 text-gray-950">12:45</time>
//       </div>
//       <div className="chat-bubble">{message?.message}</div>
//     </div>
//   );
// };
// export default Message;

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
      <div className="chat-bubble">{message?.message}</div>
    </div>
  );
};
export default Message;
