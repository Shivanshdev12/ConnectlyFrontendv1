import React, { useEffect, useState } from "react";
import { useLoginUserMutation, useRegisterUserMutation } from "../../services/api/authApi";
import Register from "./Register";
import { useLocation, useNavigate } from "react-router";
import Login from "./Login";
import { useDispatch } from "react-redux";
import { userActions } from "../../services/redux/userSlice";
import { toast, ToastContainer } from "react-toastify";

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
    const [userDetailError, setUserDetailsError] = useState<any>({
        fnameError: false,
        lnameError: false,
        emailError: false,
        passwordError: false, 
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
            const key = `${name}Error`;
            setUserDetailsError((prevDetails) => ({
                ...prevDetails,
                [key] : false 
            }));
        }
    }

    const handleError = (isNewUser = false) => {
        const localError = userDetailError;
        if(userDetail?.fname.trim() === "") {
            localError.fnameError = true;
        }
        if(userDetail?.lname.trim() === "") localError.lnameError = true;
        if(userDetail?.email.trim() === "") localError.emailError = true;
        if(userDetail?.password.trim() === "") localError.passwordError = true;
        setUserDetailsError((prevDetails)=>({
            ...prevDetails,
            localError
        }));
        if(!isNewUser){
            if(localError?.fnameError || localError?.lnameError || localError?.emailError || localError?.passwordError){
                return true;
            }
        }else{
            if(localError?.emailError || localError?.passwordError){
                return true;
            }
        }
        return false;
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const localError  = handleError(false);
        if(localError){
            return;
        }
        const formData = new FormData();
        try{
            const {fname, lname, email, password} = userDetail;
            if(fname === "" || email === "" || password === ""){
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
        const localError = handleError(true);
        if(localError){
            return;
        }
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
                toast.success("LoggedIn Successfully");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        if (isLoginSuccess) {
            window.location.href = "/";
        }
    }, [isLoginSuccess, navigate]);

    return <div className="container h-[100vh] m-auto text-left flex flex-col items-center justify-center">
        {location.pathname === "/register" && <Register userDetail={userDetail} userDetailError={userDetailError} handleSubmit={handleSubmit} handleChange={handleChange} />}
        {location.pathname === "/login" && <Login userDetail={userDetail} userDetailError={userDetailError} handleSubmit={handleLogin} handleChange={handleChange} />}
        <ToastContainer/>
    </div>
}

export default Auth;