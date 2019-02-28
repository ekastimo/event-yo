import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {offline} from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import core from "./coreReducer";
import contacts from "../modules/contacts/redux";
import locations from "../modules/locations/redux";
import cellGroups from "../modules/cellgroups/redux";
import events from "../modules/events/redux";

const myWindow = window as any;
const toolsName = '__REDUX_DEVTOOLS_EXTENSION__';
const devTools: any = myWindow[toolsName] ? myWindow[toolsName]() : (f: any) => f;

const store = createStore(
    combineReducers({
        core, contacts, locations,cellGroups,events
    }),
    {},
    compose(
        applyMiddleware(createLogger(), thunkMiddleware),
        offline(offlineConfig),
        devTools
    )
);

export default store
