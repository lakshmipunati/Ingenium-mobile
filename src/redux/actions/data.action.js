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

export const selectedTypeUpdate=createAsyncThunk('data/update-type',async(obj)=>{
    return obj
})

export const clearDataFields=createAsyncThunk('data/clear-type',async(obj)=>{
    return false
})

export const defaltValueSetup=createAsyncThunk('data/default-type',async(obj)=>{
   return obj;
})