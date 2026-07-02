// import { useEffect } from "react";
// import Signup from "./components/Signup";
// import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from "./components/Login";
// import HomePage from "./components/HomePage";
// import io from "socket.io-client";
// import { useDispatch, useSelector } from "react-redux";
// import { setSocket } from "./redux/socketSlice";
// import { setOnlineUsers } from "./redux/userSlice";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//   },
//   {
//     path: "/register",
//     element: <Signup />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
// ]);

// function App() {
//   const { authUser } = useSelector((store) => store.user);
//   const { socket: storeSocket } = useSelector((store) => store.socket);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (authUser) {
//       const newSocket = io("http://localhost:8080", {
//         query: {
//           userId: authUser._id,
//         },
//       });
//       dispatch(setSocket(newSocket));
//       newSocket.on("connect", () => {
//         console.log("✅ Socket connected:", newSocket.id);
//       });
//       newSocket.on("connect_error", (err) => {
//         console.log("❌ Socket connection error:", err.message);
//       });
//       newSocket.on("getOnlineUsers", (OnlineUsers) => {
//         console.log("Online Users received:", OnlineUsers);
//         dispatch(setOnlineUsers(OnlineUsers));
//       });
//       return () => newSocket.close();
//     } else {
//       if (storeSocket) {
//         storeSocket.close();
//         dispatch(setSocket(null));
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [authUser]);

//   return (
//     <div className="p-4 h-screen flex items-center justify-center">
//       <RouterProvider router={router} />
//       {/* <button className="btn btn-secondary">Secondary</button>{" "} */}
//     </div>
//   );
// }

// export default App;

import { useEffect } from "react";
import Signup from "./components/Signup";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";

function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket: storeSocket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser ? <HomePage /> : <Navigate to="/login" />,
    },
    {
      path: "/register",
      element: !authUser ? <Signup /> : <Navigate to="/" />,
    },
    {
      path: "/login",
      element: !authUser ? <Login /> : <Navigate to="/" />,
    },
  ]);

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:8080", {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(newSocket));
      newSocket.on("connect", () => {
        console.log("✅ Socket connected:", newSocket.id);
      });
      newSocket.on("connect_error", (err) => {
        console.log("❌ Socket connection error:", err.message);
      });
      newSocket.on("getOnlineUsers", (OnlineUsers) => {
        console.log("Online Users received:", OnlineUsers);
        dispatch(setOnlineUsers(OnlineUsers));
      });
      return () => newSocket.close();
    } else {
      if (storeSocket) {
        storeSocket.close();
        dispatch(setSocket(null));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
