import React, { useState } from "react";
import Modal from "../Modal";
import { PiSignOutBold, PiPlusCircle } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { IRoot } from "../../interface/IUser";

const Navbar = ({menuOpen, handleMenu, handleMenuOpen, handleMenuClose}) => {
    const userAvatar = useSelector((state:IRoot)=>state.users.avatar);
    const [isOpen, setIsOpen] = useState(false);

    const handleModal = (e) => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="shadow-md bg-white flex items-center justify-between px-6 py-3 border-b border-gray-300 h-[8vh]">
            {/* Left Section: Hamburger & Logo */}
            <div className="flex items-center gap-4">
                {/* Hamburger Menu (Visible on Mobile) */}
                <button
                    onClick={handleMenu}
                    className="lg:hidden text-gray-800 text-2xl cursor-pointer hover:text-gray-600 transition-all"
                >
                    <GiHamburgerMenu />
                </button>

                {/* Logo */}
                <h1 className="text-2xl font-bold text-gray-800 cursor-pointer tracking-wide">
                    Connectly
                </h1>
            </div>

            {/* Navbar Items (Hidden in mobile, shown in large screens) */}
            <div className="hidden lg:flex items-center gap-6">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer hover:ring-2 hover:ring-gray-400 transition-all">
                    <img src={userAvatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                </div>

                <button
                    onClick={handleModal}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
                >
                    <PiPlusCircle size={20} />
                    <span>Create</span>
                </button>

                <button className="cursor-pointer flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500 transition-all">
                    <PiSignOutBold size={20} />
                    <span>Logout</span>
                </button>
            </div>

            {/* Mobile Sidebar Menu */}
            <div
                className={`fixed top-0 left-0 w-[70%] sm:w-[50%] md:w-[40%] h-full bg-white shadow-lg transform ${
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 z-50`}
            >
                <div className="flex justify-end p-4">
                    <button
                        onClick={handleMenuClose}
                        className="text-2xl text-gray-800 hover:text-gray-600"
                    >
                        <IoMdClose />
                    </button>
                </div>

                <ul className="flex flex-col gap-6 px-6 text-lg">
                    <li className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-all">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <span>Profile</span>
                    </li>

                    <li
                        onClick={handleModal}
                        className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-700 transition-all"
                    >
                        <PiPlusCircle size={22} />
                        <span>Create</span>
                    </li>

                    <li className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-red-500 transition-all">
                        <PiSignOutBold size={22} />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>

            {/* Modal */}
            {isOpen && <Modal onClose={handleModal} />}

            {/* Overlay when sidebar is open */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={handleMenuClose}
                ></div>
            )}
        </div>
    );
};

export default Navbar;
