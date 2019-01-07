import {hasValue} from "../utils/validators";
import {authToken, authUser, redux} from "./constants";

export interface IReduxAction {
    type: string
    payload: any
}

/**
 * Initial state when the application Loads
 */
function loadUser() {
    const userJson = localStorage[authUser]
    if (hasValue(userJson)) {
        return JSON.parse(userJson)
    }
    return false
}

const initialState = {
    activeLink: '/',
    token: localStorage[authToken],// We use this token to load the user
    user: loadUser(),
    searchQuery: ''
}


export default function reducer(state = initialState, action: IReduxAction) {
    switch (action.type) {
        case redux.doLogin: {
            const {user, token} = action.payload
            localStorage.setItem(authToken, token)
            localStorage.setItem(authUser, JSON.stringify(user))
            return {...state, user, token}
        }
        case redux.doLogout: {
            localStorage.removeItem(authToken)
            localStorage.removeItem(authUser)
            return {...state, user: false, token: false}
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
