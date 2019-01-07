import {redux} from "./constants";

export function doLogin(data:any) {
    return {
        type: redux.doLogin,
        payload: data
    }
}

export function doLogout() {
    return {
        type: redux.doLogout,
    }
}

export function doSearch(data:any) {
    return {
        type: redux.doSearch,
        payload: data
    }
}
