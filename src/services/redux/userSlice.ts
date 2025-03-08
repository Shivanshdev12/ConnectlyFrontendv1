import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:"",
    avatar:"",
}

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        setUserProfile:(state,action)=>{
            state.avatar = action?.payload;
        },
        setUserState:(state,action)=>{
            state.user = action?.payload;
        },
        clearUserState:(state,action)=>{
            state.user = "";
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;