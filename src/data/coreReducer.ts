import {authToken, redux} from "./constants";
import {handleFetchError} from "../utils/fetchHelpers";
import {coreActionsDefs} from "./coreActions";
import {ILoginReponse} from "./types";

const initialState: any = {
    activeLink: '/',
    token: undefined,
    user: undefined,
    isLoading: false,
    searchQuery: ''
}

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case coreActionsDefs.LOGIN_COMMIT: {
            const {token, user}: ILoginReponse = action.payload
            localStorage.setItem(authToken, token)
            return {...state, user, token,isLoading: false}
        }
        case coreActionsDefs.LOGIN_ROLLBACK: {
            console.log("Login Rollback")
            handleFetchError(action)
            return {...state, isLoading: false}
        }
        case coreActionsDefs.LOGIN_LOGOUT: {
            localStorage.removeItem(authToken)
            return {...state, isLoading: false, token: undefined, user: undefined,}
        }
        case coreActionsDefs.LOGIN_START: {
            return {...state, isLoading: true}
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
