import axios from "axios";
import qs from 'qs';
import { AsyncStorage } from "react-native";
import {
    ACCESS_TOKEN_KEY,
    API_BASE_PATH,
    COMPANY_CODE_KEY,
    LOGIN_API,
} from '../../config';

import { saveTokenToStorage, setAxiosGlobalConfig } from "./token.service";

export const loginAPI = ({companyID, userName, password}) => {
    return axios({
        method: 'post',
        url: LOGIN_API,
        baseURL: API_BASE_PATH,
        data: qs.stringify({
            Username: userName,
            Password: password,
            CompanyCode: companyID,
            grant_type: 'password'
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then((response) => {
            let { data } = response;      
            saveTokenToStorage({ token: data['access_token'],companyCode:companyID });
            setAxiosGlobalConfig({ token: data['access_token'],companyCode:companyID });
            return data;
        }).catch(({response})=>console.log("#Error : ",response.data))

}