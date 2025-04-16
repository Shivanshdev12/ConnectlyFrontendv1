import React, { useEffect, useState } from "react";
import Post from "../../components/Post";
import Navbar from "../../components/Navbar";
import { IPost } from "../../interface/IPost";
import Loader from "../../components/common/Loader";
import SideNavbar from "../../components/SideNavbar";
import SearchUsers from "../../components/SearchModal";
import { useGetPostQuery } from "../../services/api/postApi";
import { useLikePostMutation } from "../../services/api/postApi";
import { useAddCommentMutation } from "../../services/api/commentApi";
import { useDispatch, useSelector } from "react-redux";
import { useGetNotificationMutation } from "../../services/api/notificationApi";
import { IRoot } from "../../interface/IUser";
import { toast, ToastContainer } from "react-toastify";

const Main = () => {
    const [page, setPage] = useState<number>(1);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [feed, setFeed] = useState<IPost[]>([]);
    const [notifications, setNotifications] = useState([]);
    const [postLikes, setPostLikes] = useState<string[]>([]);
    const userId = useSelector((state: IRoot) => state.users.user) || localStorage.getItem("user");
    const [likePost, { isLoading: isLikeLoading, isSuccess: isLikeSucces }] = useLikePostMutation();
    const [addComment, { isLoading: isCommentLoading, isSuccess: isCommentSuccess }] = useAddCommentMutation();
    const { data, isLoading, isSuccess, refetch } = useGetPostQuery(page, {
        refetchOnMountOrArgChange: false,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });
    const [getNotification, {isLoading: isNotificationLoading, isSuccess: isNotificationSuccess, data: allNotifications}] = 
    useGetNotificationMutation();

    const handleMenu = () => { setMenuOpen(!menuOpen) }

    const handleMenuOpen = () => { setMenuOpen(true) }
    const handleMenuClose = () => { setMenuOpen(false) }

    const handleSearch = () => { setSearchOpen(true); }
    const handleSearchClose = () => { setSearchOpen(false); }

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

    const handleNotifications=async()=>{
        try{
            const res = await getNotification({userId});
            if(res?.data?.success){
                setNotifications(res?.data?.data);
            }else{
                throw new Error("Error fetching notifications");
            }
        }
        catch(err){
            toast.error(err?.message);
        }
    }

    useEffect(() => {
        if (data?.data?.posts) {
            setFeed(data.data.posts);
        }
    }, [data]);

    useEffect(()=>{
        handleNotifications();
    },[]);

    if(isLoading){
        return <Loader/>
    }

    return <React.Fragment>
        <Navbar
            menuOpen={menuOpen}
            handleGetFeed={refetch}
            handleMenu={handleMenu}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[auto_0.8fr_0.2fr] h-[92vh] overflow-y-auto">
            {<SideNavbar 
                open={searchOpen}
                notifications={notifications}
                handleSearch={handleSearch} 
                handleNotifications={handleNotifications} />}
            <div className="border-r border-[#989898] p-6">
                <div className="px-2 flex flex-col gap-4 rs-posts">
                    {feed?.map((post: IPost) => {
                        return <Post
                            key={post?._id}
                            id={post?._id}
                            post={post}
                            likes={post?.likes}
                            comment={comment}
                            handleLikePost={handleLikePost}
                            handleComment={handleComment}
                            handleCommentSubmit={handleCommentSubmit}
                        />
                    })}
                </div>
            </div>
        </div>
        {searchOpen && <SearchUsers isOpen={true} onClose={handleSearchClose} />}
        <ToastContainer position="bottom-left" />
    </React.Fragment>
}

export default Main;