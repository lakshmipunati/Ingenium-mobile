import { createSlice } from "@reduxjs/toolkit";
import { 
        clearDataFields, 
        defaltValueSetup, 
        selectedTypeUpdate, 
        lookupByAssetNumberAction, 
        getUDFDataAction, 
        udfSelectedAction, 
        removeSelectedUDFAction, 
        udfFieldLookup, 
        clearAllUDFSelected 
    } from "../actions";
const entity = {
    unitCost: '0',
    productCategory: '6100',
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
    selectedConditionCode: '',
    UDFList: [],
    defaultValues: {
        location: false,
        selectedConditionCode: false,
    },
    UDFLookupList: [],
    conditionCodeList: [],
    selectedUDFs: []
}

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
                const {location, selectedConditionCode} = state.entity.defaultValues;
                state.errorMsg = undefined;
                if (location) {
                    delete payload.location;
                }

                if (selectedConditionCode) {
                    delete payload.selectedConditionCode;
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
            state.entity = {
                ...entity,
                UDFLookupList: state.entity.UDFLookupList,
                conditionCodeList: state.entity.conditionCodeList,
                selectedUDFs: state.entity.selectedUDFs.map((i)=>({ key: i.key, label: i.label, fieldType: i.fieldType }))
            }
        },


        [defaltValueSetup.fulfilled]: (state, { payload }) => {
            const { name, status } = payload
            state.entity.defaultValues = {
                ...state.entity.defaultValues,
                [name]: status
            }
        },

        [udfFieldLookup.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.entity.selectedUDFs = payload;
        },

        [getUDFDataAction.pending]: (state) => {
            state.loading = true;
            state.errorMsg = undefined;
        },
        [getUDFDataAction.fulfilled]: (state, { payload }) => {
                state.loading = false;
                state.errorMsg = undefined;
                state.entity.selectedUDFs = payload.selectedUDFs ? payload.selectedUDFs : [];
                state.entity.UDFLookupList = payload.userDefinedFields ? payload.userDefinedFields : [];
                state.entity.conditionCodeList=payload.conditionCode ? payload.conditionCode : []
        },

        [udfSelectedAction.fulfilled]: (state, { payload }) => {
            state.loading = false;
            const filterValue = state.entity.UDFList.filter((i)=>i.UDFFieldName==payload.label);
            const obj = {
                ...payload,
                value: filterValue && filterValue[0] ? filterValue[0].UDFFieldData : ""
            }
            state.entity.selectedUDFs = [...state.entity.selectedUDFs, obj];
        },

        [removeSelectedUDFAction.fulfilled]: (state, { payload }) => {
            state.loading = false;
            let updatedList = state.entity.selectedUDFs.filter((item) => item.key != payload.key);
            state.entity.selectedUDFs = updatedList;
        },

        [clearAllUDFSelected.fulfilled]: (state, { payload }) => {
            state.entity.selectedUDFs = [];
        },

        [getUDFDataAction.rejected]: (state, error) => {
            state.loading = false
        }
    }
}).reducer;


