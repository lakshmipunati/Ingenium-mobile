import { createSlice } from "@reduxjs/toolkit";
import { lookupByAssetNumberAction } from "../actions";

const entity = {
    assetID: '',
    descriptionCatalogData: {
      description: "",
      manufacturer: "",
      productImageURI: "",
      productNumber: "",
      userCode: null,
    },
    descriptionID: '',
    location: '',
    selectedConditionCode: "O",
    UDFList:[]
}
    
export const dataTab=createSlice({
    name: 'login',
    initialState: {entity: entity, loading: false, errorMsg: undefined},
    reducers: {},
    extraReducers: {
        [lookupByAssetNumberAction.pending]:(state)=>{
            state.loading = true;
            state.errorMsg=undefined;
        },
        [lookupByAssetNumberAction.fulfilled]:(state,{payload})=>{
            state.loading = false;
            if(payload.data){
                state.errorMsg=payload.data
            }else{
                state.errorMsg=undefined
                state.entity = payload ? payload : entity;
            }
        },
        [lookupByAssetNumberAction.rejected]:(state,error)=>{
            state.loading = false
        },

    }
}).reducer;
