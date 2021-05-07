import { createSlice } from "@reduxjs/toolkit";
import { clearDataFields, defaltValueSetup, selectedTypeUpdate, lookupByAssetNumberAction, getUDFDataAction, udfSelectedAction, removeSelectedUDFAction } from "../actions";

const entity = {
    assetNumber: '',
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
    UDFList: [],
}

const lookupEntity = {
    UDFLookupList: [],
    conditionCodeList: [],
    selectedUDFs: []
}


// export const dataTab = createSlice({
//     name: 'login',
//     initialState: { entity: entity, loading: false, errorMsg: undefined },
//     UDFList: [],
//     defaultValues: {
//         location: false
//     }
// })

export const dataTab = createSlice({
    name: 'data',
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
                if (state.entity.defaultValues && state.entity.defaultValues.location) {
                    delete payload.location;
                }

                state.entity = {
                    ...state.entity,
                    ...payload
                }
            }
        },
        [lookupByAssetNumberAction.rejected]: (state, error) => {
            state.loading = false
        },

        [selectedTypeUpdate.pending]: (state) => {
            state.loading = true;
            state.errorMsg = undefined;
        },
        [selectedTypeUpdate.fulfilled]: (state, { payload }) => {
            const { type, title } = payload;
            state.loading = false;
            state.entity = {
                ...state.entity,
                [type]: title
            }
        },
        [selectedTypeUpdate.rejected]: (state, error) => {
            state.loading = false
        },



        [clearDataFields.fulfilled]: (state, { payload }) => {
            state.entity = entity
        },


        [defaltValueSetup.fulfilled]: (state, { payload }) => {
            const { name, status } = payload
            state.entity.defaultValues = {
                ...state.entity.defaultValues,
                [name]: status
            }
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
            if (payload.userDefinedFields) {
                state.errorMsg = undefined
                state.entity.UDFLookupList = payload.userDefinedFields
            } else {
                state.entity.UDFLookupList = [];
            }
        },
        [udfSelectedAction.fulfilled]: (state, { payload }) => {
            state.entity.selectedUDFs = [...state.entity.selectedUDFs, payload];
        },

        [removeSelectedUDFAction.fulfilled]: (state, { payload }) => {
            let updatedList = state.entity.selectedUDFs.filter((item) => item.key != payload.key);
            state.entity.selectedUDFs = updatedList;
        },

        [getUDFDataAction.rejected]: (state, error) => {
            state.loading = false
        }
    }
}).reducer;

