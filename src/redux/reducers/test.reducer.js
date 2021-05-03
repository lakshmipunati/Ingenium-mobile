import { createSlice } from "@reduxjs/toolkit";
import { testActions } from "../actions";

export const test=createSlice({
    name: 'counter',
    initialState: {entity: 'Test entity'},
    reducers: {},
    extraReducers: {
        [testActions.pending]:(state)=>{
            loading = true
        },
        [testActions.fulfilled]:(state,actions)=>{
            loading = false,
            state = actions
        },
        [testActions.rejected]:(state,error)=>{
            loading = false,
            state = error
        }
    }
}).reducer;