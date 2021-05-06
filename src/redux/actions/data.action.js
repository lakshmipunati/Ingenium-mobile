import { createAsyncThunk } from "@reduxjs/toolkit";
import { assetNumberLookupAPI, getUDFListAndConditionCodeByDataCategory } from "../services";

export const lookupByAssetNumberAction = createAsyncThunk('data/lookup/asset-number', async (assetNumber) => {
    return await assetNumberLookupAPI(assetNumber);
})

export const getUDFDataAction = createAsyncThunk('setup/lookup/udf', async () => {
    return await getUDFListAndConditionCodeByDataCategory();
})