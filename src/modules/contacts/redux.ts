import {remoteRoutes} from "../../data/constants";
import {fetchGet, handleFetchError} from "../../utils/fetchHelpers";
import {ISearch} from "../../data/types";

const contactActions = {
    CONTACTS_GET_REQUEST: 'CONTACTS_GET_REQUEST',
    CONTACTS_GET_COMMIT: 'CONTACTS_GET_COMMIT',
    CONTACTS_GET_ROLLBACK: 'CONTACTS_GET_ROLLBACK',

    CONTACTS_SINGLE_REQUEST: 'CONTACTS_SINGLE_REQUEST',
    CONTACTS_SINGLE_COMMIT: 'CONTACTS_SINGLE_COMMIT',
    CONTACTS_SINGLE_ROLLBACK: 'CONTACTS_SINGLE_ROLLBACK',

    CONTACTS_CREATE: 'CONTACTS_CREATE',
    CONTACTS_UPDATE: 'CONTACTS_UPDATE',

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

export const fetchContact = (contactId: string) => ({
    type: contactActions.CONTACTS_SINGLE_REQUEST,
    payload: {contactId},
    meta: {
        offline: {
            effect: fetchGet(`${remoteRoutes.contacts}/${contactId}`),
            commit: {type: contactActions.CONTACTS_SINGLE_COMMIT, meta: {contactId}},
            rollback: {type: contactActions.CONTACTS_SINGLE_ROLLBACK, meta: {contactId}}
        }
    }
});


const initialState: any = {
    isFetching: false,
    data: [],
    //The currently visible contact
    contact: {
        data: undefined,
        isLoading: true
    },
    error: '',
    main: {
        //Main contact View
        showDialog: false,
        isLoading: false
    },
    emails: {
        //state for emails
        showDialog: false,
        isLoading: false
    },
}

export default function contactsReducer(state = initialState, action: any) {
    switch (action.type) {
        case contactActions.CONTACTS_LOCAL_SEARCH: {
            const {query} = action.payload
            return {...state}
        }

        case contactActions.CONTACTS_GET_COMMIT: {
            const data = action.payload
            return {...state, data, isLoading: false}
        }
        case contactActions.CONTACTS_GET_ROLLBACK: {
            const error = handleFetchError(action)
            return {...state, error, isLoading: false}
        }

        case contactActions.CONTACTS_SINGLE_COMMIT: {
            const data = action.payload
            const contact = {data, isLoading: false}
            return {...state, contact}
        }
        case contactActions.CONTACTS_SINGLE_ROLLBACK: {
            const error = handleFetchError(action)
            const contact = {error, isLoading: false}
            return {...state, contact}
        }

        default: {
            return state
        }
    }
}



