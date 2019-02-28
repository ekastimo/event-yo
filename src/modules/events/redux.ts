import {remoteRoutes} from "../../data/constants";
import {fetchGet, handleFetchError} from "../../utils/fetchHelpers";
import {ISearch} from "../../data/types";

const eventActions = {
    EVENTS_GET_REQUEST: 'EVENTS_GET_REQUEST',
    EVENTS_GET_COMMIT: 'EVENTS_GET_COMMIT',
    EVENTS_GET_ROLLBACK: 'EVENTS_GET_ROLLBACK',
}

export const fetchData = (query: ISearch) => ({
    type: eventActions.EVENTS_GET_REQUEST,
    payload: {...query},
    meta: {
        offline: {
            effect: fetchGet(remoteRoutes.events, query),
            commit: {type: eventActions.EVENTS_GET_COMMIT, meta: {...query}},
            rollback: {type: eventActions.EVENTS_GET_ROLLBACK, meta: {...query}}
        }
    }
});

const initialState = {
    data: [],
    isLoading: false
}

export default function eventsReducer(state = initialState, action: any) {
    switch (action.type) {

        case eventActions.EVENTS_GET_COMMIT: {
            const data = action.payload
            return {...state, data, isLoading: false}
        }
        
        case eventActions.EVENTS_GET_ROLLBACK: {
            const error = handleFetchError(action)
            return {...state, error, isLoading: false}
        }

        default: {
            return state
        }
    }
}