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
        clearAllUDFSelected, 
    } from "../actions";
const entity = {
    unitCost: '',
    productCategory: '',
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
    selectedUDFs: [],
    udfTypes: [],
    permissions: [],
    securityLevel: "FULL ACCESS"
    // securityLevel: "READ ONLY"
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
            const {defaultValues, permissions, securityLevel} = state.entity;
            if (payload.data) {
                state.errorMsg = payload.data
            } else {
                const {location, selectedConditionCode} = defaultValues;
                state.errorMsg = undefined;
                if (location) {
                    delete payload.location;
                }

                if (selectedConditionCode) {
                    delete payload.selectedConditionCode;
                }
                const accessIndex = permissions.findIndex((i)=>i.dataCategory===payload.DataCategory);
                // console.log(permissions,"====PEr==",permissions[accessIndex] ? permissions[accessIndex] : undefined)
                if(permissions[accessIndex] && permissions[accessIndex].securityLevel== 'NO ACCESS'){
                    state.entity = {
                        ...state.entity,
                        securityLevel: accessIndex>-1 && permissions[accessIndex] ? permissions[accessIndex].securityLevel:securityLevel,
                    }
                }else{
                state.entity = {
                    ...state.entity,
                    ...payload,
                    securityLevel: accessIndex>-1 && permissions[accessIndex] ? permissions[accessIndex].securityLevel:securityLevel,
                }
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
                udfTypes: state.entity.udfTypes,
                selectedUDFs: state.entity.selectedUDFs.map((i)=>({ key: i.key, label: i.label, fieldType: i.fieldType })),
                permissions: state.entity.permissions.map((i)=>i)
            }
        },

        [defaltValueSetup.fulfilled]: (state, { payload }) => {
            const { name, status } = payload;
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
            state.entity.udfTypes = payload.udfTypes;
            state.entity.conditionCodeList = payload.conditionCode;
            state.entity.permissions = payload.permissions


        },

        [getUDFDataAction.rejected]: (state, error) => {
            state.loading = false
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
        }

      
    }
}).reducer;


