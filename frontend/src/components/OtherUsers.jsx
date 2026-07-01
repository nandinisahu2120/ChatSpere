// import React from "react";
// import OtherUser from "./OtherUser";
// import useGetOtherUsers from "../hooks/useGetOtherUsers";
// import { useSelector } from "react-redux";

// const OtherUsers = () => {
//   useGetOtherUsers();
//   const { otherUsers } = useSelector((store) => store.user);

//   if (!otherUsers) {
//     return null;
//   }

//   return (
//     <div className="overflow-auto">
//       {otherUsers?.map((user) => {
//         return <OtherUser key={user._id} user={user} />;
//       })}
//     </div>
//   );
// };
// export default OtherUsers;
import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";

const OtherUsers = ({ users }) => {
  useGetOtherUsers();

  if (!users || users.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4 px-2">No users found</div>
    );
  }

  return (
    <div className="overflow-auto">
      {users?.map((user) => {
        return <OtherUser key={user._id} user={user} />;
      })}
    </div>
  );
};
export default OtherUsers;
