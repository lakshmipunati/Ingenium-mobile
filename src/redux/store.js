import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer } from "./reducers";

const middleware=[
    ...getDefaultMiddleware({serializableCheck: false})
];


export const store = configureStore({
    middleware,
    reducer
})