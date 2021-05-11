import axios from "axios";
import { API_BASE_PATH, ASSETNUMBER_LOOKUP, SEARCH_LOCATION, UDF_SUGGESTION } from "../../config";
import {headers} from "./token.service"



export const assetNumberLookupAPI = async(assetNumber) => {
   
    return axios({
        method: 'GET',
        url: ASSETNUMBER_LOOKUP,
        baseURL: API_BASE_PATH,
        params: {
            assetNumber
        },
        headers: await headers()
    }).then((response) => {
        let { data } = response;
        return transformAssetNumberLookupResponse(data);
    }).catch(({response})=>response)
}

const transformAssetNumberLookupResponse = (response) => {
    let descriptionID = response.DescriptionID;
    let location = response.Location;
    let selectedConditionCode = response.ConditionCode
    let assetID = response.ID;
    let UDFList = response.UDFList;
    let descriptionCatalogData = {
        description: response.ProductDescription,
        manufacturer: response.Manufacturer,
        productNumber: response.ProductNumber,
        userCode: response.UserCode,
        productImageURI: response.ProductImage,
    }

    return {
        assetID,
        descriptionID,
        location,
        selectedConditionCode,
        descriptionCatalogData,
        UDFList
    };
}

export const searchLocationAPI=async(text)=>{
    return axios({
        method: 'GET',
        url: SEARCH_LOCATION,
        baseURL: API_BASE_PATH,
        params: {
            text
        },
        headers: await headers()
    }).then((response) => {
        let { data } = response;
        return transformLocationList(data);
    }).catch(({response})=>response)
}


export const getUDFSuggestionsAPI = async(text, fieldType) => {
    return axios({
        method: 'GET',
        url: UDF_SUGGESTION,
        baseURL: API_BASE_PATH,
        params: {
            text,
            fieldType
        },
        headers: await headers()
    }).then((response) => {
        let { data } = response;
        return transformUDFSuggestionList(data);
    })
}

const transformLocationList = (data) => {
    let locations = data.map((item) => (
        {
            key: item.Name
        }
    ));
    return { searchResultList: locations };
}

const transformUDFSuggestionList = (data) => {
    let suggestions = data.map((item) => (
        {
            key: item
        }
    ));
    return { searchResultList: suggestions };
}
