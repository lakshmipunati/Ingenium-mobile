import { ACCESS_TOKEN_KEY, COMPANY_CODE_KEY } from "../../config";
import axios from "axios";
import { AsyncStorage } from "react-native";


export const setAxiosGlobalConfig = ({token,companyCode}) => {
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['CompanyCode'] = companyCode;
}

export const saveTokenToStorage = ({token,companyCode}) => {
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
    })
}

export const retrieveTokenFromStorage = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.multiGet([
            ACCESS_TOKEN_KEY,
            COMPANY_CODE_KEY], (err, result) => {
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
    return undefined
}