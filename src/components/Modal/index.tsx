import React, { useState } from "react";
import { PiXCircleBold } from "react-icons/pi";
import { useCreatePostMutation } from "../../services/api/postApi";

const Modal = ({ onBlur }) => {
    const [createPost, { isLoading }] = useCreatePostMutation();
    const [postDetails, setPostDetails] = useState({
        title: "",
        description: "",
        image:""
    });
    const [image, setImage] = useState("");

    const handleCreatePost = async (e) => {
        e.preventDefault();
        // Add post submission logic here
    };

    const handleInput = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setPostDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white shadow-lg rounded-xl p-4 w-[90%] max-w-md animate-fadeIn">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">What's on your mind?</h2>
                    <button onClick={onBlur} className="text-gray-500 hover:text-gray-700 transition">
                        <PiXCircleBold size={24} />
                    </button>
                </div>

                {/* Form */}
                <form className="mt-4 space-y-4" onSubmit={handleCreatePost}>
                    {/* Title Input */}
                    <input
                        name="title"
                        value={postDetails.title}
                        onChange={handleInput}
                        type="text"
                        placeholder="Enter title"
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Description Textarea */}
                    <textarea
                        name="description"
                        value={postDetails.description}
                        onChange={handleInput}
                        rows={4}
                        placeholder="Start here..."
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* File Input */}
                    <input
                        type="file"
                        className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg cursor-pointer file:bg-blue-600 file:text-white file:px-3 file:py-2 file:rounded-lg hover:file:bg-blue-700 transition"
                    />

                    {/* Post Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
                        disabled={isLoading}
                    >
                        {isLoading ? "Posting..." : "Post"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
