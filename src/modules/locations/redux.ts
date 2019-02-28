import {remoteRoutes} from "../../data/constants";

import {fetchGet, fetchPost, fetchPut} from "../../utils/fetchHelpers";
import {ISearch} from "../contacts/Contacts";

const contactActions = {
    LOCATIONS_GET_REQUEST: 'LOCATIONS_GET_REQUEST',
    LOCATIONS_GET_COMMIT: 'LOCATIONS_GET_COMMIT',
    LOCATIONS_GET_ROLLBACK: 'LOCATIONS_GET_ROLLBACK',

    LOCATIONS_SINGLE_REQUEST: 'LOCATIONS_SINGLE_REQUEST',
    LOCATIONS_SINGLE_COMMIT: 'LOCATIONS_SINGLE_COMMIT',
    LOCATIONS_SINGLE_ROLLBACK: 'LOCATIONS_SINGLE_ROLLBACK',

}


export const fetchData = (query: ISearch) => ({
    type: contactActions.LOCATIONS_GET_REQUEST,
    payload: {...query},
    meta: {
        offline: {
            effect: fetchGet(remoteRoutes.contacts, query),
            commit: {type: contactActions.LOCATIONS_GET_COMMIT, meta: {...query}},
            rollback: {type: contactActions.LOCATIONS_GET_ROLLBACK, meta: {...query}}
        }
    }
});