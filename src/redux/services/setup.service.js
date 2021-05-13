import axios from "axios";
import {
    API_BASE_PATH,
    GETUDFLISTANDCONDITIONCODEBYDATACATEGORY,
} from '../../config';
import { headers } from "./token.service";

export const getUDFListApi = async() => {
    //debugger
    return axios({
        method: "GET",
        // url: GETUDFLISTANDCONDITIONCODEBYDATACATEGORY,
        url: '/userdefinedfields',
        baseURL: API_BASE_PATH,
        params: {
            dataCategoryName: 'EQUIPMENT',
        },
        headers: await headers()
    })
        .then((response) => {
            let { data } = response;
            data.UDFList = data.filter(function (e) {
                return e.FieldType != "FILE LINK";
            });
            let transformedData = transformUDFList(data);
            return transformedData;
        })
        .catch(({response}) =>response);
};

const transformUDFList = (UDFList) => {
    // let { UDFList, ConditionCodes } = data;
    // let conditionCode = ConditionCodes.map((item) => ({
    //     label: item.Name,
    //     value: item.ID,
    // }));
  
    let userDefinedFields = UDFList.map((item, index) => ({
        key: index,
        label: item.userDefinedField,
        id: item.id,
        defaultData: item.defaultData,
        // value: item.fieldData,
        fieldType: item.fieldType,
        fieldLength: item.fieldLength,
        data: null,
        isRequired: item.IsRequired,
    }));
    return {
        userDefinedFields,
        // conditionCode,
    };
};