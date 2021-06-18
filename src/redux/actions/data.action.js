import { createAsyncThunk } from "@reduxjs/toolkit";
import { showAlert } from "../../components";
import { Alert } from 'react-native';
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
    getUserPermissionApi
} from "../services";

export const lookupByAssetNumberAction = createAsyncThunk('data/lookup/asset-number', async (assetNumber, { getState, dispatch }) => {
    const { selectedUDFs } = getState().dataTab.entity;
    const response = await assetNumberLookupAPI(assetNumber);
    if (response && response.data) {
        showAlert(response.data)
        dispatch(clearDataFields());
        return false
    }
    if (response.config && response.config.data == undefined) {
        showAlert('Asset number is not matching!')
        dispatch(clearDataFields());
        return false
    }
    if (selectedUDFs && selectedUDFs.length > 0) {
        let obj = {
            ...response,
            selectedUDFs: getSelctedUdfValues(selectedUDFs, response)
        };
        return obj;
    }
    return {
        ...response,
    }
})


export const udfFieldLookup = createAsyncThunk('scanner/udffield', async (obj, { getState }) => {
    const { name, number } = obj;
    const { selectedUDFs } = getState().dataTab.entity;
    const response = await assetNumberLookupAPI(number);

    if (response && response.data) {
        showAlert(response.data)
    }
    else if (!response[name]) {
        showAlert(`${name} not found!`)
    }
    const selectedudfList = [];
    selectedudfList.push(...selectedUDFs);
    if (response && response[name] && selectedUDFs && selectedUDFs.length > 0) {
        const selectedUdfIndex = selectedUDFs.findIndex((i) => i.label === name);
        if (selectedUdfIndex > -1) {
            selectedudfList[selectedUdfIndex] = {
                ...selectedudfList[selectedUdfIndex],
                value: response[name]
            }
        }
        return selectedudfList;
    }
    return selectedUDFs;
})

