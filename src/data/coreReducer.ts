import {AUTH_TOKEN_KEY, AUTH_USER_KEY, redux} from "./constants";
import {coreActionsDefs} from "./coreActions";
import {ILoginReponse} from "./types";
import {getUser, getToken} from "../utils/ajax";

const initialState: any = {
    activeLink: '/',
    token: getToken(),
    user: getUser(),
    splash: true,
    searchQuery: ''
}

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case coreActionsDefs.LOGIN_LOGIN: {
            const {token, user}: ILoginReponse = action.payload
            localStorage.setItem(AUTH_TOKEN_KEY, token)
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
            return {...state, user, token, splash: false}
        }

        case coreActionsDefs.LOGIN_LOGOUT: {
            localStorage.removeItem(AUTH_TOKEN_KEY)
            localStorage.removeItem(AUTH_USER_KEY)
            return {...state, splash: false, token: undefined, user: undefined,}
        }

        case coreActionsDefs.PROFILE_FAILED: {
            console.log("On profiled load failed")
            return {...state, splash: false}
        }

        case redux.doSearch: {
            const {searchQuery} = action.payload
            return {...state, searchQuery}
        }
        default: {
            return state
        }
    }
}
