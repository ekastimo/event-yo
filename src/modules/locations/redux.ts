import {remoteRoutes} from "../../data/constants";
import {fetchGet, handleFetchError} from "../../utils/fetchHelpers";
import {ISearch} from "../../data/types";

const locationActions = {
    LOCATIONS_GET_REQUEST: 'LOCATIONS_GET_REQUEST',
    LOCATIONS_GET_COMMIT: 'LOCATIONS_GET_COMMIT',
    LOCATIONS_GET_ROLLBACK: 'LOCATIONS_GET_ROLLBACK',
}

export const fetchData = (query: ISearch) => ({
    type: locationActions.LOCATIONS_GET_REQUEST,
    payload: {...query},
    meta: {
        offline: {
            effect: fetchGet(remoteRoutes.locations, query),
            commit: {type: locationActions.LOCATIONS_GET_COMMIT, meta: {...query}},
            rollback: {type: locationActions.LOCATIONS_GET_ROLLBACK, meta: {...query}}
        }
    }
});

const initialState = {
    data: [],
    isLoading: false
}

export default function locationsReducer(state = initialState, action: any) {
    switch (action.type) {

        case locationActions.LOCATIONS_GET_COMMIT: {
            const data = action.payload
            return {...state, data, isLoading: false}
        }
        
        case locationActions.LOCATIONS_GET_ROLLBACK: {
            const error = handleFetchError(action)
            return {...state, error, isLoading: false}
        }

        default: {
            return state
        }
    }
}