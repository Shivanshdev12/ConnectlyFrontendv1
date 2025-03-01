import React from "react";
import { PiHouseFill, PiMagnifyingGlassBold, PiMessengerLogoFill, PiBellSimpleFill } from "react-icons/pi";
import { NavLink } from "react-router";

const SideNavbar = () => {
    return <div className="hidden lg:block h-full w-64 border-r border-[#989898] shadow-md">
        <div className="flex flex-col p-6  h-screen p-4">
            <div className="mt-4 space-y-4">
                <NavLink to="/home" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200">
                    <PiHouseFill className="w-6 h-6" />
                    <span>Home</span>
                </NavLink>
                <NavLink to="/search" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200">
                    <PiMagnifyingGlassBold className="w-6 h-6" />
                    <span>Search</span>
                </NavLink>
                <NavLink to="/search" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200">
                    <PiMessengerLogoFill className="w-6 h-6" />
                    <span>Message</span>
                </NavLink>
                <NavLink to="/search" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200">
                    <PiBellSimpleFill className="w-6 h-6" />
                    <span>Notifications</span>
                </NavLink>
            </div>
        </div>
    </div>
}

export default SideNavbar;