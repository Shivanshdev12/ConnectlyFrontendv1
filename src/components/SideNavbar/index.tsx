import React, { useState, useRef, useEffect } from "react";
import {
    PiHouseFill,
    PiMagnifyingGlassBold,
    PiMessengerLogoFill,
    PiBellSimpleFill,
    PiUserPlusFill,
    PiCheckBold,
} from "react-icons/pi";
import { NavLink } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

const SideNavbar = ({ open, notifications, handleSearch, handleNotifications }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationsRef = useRef<any>(null);

    const handleOpenNotifications = () => {
        setShowNotifications(prev => !prev);
    };
    
    useEffect(() => {
        if (showNotifications) {
            handleNotifications();
        }
    }, [showNotifications]);    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationsRef.current &&
                !notificationsRef.current?.contains(event.target)
            ) {
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="hidden lg:block h-full w-64 border-r border-[#989898] shadow-md relative">
            <div className="flex flex-col p-6 h-screen space-y-4">
                <NavLink
                    to="/home"
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200"
                >
                    <PiHouseFill className="w-6 h-6" />
                    <span>Home</span>
                </NavLink>

                <button
                    onClick={handleSearch}
                    className="flex items-center space-x-2 p-2 rounded-md w-full hover:bg-gray-200"
                >
                    <PiMagnifyingGlassBold className="w-6 h-6" />
                    <span>Search</span>
                </button>

                <NavLink
                    to="/messages"
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200"
                >
                    <PiMessengerLogoFill className="w-6 h-6" />
                    <span>Messages</span>
                </NavLink>

                <div className="relative" ref={notificationsRef}>
                    <button
                        onClick={handleOpenNotifications}
                        className="flex items-center space-x-2 p-2 rounded-md w-full hover:bg-gray-200"
                    >
                        <PiBellSimpleFill className="w-6 h-6" />
                        <span>Notifications</span>
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 600,
                                    damping: 20,
                                }}
                                className="absolute left-0 mt-3 w-64 bg-white shadow-lg border border-[#a1a1a1] rounded-xl z-50 animate-pop"
                            >
                                <div className="absolute -top-1.5 left-4 w-3 h-3 bg-white border-l border-t border-[#a1a1a1] rotate-45 z-[-1]"></div>

                                <div className="p-4 font-semibold border-b rounded-t-xl">Notifications</div>

                                <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                                    {notifications?.length > 0 ? (
                                        notifications.map((notif, index) => {
                                            const isFirst = index === 0;
                                            const isLast = index === notifications.length - 1;
                                            return (
                                                <li
                                                    key={notif.id}
                                                    className={`flex justify-between gap-1 p-3 text-sm hover:bg-gray-100 cursor-pointer transition-all 
                    ${isFirst ? "rounded-t-none" : ""}
                    ${isLast ? "rounded-b-xl" : ""}
                `}> 
                                                    <div className="flex gap-2">
                                                        {notif?.type === "follow" ? <PiUserPlusFill className="text-purple-600 w-5 h-5" /> : <></>}
                                                        <>{notif?.message}</>
                                                    </div>
                                                    <button className="text-gray-500 hover:text-green-600">
                                                        <PiCheckBold className="w-4 h-4" />
                                                    </button>
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <li className="p-3 text-sm text-gray-500">No notifications</li>
                                    )}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    );
};

export default SideNavbar;
