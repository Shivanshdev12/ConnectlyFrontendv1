import { Routes, Route, Navigate } from "react-router"
import React from "react";
import Cookies from "js-cookie"; // Import js-cookie
import App from "./App";
import Auth from "./pages/Auth";

function Router() {
   const isAuthenticated = !!Cookies.get("accessToken"); // Check if token exists in cookies

   return (
      <Routes>
         <Route path="/home" element={isAuthenticated ? <App /> : <Navigate to="/login" />} />
         <Route path="/register" element={<Auth />} />
         <Route path="/login" element={isAuthenticated ? <Navigate to="/home"/> : <Auth/>} />
         <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
   );
}

export default Router;
