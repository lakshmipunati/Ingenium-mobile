import axios from 'axios';
import {
  API_BASE_PATH,
  ASSETNUMBER_LOOKUP,
  ASSETS_UPDATE_RELOCATE,
  CONDITION_CODE,
  SEARCH_LOCATION,
  UDF_SUGGESTION,
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
  let selectedConditionCode = response.ConditionCode;
  let assetID = response.ID;
  let unitCost = response.UnitCost;
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

export const getConditionCodeApi = async () => {
  return axios({
    method: 'GET',
    url: CONDITION_CODE,
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

export const saveMobileformDataAPI = async (payload) => {
  return axios({
    method: 'POST',
    url: ASSETS_UPDATE_RELOCATE,
    baseURL: API_BASE_PATH,
    data: payload,
    headers: await headers(),
  })
    .then((response) => {
      let { data } = response;
      console.log('===####111===', data);
      return {
        isError: false,
        message: data
          ? `Form successfully ${
              payload.Location.trim() !== '' ? 'Updated' : 'Relocated'
            }`
          : `Oops! Failed to ${
              payload.Location.trim() !== '' ? 'Updated' : 'Relocated'
            } Form`,
      };
    })
    .catch(({ response }) => {
      console.log('===####2222===', response);
      return {
        isError: false,
        response,
      };
    });
};
