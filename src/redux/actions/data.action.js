import { createAsyncThunk } from '@reduxjs/toolkit';
import { showAlert } from '../../components';
import { ASSET_NOT_FOUND } from "../../config";
import {
  assetNumberLookupAPI,
  searchLocationAPI,
  getUDFSuggestionsAPI,
  addSelectedUDFData,
  getSelectedUDFData,
  clearAllSelectedUDFData,
  clearSelectedSelectedUDFData,
  getUDFListApi,
  getSelectedUDFFieldDataApi,
  getConditionCodeApi,
  saveMobileformDataAPI,
  retrieveTokenFromStorage,
  getUserPermissionApi,
  verifyUdfData
} from '../services';


export const lookupByAssetNumberAction = createAsyncThunk(
  'data/lookup/asset-number',
  async (assetNumber, { getState, dispatch }) => {
    const { selectedUDFs } = getState().dataTab.entity;
    const response = await assetNumberLookupAPI(assetNumber);
    //getConditionCodeApi(response.DataCategory);
    console.log('===conditionCodeList===', response);
    dispatch(getUDFDataAction(response.DataCategory))
    if (response && response.data) {
      showAlert(response.data);
      dispatch(clearDataFields());
      return false;
    }
    if (response.config && response.config.data == undefined) {
      showAlert(ASSET_NOT_FOUND);
      dispatch(clearDataFields());
      return false;
    }
    if (selectedUDFs && selectedUDFs.length > 0) {
      let obj = {
        ...response,
        selectedUDFs: getSelctedUdfValues(selectedUDFs, response),
      };
      console.log("obj===", obj)
      return obj;
    }
    return {
      ...response,
    };
  },
);

export const udfFieldLookup = createAsyncThunk(
  'scanner/udffield',
  async (obj, { getState }) => {
    //console.log("---------udfFieldLookup------", obj)
    const { name, number, isVerifyData } = obj;
    const { selectedUDFs } = getState().dataTab.entity;
    // const response = await assetNumberLookupAPI(number);
    console.log("---------udfFieldLookup   selectedUDFs------", selectedUDFs);
    if (isVerifyData) {
      const response = await verifyUdfData(obj)
      console.log("---------response------", response)
      if (response) {
        //showAlert(response.data);
      } else {
        showAlert(`${name} not found!`);
        number = ""
        //return;
      }
    }
    // if (response && response.data) {
    //   showAlert(response.data);
    // } else if (!response[name]) {
    //   showAlert(`${name} not found!`);
    // }
    const selectedudfList = [];
    selectedudfList.push(...selectedUDFs);
    if (name && selectedUDFs && selectedUDFs.length > 0) {
      const selectedUdfIndex = selectedUDFs.findIndex((i) => i.label === name);
      if (selectedUdfIndex > -1) {
        selectedudfList[selectedUdfIndex] = {
          ...selectedudfList[selectedUdfIndex],
          value: number,
        };
      }
      console.log(selectedudfList);
      return selectedudfList;
    }
    return selectedUDFs;
  },
);

export const getUDFDataAction = createAsyncThunk(
  'setup/lookup/udf',
  async (data, { dispatch }) => {
    const response = await getUDFListApi();
    const ccCode = await getConditionCodeApi(data != undefined ? data : undefined);
    const permissions = await getUserPermissionApi();
    let udfTypes = {};
    const { userDefinedFields } = response;
    for (var i = 0; i < userDefinedFields.length; i++) {
      const { payload } = await dispatch(
        getSelectedUDFFieldData(userDefinedFields[i].label),
      );
      console.log("-----getUDFDataAction-----", response)
      udfTypes = {
        ...udfTypes,
        [userDefinedFields[i].label]: payload.map((item, index) => ({
          key: index,
          label: item.fieldData,
          id: item.id,
        })),
      };
    }
    const storeData = await getSelectedUDFData();
    const obj = {
      ...response,
      selectedUDFs: storeData,
      udfTypes,
      conditionCode: ccCode.conditionCode,
      permissions,
    };
    return obj;
  },
);

export const udfSelectedAction = createAsyncThunk(
  'setup/udfselected',
  async (data) => {
    await addSelectedUDFData(data);
    return data;
  },
);

export const removeSelectedUDFAction = createAsyncThunk(
  'setup/removeudfselected',
  async (selectedudf) => {
    await clearSelectedSelectedUDFData(selectedudf);
    return selectedudf;
  },
);

export const clearAllUDFSelected = createAsyncThunk(
  'setup/clearalludfs',
  async () => {
    await clearAllSelectedUDFData();
    return;
  },
);

export const triggerSearchItem = createAsyncThunk(
  'data/itemsearch',
  async (obj) => {
    const { type, text, isUdfField } = obj;
    if (!isUdfField) {
      return await searchLocationAPI(text);
    } else if (!!isUdfField) {
      return await getUDFSuggestionsAPI(text, type);
    } else {
      return false;
    }
  },
);

export const selectedTypeUpdate = createAsyncThunk(
  'data/update-type',
  async (obj, { getState }) => {
    const { isUdfField, title } = obj;
    if (isUdfField == true) {
      const { selectedUDFs } = getState().dataTab.entity;
      if (selectedUDFs && selectedUDFs.length > 0) {
        var list = [];
        list.push(...selectedUDFs);
        const index = selectedUDFs.findIndex((i) => i.label == obj.type);
        list[index] = {
          ...selectedUDFs[index],
          value: title,
        };
        return {
          type: 'selectedUDFs',
          title: list,
        };
      } else {
        return obj;
      }
    } else {
      return obj;
    }
  },
);

export const clearDataFields = createAsyncThunk(
  'data/clear-type',
  async (obj) => {
    return false;
  },
);

export const defaltValueSetup = createAsyncThunk(
  'data/default-type',
  async (obj) => {
    return obj;
  },
);

function getSelctedUdfValues(selectedUDFs, responseUdf) {
  const obj = [];
  selectedUDFs.map((i) => {
    if (responseUdf && responseUdf[i.label] !== undefined) {
      obj.push({
        ...i,
        value: responseUdf[i.label],
      });
    } else {
      console.log("---getSelctedUdfValues----", responseUdf)
      obj.push({
        fieldType: i.fieldType,
        key: i.key,
        label: i.label,
        verifyData: i.verifyData,
        fieldLength: i.fieldLength,
      });
    }
  });

  return obj;
}

export const getSelectedUDFFieldData = createAsyncThunk(
  'selected/udf/datafiled/values',
  async (label) => {
    return await getSelectedUDFFieldDataApi(label);
  },
);

export const updateRelocateForm = createAsyncThunk(
  'save/data/update/relocate',
  async (data) => {
    return await saveMobileformDataAPI(data);
  },
);

export const getCompanyStoragePath = createAsyncThunk(
  'commpany/storage/path',
  async () => {
    const path = await retrieveTokenFromStorage();
    return path;
  },
);

// export const validateMobileformData = (assetData) => {
//   let errorMessages = [];

//   if (!assetData.AssetNumber) {
//     errorMessages.push('Asset number cannot be empty');
//   }

//   if (!assetData.Location) {
//     errorMessages.push('Location Cannot be empty');
//   }
//   return errorMessages;
// };
