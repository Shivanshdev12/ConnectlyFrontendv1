import React, { useState } from "react";
import { PiUserPlus, PiUserCheck, PiX, PiXCircleBold } from "react-icons/pi";
import { useSearchUserQuery } from "../../services/api/authApi";

const SearchUsers = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState("");
    // const [isLoading, setIsLoading] = useState(false);
    const { data: users, isLoading } = useSearchUserQuery({searchTerm});
    // const [followUser] = useFollowMutation();
    const [following, setFollowing] = useState({});

    const handleFollow = async (userId) => {
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-sm">
            <div className="bg-white p-4 w-96 rounded-lg shadow-md relative">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    <PiXCircleBold size={20} />
                </button>
                
                <h2 className="text-xl font-bold mb-2">Search Users</h2>
                
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search for users..."
                    className="w-full p-2 border rounded-md mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                {/* User List */}
                <div className="max-h-60 overflow-y-auto">
                    {isLoading ? <p className="text-gray-500">Loading...</p> : <></>}
                    {users?.data?.length <= 0 && searchTerm && !isLoading && (
                        <p className="text-gray-500">No users found.</p>
                    )}
                    {searchTerm.length>1 && Array.isArray(users?.data) ? users?.data?.map((user) => (
                        <div key={user?._id} className="flex items-center justify-between p-2 border-b">
                            <div className="flex items-center gap-3">
                                <img
                                    src={user?.avatar || "/default-avatar.png"}
                                    alt={user?.firstName}
                                    className="w-10 h-10 rounded-full"
                                />
                                <span>{user?.firstName}</span>
                            </div>
                            <button
                                onClick={() => handleFollow(user?.id)}
                                className={`px-3 py-1 rounded-md text-white transition ${
                                    following[user?._id] ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                                } flex items-center gap-2`}
                            >
                                {following[user?._id] ? <PiUserCheck size={18} /> : <PiUserPlus size={18} />}
                                {following[user?._id] ? "Following" : "Follow"}
                            </button>
                        </div>
                    )) : <></>}
                </div>
            </div>
        </div>
    );
};

export default SearchUsers;
