import axios from "axios";
import {
    API_BASE_PATH,
    GETUDFLISTANDCONDITIONCODEBYDATACATEGORY,
} from '../../config';

export const getUDFListAndConditionCodeByDataCategory = (dataCategory) => {
    return axios({
        method: "GET",
        url: GETUDFLISTANDCONDITIONCODEBYDATACATEGORY,
        baseURL: API_BASE_PATH,
        params: {
            dataCategoryName: dataCategory,
        },
    })
        .then((response) => {
            debugger
            let { data } = response;
            data.UDFList = data.UDFList.filter(function (e) {
                return e.FieldType != "FILE LINK";
            });
            let transformedData = transformUDFListAndConditionCode(data);
            return transformedData;
        })
        .catch((e) => {
            return e;
        });
};

const transformUDFListAndConditionCode = (data) => {
    let { UDFList, ConditionCodes } = data;
    let conditionCode = ConditionCodes.map((item) => ({
        label: item.Name,
        value: item.ID,
    }));
    let userDefinedFields = UDFList.map((item, index) => ({
        label: item.Name,
        value: item.ID,
        fieldType: item.FieldType,
        fieldLength: item.FieldLength,
        data: null,
        isRequired: item.IsRequired,
    }));
    return {
        userDefinedFields,
        conditionCode,
    };
};