import { createAsyncThunk } from "@reduxjs/toolkit";
import {loginAPI, removeAccessTokenFromStorage} from "../services";

export const loginUser=createAsyncThunk('user/login',async(data)=>{
    return await loginAPI(data);
})

export const logoutUser=createAsyncThunk('user/logout',async()=>{
    return await removeAccessTokenFromStorage();
})