export const getUDFDataAction = createAsyncThunk('setup/lookup/udf', async (data, { dispatch }) => {
    const response = await getUDFListApi();
    const ccCode = await getConditionCodeApi();
    const permissions = await getUserPermissionApi();
    let udfTypes = {};
    const { userDefinedFields } = response;
    for (var i = 0; i < userDefinedFields.length; i++) {
        const { payload } = await dispatch(getSelectedUDFFieldData(userDefinedFields[i].label));
        udfTypes = {
            ...udfTypes,
            [userDefinedFields[i].label]: payload.map((item, index) => ({ key: index, label: item.fieldData, id: item.id }))
        }
    }
    const storeData = await getSelectedUDFData();
    const obj = {
        ...response,
        selectedUDFs: storeData,
        udfTypes,
        conditionCode: ccCode.conditionCode,
        permissions
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
    else if (!!isUdfField) {
        return await getUDFSuggestionsAPI(text, type)
    }
    else {
        return false
    }
})

export const selectedTypeUpdate = createAsyncThunk('data/update-type', async (obj, { getState }) => {
    const { isUdfField, title } = obj;
    if (isUdfField == true) {
        const { selectedUDFs } = getState().dataTab.entity;
        if (selectedUDFs && selectedUDFs.length > 0) {
            var list = [];
            list.push(...selectedUDFs)
            const index = selectedUDFs.findIndex((i) => i.label == obj.type);
            list[index] = {
                ...selectedUDFs[index],
                value: title
            }
            return {
                type: 'selectedUDFs',
                title: list
            }
        } else {
            return obj
        }
    } else {
        return obj
    }
})

export const clearDataFields = createAsyncThunk('data/clear-type', async (obj) => {
    return false
})

export const defaltValueSetup = createAsyncThunk('data/default-type', async (obj) => {
    return obj;
})

function getSelctedUdfValues(selectedUDFs, responseUdf) {
    const obj = [];
    selectedUDFs.map((i) => {
        if (responseUdf && responseUdf[i.label]) {
            obj.push({
                ...i,
                value: responseUdf[i.label]
            })
        } else {
            obj.push({ ...i })
        }
        // const filterData = responseUdf.filter((k)=>k.UDFFieldName===i.label);
        // if(filterData[0]){
        //     obj.push({
        //         ...i,
        //         value: filterData[0].UDFFieldData
        //     })
        // }else{
        //     obj.push({...i})
        // }

    });
    return obj;
}

export const getSelectedUDFFieldData = createAsyncThunk('selected/udf/datafiled/values', async (label) => {
    return await getSelectedUDFFieldDataApi(label)
})

export const saveForm = createAsyncThunk('save/form/data', async (data, { getState, dispatch }) => {
    try {
        // showAlert("Save form");
        const { entity } = getState().dataTab;
        let status = true;
        let query = {
            ID: entity.assetID,
            AssetNumber: entity.assetNumber,
            Location: entity.location
        }
        let formValidationErrors = validateMobileformData(query);
      //  showAlert("formValidationErrors " + formValidationErrors)
        if (formValidationErrors.length > 0) {
            showAlert(`${formValidationErrors.join('\n')}`
            );
            return false;
        }
        for (let i = 0; i <= entity.selectedUDFs.length; i++) {
           // showAlert(entity.selectedUDFs[i].value + "selectedUdf")
        
            if(entity.selectedUDFs[i] && entity.selectedUDFs[i].value){
                // console.log("OKay")
            }
            else{
                let data = {
                    // name: entity.selectedUDFs[i].label,
                    alertMessage: "Confirm",
                    alertMessageContent: "is empty. Do you wish to update as empty? ",
                };
          
                Alert.alert(
                    data.alertMessage,
                    data.alertMessageContent,
                    [
                        { text: "YES", onPress: ()=>{
                            status=false;
                          
                        } },
                        { text: "NO", onPress: () => {  
                            status=true;
                         
                        }, style: "cancel" },
                    ],
                {cancelable: false},
                );

                // Alert.alert()
                // dispatch(confirmationDialog({
                //     data: data,
                //     // saveForm: saveForm(),
                //     // dispatch: dispatch,
                //     // getState: getState(),
                //     selectedUDFObj: entity.selectedUDFs[i],
                //     entity: entity
                // }))
                // break;
            }
            if(!status){
                break;
            }
        }

        for (let i = 0; i <= entity.selectedUDFs.length; i++) {
            if(entity.selectedUDFs[i] && entity.selectedUDFs[i].label){
                query[entity.selectedUDFs[i].label] = entity.selectedUDFs[i].value;
            }
          
            // console.log(query)
        }

        //  let udfValidationErrors = validateUDF(mobileformSetup.selectedUDFs);
        // if (udfValidationErrors.length > 0) {
        //     showAlert({
        //         alertMessage: ERR_UDFVALIDATION,
        //         alertMessageContent: `Required: \n${udfValidationErrors.join('\n')}`
        //     });
        //     return false;
        // }

        // console.log(query);
        // alert("save before")

        console.log("==#22data===",query)
        if(status){
            const response = await saveMobileformDataAPI(query)
            // .catch((e) => {
                // let errorMessage = ''
                // if (typeof (e.response.data) == 'string') {
                //     errorMessage = e.response.data;
                // } else {
                //     errorMessage = e.response.data.result;
                // }
                // showAlert(errorMessage);
            //     return e
            // })
            if (response) {
                console.log("==#2233333data===",response)
                // dispatch(clearDataFields());
                showAlert(response);
                return response
            }
        }
      
        // dispatch({
        //     type: SHOWLOADER
        // });
        // saveMobileformDataAPI(query)
        //     .then((data) => {
        //         dispatch(cancelForm());
        //         showAlert(data);
        //     })
        //     .catch((e) => {
        //         let errorMessage = ''
        //         if (typeof (e.response.data) == 'string') {
        //             errorMessage = e.response.data;
        //         } else {
        //             errorMessage = e.response.data.result;
        //         }
        //         showAlert(errorMessage);
        //     })
        //     .finally(() => {
        //         dispatch({
        //             type: HIDELOADER
        //         });
        //     });

    } catch (error) {
        console.log(error)
    }
})


export const getCompanyStoragePath = createAsyncThunk('commpany/storage/path', async () => {
    const path = await retrieveTokenFromStorage();
    return path
})

export const validateMobileformData = (assetData) => {
    let errorMessages = [];

    if (!assetData.AssetNumber) {
        errorMessages.push('Asset number cannot be empty');
    }

    // if (!assetData.DescriptionID) {
    //     errorMessages.push(ERR_DESCRIPTIONID_EMPTY);
    // }
    if (!assetData.Location) {
        errorMessages.push('Location Cannot be empty');
    }
    return errorMessages;
}

export const confirmationDialog =  createAsyncThunk('confirmationDialog/data', async (data, { getState, dispatch }) => {
    showAlert("Confirm")
    console.log("==#1==")
    let alertMessage = null;
    let alertMessageContent = null;
    if (typeof data.data == "string") {
        console.log("==#2==")
        alertMessageContent = data.data;
    } else if (typeof data.data == "object") {
        console.log("==#3==")
        console.log(data.selectedUDFObj)
        alertMessage = "Confirm";
        alertMessageContent =
            data.selectedUDFObj.label + " " + data.data.alertMessageContent;
    }
   const yesClicked = () => {
        for (let i = 0; i < data.entity.selectedUDFs.length; i++) {
            if (
                data.entity.selectedUDFs[i].label == data.selectedUDFObj.label
            ) {
                data.entity.selectedUDFs[i].value = "";
            }
        }

        dispatch(saveForm());
    };
    if (!alertMessage && !alertMessageContent) return;
    Alert.alert(
        alertMessage,
        alertMessageContent,
        [
            { text: "YES", onPress: ()=>yesClicked },
            { text: "NO", onPress: () => { }, style: "cancel" },
        ],
        { cancelable: false }
    );
}
)

// const validateUDF = (udfList) => {
//     let errorMessages = udfList
//       .filter((item) => {
//         return item.isRequired && (item.data == null || item.data == "");
//       })
//       .map((item) => item.label);
//     return errorMessages;
//   };