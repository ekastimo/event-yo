import {remoteRoutes} from "../../data/constants";
import {fetchGet, handleFetchError} from "../../utils/fetchHelpers";
import {ISearch} from "../../data/types";

const cellGroupActions = {
    CELL_GROUPS_GET_REQUEST: 'CELL_GROUPS_GET_REQUEST',
    CELL_GROUPS_GET_COMMIT: 'CELL_GROUPS_GET_COMMIT',
    CELL_GROUPS_GET_ROLLBACK: 'CELL_GROUPS_GET_ROLLBACK',
}

export const fetchData = (query: ISearch) => ({
    type: cellGroupActions.CELL_GROUPS_GET_REQUEST,
    payload: {...query},
    meta: {
        offline: {
            effect: fetchGet(remoteRoutes.cellGroups, query),
            commit: {type: cellGroupActions.CELL_GROUPS_GET_COMMIT, meta: {...query}},
            rollback: {type: cellGroupActions.CELL_GROUPS_GET_ROLLBACK, meta: {...query}}
        }
    }
});

const initialState = {
    data: [],
    isLoading: false
}

export default function cellGroupsReducer(state = initialState, action: any) {
    switch (action.type) {

        case cellGroupActions.CELL_GROUPS_GET_COMMIT: {
            const data = action.payload
            return {...state, data, isLoading: false}
        }
        
        case cellGroupActions.CELL_GROUPS_GET_ROLLBACK: {
            const error = handleFetchError(action)
            return {...state, error, isLoading: false}
        }

        default: {
            return state
        }
    }
}