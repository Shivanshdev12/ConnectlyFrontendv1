import React, { useState } from "react";
import { useLoginUserMutation, useRegisterUserMutation } from "../../services/api/authApi";
import Register from "./Register";
import { useLocation, useNavigate } from "react-router";
import Login from "./Login";

const Auth = () => {
    const [registerUser,{isLoading,isError,isSuccess, error, data}] = useRegisterUserMutation();
    const [loginUser,{isLoading: isLoginLoading, isError: isLoginError, isSuccess: isLoginSuccess}] = useLoginUserMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const [userDetail, setUserDetails] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
    });
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails, 
            [name]: value,
        }));
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const {fname, lname, email, password} = userDetail;
            if(fname === "" || lname === "" || email === "" || password === ""){
                return;
            }
            const payload = {
                firstName: fname,
                lastName: lname,
                email: email,
                password: password
            }
            const res = await registerUser(payload).unwrap();
            if(res?.status){
                navigate("/login");
            }
        }
        catch(err){
            console.log(err);
        }
    }
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const {email, password} = userDetail;
            if(email === "" || password === ""){
                return;
            }
            const payload = {
                email: email,
                password: password
            }
            const res = await loginUser(payload).unwrap();
            if(res?.status){
                navigate("/home");
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return <div className="container h-[90vh] m-auto text-left flex flex-col items-center justify-center">
        {location.pathname === "/register" && <Register userDetail={userDetail} handleSubmit={handleSubmit} handleChange={handleChange} />}
        {location.pathname === "/login" && <Login userDetail={userDetail} handleSubmit={handleLogin} handleChange={handleChange} />}
    </div>
}

export default Auth;