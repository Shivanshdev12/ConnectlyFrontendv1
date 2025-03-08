import React, { useEffect, useState } from "react";
import { useLoginUserMutation, useRegisterUserMutation } from "../../services/api/authApi";
import Register from "./Register";
import { useLocation, useNavigate } from "react-router";
import Login from "./Login";
import { useDispatch } from "react-redux";
import { userActions } from "../../services/redux/userSlice";

const Auth = () => {
    const dispatch = useDispatch();
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
    const [avatar, setAvatar] = useState("");

    const handleChange=(e)=>{
        const {name, value} = e.target;
        if(name === "avatar"){
            setAvatar(e.target.files[0]);
        }
        else{
            setUserDetails((prevDetails) => ({
                ...prevDetails, 
                [name]: value,
            }));
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        try{
            const {fname, lname, email, password} = userDetail;
            if(fname === "" || lname === "" || email === "" || password === ""){
                return;
            }

            formData.append("firstName", fname);
            formData.append("lastName", lname);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("avatar", avatar);

            const res = await registerUser(formData).unwrap();
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
            if (res?.success) {
                dispatch(userActions.setUserState(res?.data?.user._id));
                dispatch(userActions?.setUserProfile(res?.data?.user?.avatar))
                localStorage.setItem("user", res?.data?.user?._id);
                localStorage.setItem("avatar",res?.data?.user?.avatar);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        if (isLoginSuccess) {
            window.location.href = "/home";
        }
    }, [isLoginSuccess, navigate]);

    return <div className="container h-[90vh] m-auto text-left flex flex-col items-center justify-center">
        {location.pathname === "/register" && <Register userDetail={userDetail} handleSubmit={handleSubmit} handleChange={handleChange} />}
        {location.pathname === "/login" && <Login userDetail={userDetail} handleSubmit={handleLogin} handleChange={handleChange} />}
    </div>
}

export default Auth;