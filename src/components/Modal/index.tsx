import React, { useState } from "react";
import { PiXCircleBold } from "react-icons/pi";

interface ModalProp {
    isLoading?: boolean,
    postDetails?: any,
    onChange: (e) => void,
    onInputChange: (e) => void,
    onSubmit: (e) => void,
    onClose: () => void,
    handleRewrite?: any
}

const Modal = ({ isLoading,
    postDetails,
    onClose,
    onSubmit,
    onChange,
    onInputChange,
 }: ModalProp) => {

    const handleInput = (e: { target: { name: any; value: any; }; }) => {
        onInputChange(e);
    };

    const handleCreatePost = async (e) => {
        onSubmit(e);
    }

    const handleImageChange = (e) => {
        onChange(e);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-sm z-50">
            <div className="bg-white shadow-lg rounded-xl p-4 w-[90%] max-w-md animate-fadeIn">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">What's on your mind?</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
                        <PiXCircleBold size={24} />
                    </button>
                </div>

                {/* Form */}
                <form className="mt-4 space-y-4">
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
                        onChange={handleImageChange}
                        className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg cursor-pointer file:bg-blue-600 file:text-white file:px-3 file:py-2 file:rounded-lg hover:file:bg-blue-700 transition"
                    />

                    {/* Post Button
                    <div className="flex gap-2">
                        <button onClick={handleRewrite} className="border p-2 rounded border-gray-500">Rewrite It</button>
                    </div> */}

                    <button
                        onClick={handleCreatePost}
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
