import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IRoot } from "../../interface/IUser";
import { PiUserPlus, PiUserCheck, PiGear, PiCamera } from "react-icons/pi";
import { FaTh, FaBookmark } from "react-icons/fa";
import { useCoverImageMutation, useGetUserQuery } from "../../services/api/authApi";

const Profile = () => {
    const userId = useSelector((state: IRoot) => state.users.user) || localStorage.getItem("user");
    const {data:user, isLoading, isSuccess, isError} = useGetUserQuery({userId});
    const [updateImage, {isSuccess: isImageSuccess}] = useCoverImageMutation();
    const [isFollowing, setIsFollowing] = useState(false);
    const [activeTab, setActiveTab] = useState("posts");

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const handleUpdateCoverImage = async (e) => {
        try {
            const files = e.target.files[0];
            const formData = new FormData();
            formData.append("coverImage", files);
            formData.append("userId", userId);
            const res = await updateImage(formData).unwrap();
            if(res?.data?.success){

            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-6 p-4 bg-white shadow-md rounded-lg">
            <div className="relative group">
                {user?.data?.coverImage ? (
                    <img
                        src={user?.data?.coverImage || "/default-cover.jpg"}
                        alt="Cover"
                        className="w-full h-40 object-cover rounded-lg"
                    />
                ) : (
                    <div className="bg-[#F1F1F1] w-full h-40 rounded-lg"></div>
                )}
                <label htmlFor="coverImage" className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded-full cursor-pointer hover:bg-gray-800">
                    <PiCamera size={20} />
                </label>
                <input
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    className="hidden"
                    onChange={handleUpdateCoverImage}
                />
                <div className="absolute -bottom-10 left-4">
                    <img
                        src={user?.data?.avatar || "/default-avatar.png"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                    />
                </div>
            </div>

            <div className="mt-12 text-center">
                <h2 className="text-2xl font-bold text-gray-800">{user?.data?.firstName} {user?.data?.lastName}</h2>
                <p className="text-gray-600">{user?.bio || "This user has no bio yet."}</p>

                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={handleFollow}
                        className={`px-4 py-2 rounded-md text-white transition ${
                            isFollowing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                        } flex items-center gap-2`}
                    >
                        {isFollowing ? <PiUserCheck size={18} /> : <PiUserPlus size={18} />}
                        {isFollowing ? "Following" : "Follow"}
                    </button>
                    <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center gap-2">
                        <PiGear size={18} /> Settings
                    </button>
                </div>
            </div>

            <div className="flex justify-around mt-6 border-t border-gray-300 py-4 text-center">
                <div>
                    <span className="text-lg font-bold">{user?.data?.posts?.length || 0}</span>
                    <p className="text-gray-500 text-sm">Posts</p>
                </div>
                <div>
                    <span className="text-lg font-bold">{user?.data?.followers?.length || 0}</span>
                    <p className="text-gray-500 text-sm">Followers</p>
                </div>
                <div>
                    <span className="text-lg font-bold">{user?.data?.following?.length || 0}</span>
                    <p className="text-gray-500 text-sm">Following</p>
                </div>
            </div>

            <div className="flex justify-center gap-6 border-b border-gray-300 mt-4">
                <button
                    className={`pb-2 text-gray-600 font-semibold ${
                        activeTab === "posts" ? "border-b-2 border-blue-500 text-blue-500" : ""
                    }`}
                    onClick={() => setActiveTab("posts")}
                >
                    <FaTh className="inline-block mr-1" /> Posts
                </button>
                <button
                    className={`pb-2 text-gray-600 font-semibold ${
                        activeTab === "saved" ? "border-b-2 border-blue-500 text-blue-500" : ""
                    }`}
                    onClick={() => setActiveTab("saved")}
                >
                    <FaBookmark className="inline-block mr-1" /> Saved
                </button>
            </div>

            <div className="mt-4">
                {activeTab === "posts" ? (
                    <div className="grid grid-cols-3 gap-2">
                        {user?.data?.posts?.map((post) => (
                            <img
                                key={post?._id}
                                src={post?.image || "/placeholder.jpg"}
                                alt="Post"
                                className="w-full h-32 object-cover rounded-md"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-2">
                        {user?.data?.savedPosts?.map((post) => (
                            <img
                                key={post?._id}
                                src={post?.image || "/placeholder.jpg"}
                                alt="Saved Post"
                                className="w-full h-32 object-cover rounded-md"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
