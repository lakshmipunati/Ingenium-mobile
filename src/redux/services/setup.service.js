import axios from "axios";
import {
    API_BASE_PATH,
    // GETUDFLISTANDCONDITIONCODEBYDATACATEGORY,
} from '../../config';
import { headers } from "./token.service";

//
export const getUDFListApi = async () => {
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
            data = data.filter(function (e) {
                return e.fieldType !== "FILE LINK";
            });
            let transformedData = transformUDFList(data);
            return transformedData;
        })
        .catch(({ response }) => response);
};

const transformUDFList = (UDFList) => {
    let userDefinedFields = UDFList.map((item, index) => ({
        key: index,
        label: item.userDefinedField,
        id: item.id,
        defaultData: item.defaultData,
        verifyData: item.verifyData,
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