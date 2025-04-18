import React from "react";
import { Link } from "react-router";

const Register = ({ userDetail, userDetailError, handleSubmit, handleChange }) => {
    return <>
        <div className="border-[1px] border-[#bebebe] p-6 w-[75vw] md:w-[30vw] bg-white shadow-xs">
            <div className="w-[100%] mb-2">
                <h1 className="text-[5vw] md:text-[1.4vw]">Register here</h1>
                <p className="text-[#949494] text-[4vw] md:text-[1vw]">Please enter your details</p>
            </div>
            <form className="flex flex-col items-baseline justify-center w-[100%] gap-2">
                <div className="flex flex-col w-full">
                    <label htmlFor="fname" className="text-[2.8vw] md:text-[1vw]">First Name</label>
                    <input
                        onChange={handleChange}
                        value={userDetail?.fname}
                        className={userDetailError?.fnameError ? "border border-[#FF6363] p-1 rounded md:p-2" : "border border-[#989898] p-1 rounded md:p-2"} type="text" name="fname" id="fname"
                        placeholder="Enter your first name" required />
                    <p className="text-[#FF6363] text-[2.8vw] md:text-[1vw]">{userDetailError?.fnameError ? "Enter appropriate first name" : ""}</p>
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="lname" className="text-[2vw] md:text-[1vw]">Last Name</label>
                    <input
                        value={userDetail?.lname}
                        onChange={handleChange}
                        className={userDetailError?.lnameError ? "border border-[#FF6363] p-1 rounded md:p-2" : "border border-[#989898] p-1 rounded md:p-2"} type="text" name="lname" id="lname"
                        placeholder="Enter your last name" required />
                    <p className="text-[#FF6363] text-[2.8vw] md:text-[1vw]">{userDetailError?.lnameError ? "Enter appropriate last name" : ""}</p>
                    
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="email" className="text-[2.8vw] md:text-[1vw]">Email</label>
                    <input
                        value={userDetail?.email}
                        onChange={handleChange}
                        className={userDetailError?.emailError ? "border border-[#FF6363] p-1 rounded md:p-2" : "border border-[#989898] p-1 rounded md:p-2"} type="email" name="email" id="email"
                        placeholder="Enter your email" required />
                    <p className="text-[#FF6363] text-[2.8vw] md:text-[1vw]">{userDetailError?.emailError ? "Enter appropriate email" : ""}</p>
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="password" className="text-[2.8vw] md:text-[1vw]">Password</label>
                    <input
                        value={userDetail?.password}
                        onChange={handleChange}
                        className={userDetailError?.passwordError ? "border border-[#FF6363] p-1 rounded md:p-2" : "border border-[#989898] p-1 rounded md:p-2"} type="password" name="password" id="password"
                        placeholder="Enter your password" required />
                    <p className="text-[#FF6363] text-[2.8vw] md:text-[1vw]">{userDetailError?.passwordError ? "Enter strong password" : ""}</p>
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="password" className="text-[2.8vw] md:text-[1vw]">Avatar</label>
                    <input
                        onChange={handleChange}
                        type="file" name="avatar" id="avatar"
                        className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg cursor-pointer 
                        file:bg-indigo-700 file:text-white file:px-3 file:py-2 file:rounded-lg hover:file:bg-indigo-800 transition" />
                </div>
                <button onClick={handleSubmit}
                    className="bg-indigo-800 w-full text-white p-2 rounded cursor-pointer">Submit</button>
            </form>
        </div>
        <div className="pt-1">
            <p>Already a user ? <Link className="rs-link" to="/login">Login here</Link></p>
        </div>
    </>
}

export default Register;