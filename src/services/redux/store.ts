import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { postApi } from "../api/postApi";

const reducers = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
});

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(postApi.middleware),
});

export default store;
