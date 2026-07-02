import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect triggered, selectedUser:", selectedUser); // ADD THIS
    const fetchMessages = async () => {
      try {
        console.log("Fetching messages for:", selectedUser?._id); // ADD THIS
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8080/api/v1/message/${selectedUser?._id}`,
        );
        console.log("Messages received:", res.data); // ADD THIS
        dispatch(setMessages(res.data || []));
      } catch (error) {
        console.log("Error fetching messages:", error); // ADD THIS (updated)
      }
    };
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);
};
export default useGetMessages;
