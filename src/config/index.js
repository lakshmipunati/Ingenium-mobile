global.XMLHttpRequest = global.originalXMLHttpRequest ?
    global.originalXMLHttpRequest :
    global.XMLHttpRequest;
global.FormData = global.originalFormData ?
    global.originalFormData :
    global.FormData;

export const API_BASE_PATH = 'https://ingenium-mobileapi.azurewebsites.net';

export * from './Login';