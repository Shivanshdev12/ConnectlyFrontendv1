import React, { useEffect, useState } from "react";
import SideNavbar from "../../components/SideNavbar";
import Navbar from "../../components/Navbar";
import Post from "../../components/Post";
import { useGetPostQuery } from "../../services/api/postApi";
import { useLikePostMutation } from "../../services/api/postApi";
import { IPost } from "../../interface/IPost";
import { useAddCommentMutation } from "../../services/api/commentApi";

const Main = () => {
    const [page, setPage] = useState<number>(1);
    const [menuOpen, setMenuOpen] = useState(false);
    const [postLikes, setPostLikes] = useState<string[]>([]);
    const [comment, setComment] = useState("");
    const [feed, setFeed] = useState<IPost[]>([]);

    const { data, isLoading, isSuccess, refetch } = useGetPostQuery(page, {
        refetchOnMountOrArgChange: false,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });
    const [likePost, { isLoading: isLikeLoading, isSuccess: isLikeSucces }] = useLikePostMutation();
    const [addComment, { isLoading: isCommentLoading, isSuccess: isCommentSuccess }] = useAddCommentMutation();

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    }
    const handleMenuOpen = () => { setMenuOpen(true) }
    const handleMenuClose = () => { setMenuOpen(false) }

    const handleLikePost = async (id: string) => {
        try {
            const res = await likePost({
                id
            });
            if (res?.data?.success) {
                const likes = structuredClone(postLikes);
                likes.push(id);
                setPostLikes(likes);
                refetch();
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleComment = (args = "") => {
        setComment(args);
    }
    
    const handleCommentSubmit = async ({id,userId,comment}) => {
        try{
            if (comment.trim()) {
                const res = await addComment({
                    id,
                    userId,
                    comment
                });
                if(res?.data?.success){
                    refetch();
                }
                handleComment("");
            }
        }
        catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        if (data?.data?.posts) {
            setFeed(data.data.posts);
        }
    }, [data]);
    

    return <React.Fragment>
        <Navbar
            menuOpen={menuOpen}
            handleMenu={handleMenu}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[auto_0.8fr_0.2fr] h-[92vh] overflow-y-auto">
            {<SideNavbar />}
            <div className="border-r border-[#989898] p-6">
                <div className="px-2 flex flex-col gap-4 rs-posts">
                    {feed?.map((post: IPost) => {
                        return <Post
                            key={post?._id}
                            id={post?._id}
                            post={post}
                            comment={comment}
                            handleLikePost={handleLikePost}
                            handleComment={handleComment}
                            handleCommentSubmit={handleCommentSubmit}
                        />
                    })}
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Main;