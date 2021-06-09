import axios from "axios";
import qs from 'qs';
import {
    API_BASE_PATH,
    LOGIN_API,
} from '../../config';

import { retrieveTokenFromStorage, saveTokenToStorage, setAxiosGlobalConfig } from "./token.service";

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
        .then(async(response) => {
            let { data } = response;   
            if(data.jwtAccessToken){  
                saveTokenToStorage({ 
                    token: data.jwtAccessToken,
                    companyCode:companyID, 
                    emailid: data.emailId,
                    userID: data.userId,
                    companyStoragePath: data.companyStoragePath
                });
                setAxiosGlobalConfig({ 
                    token: data.jwtAccessToken,
                    companyCode:companyID, 
                    emailid: data.emailId
                });
            }
           
            return data;
        }).catch(({response})=>response)

}

export const getUserPermissionApi=async()=>{
    const token = await retrieveTokenFromStorage();  
    return axios({
            method: 'get',
            url: `/usersdatacategories/${token[3][1]}`,
            baseURL: API_BASE_PATH,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `bearer ${token[0][1]}`,
                'CompanyAssignedCode' : token[1][1],
            }
        })
        .then((res)=>{
            return res.data
        }).catch(({response})=>{
            return response;
        })

}