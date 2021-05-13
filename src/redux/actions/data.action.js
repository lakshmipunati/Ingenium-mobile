import { createAsyncThunk } from "@reduxjs/toolkit";
import { showAlert } from "../../components";
import { 
        assetNumberLookupAPI, 
        // getUDFListAndConditionCodeByDataCategory, 
        searchLocationAPI,
        getUDFSuggestionsAPI,
        addSelectedUDFData,
        getSelectedUDFData,
        clearAllSelectedUDFData,
        clearSelectedSelectedUDFData,
        getUDFListApi,
        getSelectedUDFFieldDataApi
    } from "../services";

export const lookupByAssetNumberAction = createAsyncThunk('data/lookup/asset-number', async (assetNumber, {getState}) => {
    const response = await assetNumberLookupAPI(assetNumber);
    if(response && response.data){
        showAlert(response.data)
    }
    const {selectedUDFs} = getState().dataTab.entity;
    if(selectedUDFs && selectedUDFs.length>0){
        let obj = {
            ...response,
            selectedUDFs: getSelctedUdfValues(selectedUDFs, response.UDFList)
        };
        return obj;
    } 

    return response
})


export const udfFieldLookup=createAsyncThunk('scanner/udffield',async(obj, {getState})=>{
    const {name, number} = obj;
    const {selectedUDFs} = getState().dataTab.entity;
    const response = await assetNumberLookupAPI(number);
    if(response && response.data){
        showAlert(response.data)
    }
    const {UDFList} = response;
    const selectedudfList = [];
    selectedudfList.push(...selectedUDFs);
    if(UDFList && UDFList.length>0 && selectedUDFs && selectedUDFs.length>0){
        const selectedUdfIndex=selectedUDFs.findIndex((i)=>i.label===name);
        const udfListIndex=UDFList.findIndex((i)=>i.UDFFieldName===name);
        if(udfListIndex>-1 && selectedUdfIndex>-1){
            selectedudfList[selectedUdfIndex]={
                ... selectedudfList[selectedUdfIndex],
                value: UDFList[udfListIndex].UDFFieldData
            }
        }
        return selectedudfList;
    }

    return selectedUDFs;
})

export const getUDFDataAction = createAsyncThunk('setup/lookup/udf', async () => {
    const response =  await getUDFListApi();
    const storeData = await getSelectedUDFData();
    const obj ={
        ...response,
        selectedUDFs: storeData
    }
    return obj
})

export const udfSelectedAction = createAsyncThunk('setup/udfselected', async (data) => {
   await addSelectedUDFData(data)
    return data;
})

export const removeSelectedUDFAction = createAsyncThunk('setup/removeudfselected', async (selectedudf) => {
    await clearSelectedSelectedUDFData(selectedudf)
    return selectedudf;
})

export const clearAllUDFSelected = createAsyncThunk('setup/clearalludfs', async () => {
    await clearAllSelectedUDFData()
    return;
})

export const triggerSearchItem = createAsyncThunk('data/itemsearch', async (obj) => {
    const { type, text, isUdfField } = obj;
    if (!isUdfField) {
        return await searchLocationAPI(text)
    }
    else if(!!isUdfField){
        return await getUDFSuggestionsAPI(text, type)
    }
    else {
        return false
    }

})

export const selectedTypeUpdate = createAsyncThunk('data/update-type', async (obj, {getState}) => {
    
    const {isUdfField, title} = obj;
    if(isUdfField==true){
        const {selectedUDFs} = getState().dataTab.entity;
        if(selectedUDFs && selectedUDFs.length>0){
            var list = [];
          
            list.push(...selectedUDFs)
            const index = selectedUDFs.findIndex((i)=>i.label==obj.type);

            list[index]={
                ...selectedUDFs[index],
                value: title
            } 
            return {
                type: 'selectedUDFs',
                title: list
            }
        }else{
            return obj
        }
       
    }else{
        return obj
    }
    
  
})

export const clearDataFields = createAsyncThunk('data/clear-type', async (obj) => {
    return false
})

export const defaltValueSetup = createAsyncThunk('data/default-type', async (obj) => {
    return obj;
})

function getSelctedUdfValues(selectedUDFs, responseUdf){
    const obj =[];
    selectedUDFs.map((i)=>{
        const filterData = responseUdf.filter((k)=>k.UDFFieldName===i.label);
        if(filterData[0]){
            obj.push({
                ...i,
                value: filterData[0].UDFFieldData
            })
        }else{
            obj.push({...i})
        }
        
    });
    return obj;
}

export const getSelectedUDFFieldData=createAsyncThunk('selected/udf/datafiled/values',async(label)=>{
    return await getSelectedUDFFieldDataApi(label)
})