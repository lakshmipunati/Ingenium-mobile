import { createAsyncThunk } from "@reduxjs/toolkit";
import { assetNumberLookupAPI, searchLocationAPI } from "../services";

export const lookupByAssetNumberAction=createAsyncThunk('data/lookup/asset-number',async(assetNumber)=>{
    return await assetNumberLookupAPI(assetNumber);
})

export const triggerSearchItem=createAsyncThunk('data/itemsearch',async(obj)=>{
    const {type, text} = obj;
    if(type==='location'){
        return await searchLocationAPI(text)
    }else{
        return false
    }

})