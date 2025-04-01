import { Routes, Route, Navigate } from "react-router"
import React, { useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import App from "./App";
import Auth from "./pages/Auth";
import { useDispatch } from "react-redux";
import { userActions } from "./services/redux/userSlice";
import Profile from "./pages/Profile";

function Router() {
   const dispatch = useDispatch();
   const isAuthenticated = !!Cookies.get("accessToken");
   
   useEffect(()=>{
      const user = localStorage.getItem("user");
      const avatar = localStorage.getItem("avatar");
      dispatch(userActions.setUserState(user));
      dispatch(userActions.setUserProfile(avatar));
   },[]);
   
   return (
      <Routes>
         <Route path="/home" element={isAuthenticated ? <App /> : <Navigate to="/login" />} />
         <Route path="/register" element={<Auth />} />
         <Route path="/login" element={<Auth/>} />
         <Route path="/profile" element={isAuthenticated ? <Profile/> : <Navigate to="/login"/>} />
         <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
   );
}

export default Router;
