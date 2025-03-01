import React from "react";

const Post=({avatar,postImg,title,desc})=>{
    return <div className="border border-[#bebebe] shadow rounded-xs">
        <div className="rs-post-header w-[3vw] h-[3vw] p-2">
            <img className="w-full h-full border rounded-[50%]" src="" alt="avatar" />
        </div>
        <div className="rs-post-body px-2">
            <div className="rs-post-body__header">
                <h2>{title}</h2>
            </div>
            <div className="rs-post-body__img">
                {postImg  ? <img src="" alt="post"/> : <span>No Image found</span>}
            </div>
            <div className="rs-post-body__desc">
                <p>{desc}</p>
            </div>
        </div>
    </div>
}

export default Post;