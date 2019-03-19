import {remoteRoutes} from "../../data/constants";
import {fetchGet, handleFetchError} from "../../utils/fetchHelpers";
import {ISearch} from "../../data/types";

const teamsActions = {
    TEAMS_GET_REQUEST: 'TEAMS_GET_REQUEST',
    TEAMS_GET_COMMIT: 'TEAMS_GET_COMMIT',
    TEAMS_GET_ROLLBACK: 'TEAMS_GET_ROLLBACK',
}

export const fetchData = (query: ISearch) => ({
    type: teamsActions.TEAMS_GET_REQUEST,
    payload: {...query},
    meta: {
        offline: {
            effect: fetchGet(remoteRoutes.teams, query),
            commit: {type: teamsActions.TEAMS_GET_COMMIT, meta: {...query}},
            rollback: {type: teamsActions.TEAMS_GET_ROLLBACK, meta: {...query}}
        }
    }
});

const initialState = {
    data: [],
    isLoading: false
}

export default function teamsReducer(state = initialState, action: any) {
    switch (action.type) {

        case teamsActions.TEAMS_GET_COMMIT: {
            const data = action.payload
            return {...state, data, isLoading: false}
        }
        
        case teamsActions.TEAMS_GET_ROLLBACK: {
            const error = handleFetchError(action)
            return {...state, error, isLoading: false}
        }

        default: {
            return state
        }
    }
}