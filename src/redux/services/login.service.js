import axios from "axios";
import qs from 'qs';
import {
    API_BASE_PATH,
    LOGIN_API,
} from '../../config';

import { saveTokenToStorage, setAxiosGlobalConfig } from "./token.service";

export const loginAPI = ({companyID, userName, password}) => {
    return axios({
        method: 'post',
        url: LOGIN_API,
        baseURL: API_BASE_PATH,
        data:{
            emailid: userName,
            userpassword: password
        },
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'CompanyAssignedCode' : companyID,
        }
    })
        .then((response) => {
            let { data } = response;      
            saveTokenToStorage({ token: data['token'],companyCode:companyID, emailid: data.loggInUser.emailId });
            setAxiosGlobalConfig({  token: data['token'],companyCode:companyID, emailid: data.loggInUser.emailId });
            return data;
        }).catch(({response})=>response)

}