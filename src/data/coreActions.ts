import {remoteRoutes} from "./constants";
import {ISearch} from "./types";
import {fetchPost} from "../utils/fetchHelpers";


export const coreActionsDefs = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_COMMIT: 'LOGIN_COMMIT',
    LOGIN_ROLLBACK: 'LOGIN_ROLLBACK',
    LOGIN_START: 'LOGIN_START',
    LOGIN_LOGOUT: 'LOGIN_LOGOUT',
}


export const startLogin = () => {
    return {
        type: coreActionsDefs.LOGIN_START,
    }
}

export const doLogout = () => {
    return {
        type: coreActionsDefs.LOGIN_LOGOUT,
    }
}

export const doLogin = (query: ISearch) => {
    return {
        type: coreActionsDefs.LOGIN_REQUEST,
        payload: {...query},
        meta: {
            offline: {
                effect: fetchPost(remoteRoutes.login, query),
                commit: {type: coreActionsDefs.LOGIN_COMMIT, meta: {...query}},
                rollback: {type: coreActionsDefs.LOGIN_ROLLBACK, meta: {...query}}
            }
        }
    }
};

