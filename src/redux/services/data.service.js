import axios from "axios";
import { API_BASE_PATH, ASSETNUMBER_LOOKUP } from "../../config";
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