import { createSlice } from "@reduxjs/toolkit";
import { lookupByAssetNumberAction, getUDFDataAction } from "../actions";

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
    UDFList: []
}

const lookupEntity = {
    UDFLookupList: [],
    conditionCodeList: []
}

export const dataTab = createSlice({
    name: 'login',
    initialState: { entity: entity, loading: false, errorMsg: undefined },
    reducers: {},
    extraReducers: {
        [lookupByAssetNumberAction.pending]: (state) => {
            state.loading = true;
            state.errorMsg = undefined;
        },
        [lookupByAssetNumberAction.fulfilled]: (state, { payload }) => {
            state.loading = false;
            if (payload.data) {
                state.errorMsg = payload.data
            } else {
                state.errorMsg = undefined
                state.entity = payload ? payload : entity;
            }
        },
        [lookupByAssetNumberAction.rejected]: (state, error) => {
            state.loading = false
        },

    }
}).reducer;

export const lookupData = createSlice({
    name: 'lookupdata',
    initialState: { entity: lookupEntity, loading: false, errorMsg: undefined },
    reducers: {},
    extraReducers: {
        [getUDFDataAction.pending]: (state) => {
            state.loading = true;
            state.errorMsg = undefined;
        },
        [getUDFDataAction.fulfilled]: (state, { payload }) => {
            debugger
           // if (payload.userDefinedFields) {
                state.errorMsg = undefined
                state.lookupEntity.UDFLookupList = payload.userDefinedFields
            // } else {
            //     state.lookupEntity.UDFLookupList = [];
            // }
        },
        // [getUDFDataAction.fulfilled]: (state, { payload }) => {
        //     //debugger
        //     if (payload.conditionCodeList) {
        //         state.errorMsg = undefined
        //         state.lookupEntity.conditionCodeList = payload.userDefinedFields
        //     } else {
        //         state.lookupEntity.conditionCodeList = [];
        //     }
        // },
        [getUDFDataAction.rejected]: (state, error) => {
            state.loading = false
        }
    }
}).reducer;