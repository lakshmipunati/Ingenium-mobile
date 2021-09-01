import axios from 'axios';
import { SharedTextInput, showAlert } from '../../components';
import {
    API_BASE_PATH,
    ASSETNUMBER_LOOKUP,
    ASSETS_UPDATE_RELOCATE,
    CONDITION_CODE,
    SEARCH_LOCATION,
    UDF_SUGGESTION,VERIFY_UDF
} from '../../config';
import { getUserPermissionApi } from './login.service';
import { headers } from './token.service';

export const assetNumberLookupAPI = async (assetNumber) => {
    return axios({
        method: 'GET',
        url: ASSETNUMBER_LOOKUP + assetNumber,
        baseURL: API_BASE_PATH,
        headers: await headers(),
    })
        .then((response) => {
            let { data } = response;
            if (data !== '') {
                return transformAssetNumberLookupResponse(data[0]);
            } else {
                return response;
            }
        })
        .catch(({ response }) => response);
};

const transformAssetNumberLookupResponse = (response) => {
    let assetNumber = response.AssetNumber;
    let descriptionID = response.DescriptionID;
    let location = response.Location;
    let defaultLocation = response.Location;
    let selectedConditionCode = response.ConditionCode;
    let assetID = response.ID;
    let unitCost = response.UnitCost;
    unitCost = "$ " + unitCost.toFixed(2)
    let productCategory = response.DescriptionCatalog[0].ProductCategory;
    // let UDFList = response.UDFList;
    let UDFList = [];
    let descriptionCatalogData = response.DescriptionCatalog[0];
    // let descriptionCatalogData = {
    //     description: response.ProductDescription,
    //     manufacturer: response.Manufacturer,
    //     productNumber: response.ProductNumber,
    //     userCode: response.UserCode,
    //     productImageURI: response.ProductImage,
    // }

    return {
        assetNumber,
        assetID,
        descriptionID,
        location,
        defaultLocation,
        selectedConditionCode,
        descriptionCatalogData,
        productCategory,
        unitCost,
        UDFList,
        ...response,
    };
};

export const searchLocationAPI = async (text) => {
    return axios({
        method: 'GET',
        url: SEARCH_LOCATION,
        // url: '/locations',
        baseURL: API_BASE_PATH,
        params: {
            text,
        },
        headers: await headers(),
    })
        .then((response) => {
            let { data } = response;
            return transformLocationList(data);
        })
        .catch(({ response }) => {
            return response;
        });
};

export const getUDFSuggestionsAPI = async (text, fieldType) => {
    return axios({
        method: 'GET',
        url: UDF_SUGGESTION,
        baseURL: API_BASE_PATH,
        params: {
            text,
            fieldType,
        },
        headers: await headers(),
    }).then((response) => {
        let { data } = response;
        return transformUDFSuggestionList(data);
    });
};

export const getSelectedUDFFieldDataApi = async (label) => {
    return axios({
        method: 'GET',
        url: `UDFData/${label}`,
        baseURL: API_BASE_PATH,

        headers: await headers(),
    })
        .then((response) => {
            let { data } = response;
            return data;
        })
        .catch(({ response }) => response);
};

export const getConditionCodeApi = async (dataCategory) => {
    return axios({
        method: 'GET',
        url: dataCategory ? CONDITION_CODE + "/" + dataCategory : CONDITION_CODE,
        baseURL: API_BASE_PATH,
        headers: await headers(),
    })
        .then((response) => {
            let { data } = response;
            return transformConditionCode(data);
        })
        .catch(({ response }) => response);
};

const transformConditionCode = async (data) => {
    const userPermission = await getUserPermissionApi();
    let conditionCode = data.map((item, index) => ({
        key: index,
        label: `${item.conditionCode}-${item.conditionDescription}`,
        value: item.conditionCode,
    }));
    return { conditionCode };
};

const transformLocationList = (data) => {
    let locations = data.map((item) => ({
        key: item.location,
    }));
    return { searchResultList: locations };
};

const transformUDFSuggestionList = (data) => {
    let suggestions = data.map((item) => ({
        key: item,
    }));
    return { searchResultList: suggestions };
};

export const checkLocationData = async (locationName) => {
    return axios({
        method: 'GET',
        url: SEARCH_LOCATION + "/Validate" + "/" + locationName,
        baseURL: API_BASE_PATH,
        headers: await headers(),
    })
        .then((response) => {
            let { data } = response;
            return data;
        })
        .catch((response) => {
            response
        });
}

export const saveMobileformDataAPI = async (payload) => {
    let isLocationChanged = false;
    if ((payload.Location != "") && (payload.DefaultLocation != payload.Location)) {
        isLocationChanged = true;
    }
    for (var propName in payload) {
        if (payload[propName] === "null") {
            delete payload[propName];
        }
    }
    let locationValid = await checkLocationData(payload.Location);
    delete payload.DefaultLocation;
    if (locationValid) {
        return axios({
            method: 'POST',
            url: ASSETS_UPDATE_RELOCATE,
            baseURL: API_BASE_PATH,
            data: payload,
            headers: await headers(),
        })
            .then((response) => {
                let { data } = response;
                return {
                    isError: false,
                    data,
                    message: data
                        // ? `Asset ${payload.Location.trim() !== '' ? 'Updated' : 'Relocated'
                        ? `Asset ${isLocationChanged ? 'Relocated' : 'Updated'
                        } Successfully`
                        : `Asset ${payload.Location.trim() !== '' ? 'Update' : 'Relocate'
                        } Failed, Something went wrong`,
                };
            })
            .catch(({ response }) => {
                return {
                    isError: false,
                    response,
                };
            });
    } else {
        showAlert("Location not found!");
        return
    }
};

export const verifyUdfData = async (payload) => {
    // /{userDefinedField}/{fieldData}
    // console.log("verify data ------", payload);
    // let datatest = API_BASE_PATH + VERIFY_UDF + payload.name + "/" + payload.number
    // console.log("url ------", datatest);
    return axios({
        method: 'GET',
        url: VERIFY_UDF + payload.name + "/" + payload.number,
        baseURL: API_BASE_PATH,
        headers: await headers(),
    })
        .then((response) => {
            let { data } = response;
           // console.log("verifyUdfData*******", data)
            return data;
        })
        .catch((response) => {
            response
        });
};

