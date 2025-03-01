import React from "react";
import { Link } from "react-router";

const Login = ({userDetail, handleChange, handleSubmit}) => {
    return <>
        <div className="border-[1px] border-[#bebebe] p-6 w-[75vw] md:w-[30vw] bg-white shadow-xs">
            <div className="w-[100%] mb-2">
                <h1 className="text-[5vw] md:text-[1.4vw]">Login here</h1>
                <p className="text-[#949494] text-[4vw] md:text-[1vw]">Please enter your details</p>
            </div>
            <form className="flex flex-col items-baseline justify-center w-[100%] gap-2">
                <div className="flex flex-col w-full">
                    <label htmlFor="email" className="text-[2.8vw] md:text-[1vw]">Email</label>
                    <input
                        value={userDetail?.email}
                        onChange={handleChange}
                        className="border border-[#989898] p-1 rounded md:p-2" type="email" name="email" id="email"
                        placeholder="Enter your email" required />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="password" className="text-[2.8vw] md:text-[1vw]">Password</label>
                    <input
                        value={userDetail?.password}
                        onChange={handleChange}
                        className="border border-[#989898] p-1 rounded md:p-2" type="password" name="password" id="password"
                        placeholder="Enter your password" required />
                </div>
                <button onClick={handleSubmit}
                    className="bg-indigo-800 w-full text-white p-2 rounded cursor-pointer">Submit</button>
            </form>
        </div>
        <div className="pt-1">
            <p>New here ? <Link className="rs-link" to="/register">Register here</Link></p>
        </div>
    </>
}

export default Login;