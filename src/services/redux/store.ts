import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import { authApi } from "../api/authApi";
import { postApi } from "../api/postApi";
import { commentApi } from "../api/commentApi";

const reducers = combineReducers({
    users: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
});

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(postApi.middleware)
        .concat(commentApi.middleware)
});

export default store;
