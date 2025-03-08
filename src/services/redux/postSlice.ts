import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

export const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        setPostState:(state,action)=>{
            state.posts = action.payload;
        }
    }
})

export const postActions = postSlice.actions;

export default postSlice.reducer;