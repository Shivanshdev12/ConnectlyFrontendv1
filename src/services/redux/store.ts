import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import { authApi } from "../api/authApi";
import { postApi } from "../api/postApi";
import { commentApi } from "../api/commentApi";
import { notificationApi } from "../api/notificationApi";

const reducers = combineReducers({
    users: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
});

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(postApi.middleware)
        .concat(commentApi.middleware)
        .concat(notificationApi.middleware)
});

export default store;
