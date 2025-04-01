import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PiHeart, PiHeartFill, PiChatCircle, PiShareFat, PiTelegramLogo, PiHandsClapping } from "react-icons/pi";
import { FaHandsClapping } from "react-icons/fa6";
import { IRoot } from "../../interface/IUser";

const Post = ({
    id,
    post,
    comment,
    likes,
    handleComment,
    handleCommentSubmit,
    handleLikePost
}) => {
    const { user, createdAt: timestamp, image: postImg, title, description: desc, comments } = post;
    const userState = useSelector((state: IRoot) => state.users.user);
    const [showCommentInput, setShowCommentInput] = useState(false);

    const handleCommentClick = () => {
        setShowCommentInput(!showCommentInput);
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mb-6">
            <div className="flex items-center justify-between gap-3 p-4 border-b">
                <div className="flex items-center justify-between gap-4">
                    <>
                        {user?.avatar ?
                            <img src={user?.avatar || "/default-avatar.png"} alt="Avatar" className="w-10 h-10 rounded-full border" /> :
                            <p className="flex items-center justify-center text-xs bg-[#F1F1F1] w-10 h-10 rounded-full border border-[#BEBEBE]">{user?.firstName.split("")[0]} {user?.lastName?.split("")[0]}</p>}
                    </>
                    <div>
                        <h2 className="text-gray-800 font-semibold">{user?.firstName + " " + user?.lastName || "User"}</h2>
                        <span className="text-gray-500 text-xs">{moment(timestamp)?.format("DD-MM-YY") || "Just now"}</span>
                    </div>
                </div>
                <div>
                    <button className="border rounded px-2 py-1 text-[#000] text-xs shadow">Follow</button>
                </div>
            </div>

            <div className="p-4">
                {title && <h3 className="text-gray-900 font-semibold mb-2">{title}</h3>}
                <p className="text-gray-700">{desc}</p>
            </div>

            {postImg && (
                <img src={postImg} alt="Post" className="w-full max-h-[400px] object-cover rounded-md" />
            )}

            <div className="px-4 py-2 text-gray-600 flex items-center justify-between">
                <span className="text-sm font-medium">{likes?.length ?? 0} {likes?.length === 1 ? "Like" : "Likes"}</span>
            </div>

            <div className="flex justify-between px-4 py-3 text-gray-600 text-lg border-t">
                <button onClick={() => handleLikePost(id)} className="flex items-center gap-2 hover:text-yellow-500 transition cursor-pointer">
                    {likes?.includes(userState) ? (
                        <>
                            <FaHandsClapping className="text-yellow-500 text-[1.2rem]" />
                            <span className="text-sm font-medium">Liked</span>
                        </>
                    ) : (
                        <>
                            <PiHandsClapping className="text-[1.2rem]" />
                            <span className="text-sm font-medium">Like</span>
                        </>
                    )}
                </button>

                <button onClick={handleCommentClick} className="flex items-center gap-2 hover:text-blue-500 transition cursor-pointer">
                    <PiChatCircle className="text-[1.2rem]" />
                    <span className="text-sm font-medium">Comment</span>
                </button>

                <button className="flex items-center gap-2 hover:text-green-500 transition cursor-pointer">
                    <PiShareFat className="text-[1.2rem]" />
                    <span className="text-sm font-medium">Share</span>
                </button>
            </div>

            {comments?.length > 0 && (
                <div className="px-4 py-3 border-t bg-gray-50">
                    <h3 className="text-gray-700 font-semibold text-sm mb-2">Comments</h3>
                    <div className="max-h-[200px] overflow-y-auto">
                        {comments.map((cmt: any, index: number) => (
                            <div key={index} className="flex gap-3 items-start mb-3">
                                {cmt?.user?.avatar ? <img src={cmt.user?.avatar || "/default-avatar.png"} alt="User"
                                    className="flex items-center justify-center text-xs bg-[#F1F1F1] 
                                w-10 h-10 rounded-full border border-[#BEBEBE]" /> :
                                    <p className="flex items-center justify-center text-xs bg-[#F1F1F1] 
                                    w-10 h-10 rounded-full border border-[#BEBEBE]">
                                        {user?.firstName.split("")[0]} {user?.lastName?.split("")[0]}
                                    </p>}
                                <div className="bg-gray-100 px-4 py-2 rounded-lg max-w-[80%]">
                                    <h4 className="text-sm font-semibold">{cmt.user?.firstName} {cmt.user?.lastName}</h4>
                                    <p className="text-sm text-gray-700">{cmt.comment}</p>
                                    <span className="text-xs text-gray-500">{moment(cmt.createdAt)?.fromNow()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>)}

            {showCommentInput && (
                <div className="px-4 py-3 border-t bg-gray-50 flex items-center gap-3">
                    {user?.avatar ? <img src={user?.avatar || "/default-avatar.png"} alt="User"
                        className="flex items-center justify-center text-xs bg-[#F1F1F1] 
                                w-10 h-10 rounded-full border border-[#BEBEBE]" /> :
                        <p className="flex items-center justify-center text-xs bg-[#F1F1F1] 
                                    w-10 h-10 rounded-full border border-[#BEBEBE]">
                            {user?.firstName.split("")[0]} {user?.lastName?.split("")[0]}
                        </p>}
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => handleComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => handleCommentSubmit({ id, userId: userState, comment })}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        <PiTelegramLogo size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Post;
