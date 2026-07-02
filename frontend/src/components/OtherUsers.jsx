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
