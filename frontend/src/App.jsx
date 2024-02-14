import React from "react";
import Login from "./pages/login/Login";
import SignUp from "./pages/singup/SignUp";
import Home from "./pages/home/Home";
import {Navigate, Route, Routes} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./context/authSlice";
const App = () => {

  const dispatch=useDispatch()

  dispatch(setUser(JSON.parse(localStorage.getItem("chat-user"))))
  return (
   <div className="p-4 h-screen flex items-center justify-center">
    <Routes>
     <Route path="/" element={<Home/>}/> 
     <Route path="/login" element={<Login/>}/> 
     <Route path="/signup" element={<SignUp />}/> 
    </Routes>
    <Toaster />
   </div>
  );
};

export default App;
