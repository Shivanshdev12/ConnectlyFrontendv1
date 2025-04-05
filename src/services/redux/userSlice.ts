import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userObj:{},
    user:"",
    avatar:"",
}

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.userObj = action.payload;
        },
        setUserProfile:(state,action)=>{
            state.avatar = action?.payload;
        },
        setUserState:(state,action)=>{
            state.user = action?.payload;
        },
        clearUserState:(state)=>{
            state.user = "";
            state.avatar = "";
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;