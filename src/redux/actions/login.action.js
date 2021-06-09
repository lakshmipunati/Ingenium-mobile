import { createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { showAlert } from "../../components";
import {loginAPI, removeAccessTokenFromStorage, getUserPermissionApi} from "../services";

export const loginUser=createAsyncThunk('user/login',async(data)=>{
    const response = await loginAPI(data);
    if(response && response.data && response.data.error){
       showAlert(response.data.error)
    }
    return response;
})

export const logoutUser=createAsyncThunk('user/logout',async()=>{
    return await removeAccessTokenFromStorage();
})