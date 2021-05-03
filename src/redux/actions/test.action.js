import { createAsyncThunk } from "@reduxjs/toolkit";

export const testActions=createAsyncThunk('increement',async()=>{
    return "Test reducer"
})