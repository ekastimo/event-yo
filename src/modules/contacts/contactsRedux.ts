import {remoteRoutes} from "../../data/constants";
import {search, get, handleError} from "../../utils/ajax";
import {ISearch} from "../../data/types";
import {IContact, IPerson} from "./types";

const actions = {
    CONTACTS_FETCH_START: 'CONTACTS_FETCH_START',
    CONTACTS_FETCH_COMMIT: 'CONTACTS_FETCH_COMMIT',

    CONTACT_FETCH_START: 'CONTACT_FETCH_START',
    CONTACT_FETCH_COMMIT: 'CONTACTS_FETCH_COMMIT',

    CONTACT_UPDATE_START: 'CONTACT_UPDATE_START',
    CONTACT_UPDATE_COMMIT: 'CONTACT_UPDATE_COMMIT',

    CONTACT_CREATE_START: 'CONTACT_UPDATE_START',
    CONTACT_CREATE_COMMIT: 'CONTACT_UPDATE_COMMIT'
}


export const fetchContacts = (query: ISearch) => {
    return function (dispatch: any) {
        dispatch({type: actions.CONTACTS_FETCH_START})
        return search(remoteRoutes.contacts, query,
            (data: any) => {
                dispatch({
                    type: actions.CONTACTS_FETCH_COMMIT,
                    payload: data
                })
            },
            (err, res) => {
                handleError(err, res)
                dispatch({
                    type: actions.CONTACTS_FETCH_COMMIT,
                    payload: []
                })
            }
        )
    };
}


export const fetchContact = (contactId: string) => {
    return function (dispatch: any) {
        dispatch({type: actions.CONTACT_FETCH_START})
        return get(`${remoteRoutes.contacts}/${contactId}`,
            (data: any) => {
                dispatch({
                    type: actions.CONTACT_FETCH_COMMIT,
                    payload: data
                })
            },
            (err, res) => {
                handleError(err, res)
                dispatch({
                    type: actions.CONTACT_FETCH_COMMIT,
                    payload: null
                })
            }
        )
    };
}


export const updatePerson = (dispatch: any)=>(contactId: string, data: IPerson) => {
    return function (dispatch: any) {
        dispatch({type: actions.CONTACT_FETCH_START})
        return get(`${remoteRoutes.contacts}/${contactId}`,
            (data: any) => {
                dispatch({
                    type: actions.CONTACT_FETCH_COMMIT,
                    payload: data
                })
            },
            (err, res) => {
                handleError(err, res)
                dispatch({
                    type: actions.CONTACT_FETCH_COMMIT,
                    payload: null
                })
            }
        )
    };
};

const initialState: any = {
    loadingMultiple: false,
    loadingSingle: false,
    data: [],
    selected: null,
}

export default function contactsReducer(state = initialState, action: any) {
    switch (action.type) {
        case actions.CONTACTS_FETCH_START: {
            return {...state, loadingMultiple: true}
        }
        case actions.CONTACTS_FETCH_COMMIT: {
            const data = action.payload
            return {...state, data, loadingMultiple: false}
        }

        case actions.CONTACT_FETCH_START: {
            return {...state, selected: null, loadingSingle: true}
        }
        case actions.CONTACT_FETCH_COMMIT: {
            const selected: IContact = action.payload
            return {...state, selected, loadingSingle: true}
        }
        default: {
            return state
        }
    }
}



