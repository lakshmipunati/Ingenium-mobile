import { createAsyncThunk } from "@reduxjs/toolkit";
import { assetNumberLookupAPI } from "../services";

export const lookupByAssetNumberAction=createAsyncThunk('data/lookup/asset-number',async(assetNumber)=>{
    return await assetNumberLookupAPI(assetNumber);
})