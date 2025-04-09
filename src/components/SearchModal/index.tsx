import React, { useEffect, useState } from "react";
import { PiUserPlus, PiUserCheck, PiX, PiXCircleBold } from "react-icons/pi";
import { useFollowUserMutation, useGetAllUserQuery, useSearchUserQuery } from "../../services/api/authApi";
import { useSelector } from "react-redux";
import { IRoot } from "../../interface/IUser";

const SearchUsers = ({ isOpen, onClose }) => {

    const [page, setPage] = useState<number>(1);
    const [following, setFollowing] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const { data: users, isLoading } = useSearchUserQuery({searchTerm});
    const loggedUser = useSelector((state: IRoot) => state.users.user) || localStorage.getItem("user");
    const [followUser, {
        isLoading: isFollowerLoading,
        isSuccess: isFollowerSuccess
    }] = useFollowUserMutation();

    const handleFollow = async (userId) => {
        try{   
            const res = await followUser(userId);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{

    },[]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-sm">
            <div className="bg-white p-4 w-96 rounded-lg shadow-md relative">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    <PiXCircleBold size={20} />
                </button>
                
                <h2 className="text-xl font-bold mb-2 text-[#222]">Search Users</h2>
                
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
                    {Array.isArray(users?.data) ? users?.data?.map((user: {
                        _id: React.Key | null | undefined;
                        avatar: any;
                        firstName: string | undefined;
                        followers: string[];
                    }) => (
                        <div key={user?._id} className="flex items-center justify-between p-2 border-b border-[#a1a1a1]">
                            <div className="flex items-center gap-3">
                                <img
                                    src={user?.avatar || "/default-avatar.png"}
                                    alt={user?.firstName}
                                    className="w-10 h-10 rounded-full"
                                />
                                <span>{user?.firstName}</span>
                            </div>
                            <button
                                onClick={() => handleFollow(user?._id)}
                                className={`px-3 py-1 rounded-md text-white transition ${user && Array.isArray(user?.followers) &&
                                    user?.followers?.includes(loggedUser) ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                                    } flex items-center gap-2`}
                            >
                                {user?.followers && user?.followers?.includes(loggedUser) ? <PiUserCheck size={18} /> : <PiUserPlus size={18} />}
                                {user?.followers && user?.followers?.includes(loggedUser) ? "Following" : "Follow"}
                            </button>
                        </div>
                    )) : <></>}
                </div>
            </div>
        </div>
    );
};

export default SearchUsers;
