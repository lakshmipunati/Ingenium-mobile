
import { ACCESS_TOKEN_KEY, COMPANY_CODE_KEY, USER_EMAIL_ID } from "../../config";
import axios from "axios";
import { AsyncStorage } from "react-native";


export const setAxiosGlobalConfig = ({token,companyCode}) => {
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['CompanyCode'] = companyCode;
}

export const saveTokenToStorage = ({token,companyCode, emailid}) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.setItem(
            ACCESS_TOKEN_KEY,
            token, (err) => {
                if (err) reject(err);
                resolve();
            });
            AsyncStorage.setItem(
                COMPANY_CODE_KEY,
                companyCode, (err) => {
                    if (err) reject(err);
                    resolve();
            });
            AsyncStorage.setItem(
                USER_EMAIL_ID,
                emailid, (err) => {
                    if (err) reject(err);
                    resolve();
            });
    })
}

export const retrieveTokenFromStorage = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.multiGet([
            ACCESS_TOKEN_KEY,
            COMPANY_CODE_KEY,
            USER_EMAIL_ID
        ], (err, result) => {
            if (err || result[0][1] == null) {
                reject();
            }
            resolve(result);
        });
    })
}

export const removeAccessTokenFromStorage = () => {
    AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    AsyncStorage.removeItem(COMPANY_CODE_KEY);
    AsyncStorage.removeItem(USER_EMAIL_ID);    
    return undefined
}

export const headers=async()=>{
    const data = await retrieveTokenFromStorage();
    return {
        'Content-Type': 'application/json',
        Authorization: `bearer ${data[0][1]}`,
        CompanyCode: data[1][1]
    }
}

export const addSelectedUDFData=async(data)=>{
    try {
        const result = [];
        const token = await retrieveTokenFromStorage();
        const getStore = await AsyncStorage.getItem(`SELECTED-UDF-${token[2][1]}-${token[1][1]}`);
        if(getStore===null){
            result.push(data)
        }else{
            const array = JSON.parse(getStore)
            result.push(...array);
            const index = result.findIndex((i)=>i.label===data.label);
            if(index===-1){
                result.push(data)
            }
        }
        await AsyncStorage.setItem(`SELECTED-UDF-${token[2][1]}-${token[1][1]}`, JSON.stringify(result));
        return result
    } catch (error) {
        console.log(error)
    }
 
}

export const getSelectedUDFData=async()=>{
        const token = await retrieveTokenFromStorage();
        const getStore = await AsyncStorage.getItem(`SELECTED-UDF-${token[2][1]}-${token[1][1]}`);
        if(getStore===null){
            return []
        }
        return JSON.parse(getStore)
}

export const clearSelectedSelectedUDFData=async(data)=>{
    try {
        const token = await retrieveTokenFromStorage();
        const getStore = await AsyncStorage.getItem(`SELECTED-UDF-${token[2][1]}-${token[1][1]}`);
        if(getStore===null){
            return [];
        }else{
            const arr = JSON.parse(getStore);
            const list = arr.filter((i)=>i.label!==data.label);
            await AsyncStorage.setItem(`SELECTED-UDF-${token[2][1]}-${token[1][1]}`, JSON.stringify(list));
            return list;
        }
    } catch (error) {
        console.log("Store clear all Error : ",error)
    }   
}

export const clearAllSelectedUDFData=async()=>{
    try {
        const token = await retrieveTokenFromStorage();
        return await AsyncStorage.removeItem(`SELECTED-UDF-${token[2][1]}-${token[1][1]}`);
    } catch (error) {
        console.log("Store clear all Error : ",error)
    }   
}