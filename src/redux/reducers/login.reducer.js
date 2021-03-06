import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../actions";
import { retrieveTokenFromStorage } from "../services";


const tokenStatus = retrieveTokenFromStorage()
    .then((response)=>!!(response && response[0] && response[0][0] == 'ACCESS_TOKEN_KEY'))
    .catch((e)=>e);

   
    
export const login=createSlice({
    name: 'login',
    initialState: {entity: undefined, loading: false , isLogin: tokenStatus},
    reducers: {},
    extraReducers: {
        [loginUser.pending]:(state)=>{
            state.loading = true
        },
        [loginUser.fulfilled]:(state,{payload})=>{
            state.loading = false,
            state.entity = payload,
            state.isLogin = !!(payload && payload.jwtAccessToken)
        },
        [loginUser.rejected]:(state,error)=>{
            state.loading = false
        },
        [logoutUser.pending]:(state)=>{
            state.loading = true,
            state.isLogin=false
        },
        [logoutUser.fulfilled]:(state, {payload})=>{                 
            if(payload){
                state.loading = false,
                state.entity =undefined,
                state.isLogin = false
            }
           else{
            state.loading = false,
            state.isLogin = false
           }
        },
        [logoutUser.rejected]:(state,error)=>{
            state.loading = false
        },
    }
}).reducer;


