import { createAsyncThunk } from "@reduxjs/toolkit";
import { assetNumberLookupAPI, getUDFListAndConditionCodeByDataCategory } from "../services";

export const lookupByAssetNumberAction = createAsyncThunk('data/lookup/asset-number', async (assetNumber) => {
    return await assetNumberLookupAPI(assetNumber);
})

export const getUDFDataAction = createAsyncThunk('setup/lookup/udf', async () => {
    return await getUDFListAndConditionCodeByDataCategory();
})

export const udfSelectedAction = createAsyncThunk('setup/udfselected', async (selectedudf) => {
    return selectedudf;
})

export const removeSelectedUDFAction = createAsyncThunk('setup/removeudfselected', async (selectedudf) => {
    return selectedudf;
})