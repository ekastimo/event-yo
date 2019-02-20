import {remoteRoutes} from "../../data/constants";
import {ISearch} from "./Contacts";
import {fetchGet, fetchPost, fetchPut} from "./fetchHelpers";

const contactActions = {
    CONTACTS_GET_REQUEST: 'CONTACTS_GET_REQUEST',
    CONTACTS_GET_COMMIT: 'CONTACTS_GET_COMMIT',
    CONTACTS_GET_ROLLBACK: 'CONTACTS_GET_ROLLBACK',

    CONTACTS_CREATE_REQUEST: 'CONTACTS_CREATE_REQUEST',
    CONTACTS_CREATE_COMMIT: 'CONTACTS_CREATE_COMMIT',
    CONTACTS_CREATE_ROLLBACK: 'CONTACTS_CREATE_ROLLBACK',

    CONTACTS_UPDATE_REQUEST: 'CONTACTS_UPDATE_REQUEST',
    CONTACTS_UPDATE_COMMIT: 'CONTACTS_UPDATE_COMMIT',
    CONTACTS_UPDATE_ROLLBACK: 'CONTACTS_UPDATE_ROLLBACK',

    CONTACTS_LOCAL_SEARCH: 'CONTACTS_LOCAL_SEARCH',
}


export const fetchData = (query: ISearch) => ({
    type: contactActions.CONTACTS_GET_REQUEST,
    payload: {...query},
    meta: {
        offline: {
            effect: fetchGet(remoteRoutes.contacts, query),
            commit: {type: contactActions.CONTACTS_GET_COMMIT, meta: {...query}},
            rollback: {type: contactActions.CONTACTS_GET_ROLLBACK, meta: {...query}}
        }
    }
});


export const createContact = (data: any) => ({
    type: contactActions.CONTACTS_CREATE_REQUEST,
    payload: {...data},
    meta: {
        offline: {
            effect: fetchPost(remoteRoutes.contactsPerson, data),
            commit: {type: contactActions.CONTACTS_CREATE_COMMIT, meta: {data}},
            rollback: {type: contactActions.CONTACTS_CREATE_ROLLBACK, meta: {data}}
        }
    }
});


export const updateContact = (data: any) => ({
    type: contactActions.CONTACTS_UPDATE_REQUEST,
    payload: {...data},
    meta: {
        offline: {
            effect: fetchPut(remoteRoutes.contacts, data),
            commit: {type: contactActions.CONTACTS_CREATE_COMMIT, meta: {data}},
            rollback: {type: contactActions.CONTACTS_CREATE_ROLLBACK, meta: {data}}
        }
    }
});

const initialState : any= {
    isFetching: false,
    data: [],
    //The currently visible contact
    selected: undefined,
    error: '',
    main: {
        //Main contact View
        showDialog: false,
        isLoading: false
    },
    emails:{
        //state for emails
        showDialog: false,
        isLoading: false
    },
}

export default function contactsReducer(state = initialState, action: any) {
    switch (action.type) {
        case contactActions.CONTACTS_GET_COMMIT: {
            const data = action.payload
            return {...state, data, isFetching: false}
        }
        case contactActions.CONTACTS_GET_ROLLBACK: {
            const errors = handleError(action)
            return {...state, errors, isFetching: false}
        }
        case contactActions.CONTACTS_LOCAL_SEARCH: {
            const {query} = action.payload
            return {...state}
        }

        case contactActions.CONTACTS_CREATE_COMMIT: {
            const contact = action.payload
            const {data: oldData} = state
            const data = [...oldData, contact]
            return {...state, data, isSubmitting: false}
        }

        case contactActions.CONTACTS_CREATE_ROLLBACK: {
            const errors = handleError(action)
            return {...state, errors, isSubmitting: false}
        }

        default: {
            return state
        }
    }
}


const handleError = (action: any) => {
    const error = action.payload
    const errors = []
    if (error.status === 401) {
        errors.push("User Unauthorized")
    }
    return errors
}
