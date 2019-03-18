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

const discard = (error:any, _action:any, _retries:any) => {
    console.log("Got an error....",error)
    const { status, response } = error;
    console.log("Got an error....",{ status, response,error })
    if(status === 401){
        console.log("Auth error")
    }
    return 400 <= response.status && response.status < 500;
};


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
        offline({
            ...offlineConfig,
            discard
        }),
        devTools
    )
);

export default store
