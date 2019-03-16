import {getToken} from "./ajax";
import Toast from "./Toast";

function parseUrl(url: string, params: any) {
    const paramList = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    return url + (url.indexOf('?') === -1 ? '?' : '&') + paramList;
}

export const fetchGet = (url: string, params: any = {}) => {
    return {
        url: parseUrl(url, params),
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Accept': 'application/json'
        }
    }
}

export const fetchPost = (url: string, params: any = {}) => {
    return {
        url: url,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        json:params
    }
}


export const fetchPut = (url: string, params: any = {}) => {
    return {
        url: url,
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        json:params
    }
}


export const handleFetchError = (action: any) => {
    const error = action.payload
    if (error.status === 401) {
        Toast.error("User Unauthorized")
        //window.location.reload()
    }
    if(error.message === 'Failed to fetch'){
        Toast.warn("No network Connectivity")
    }
}
