import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import core from "./coreReducer";
import contacts from "../modules/contacts/contactsRedux";
import locations from "../modules/locations/redux";
import cellGroups from "../modules/cellgroups/redux";
import teams from "../modules/teams/redux";
import events from "../modules/events/redux";

const myWindow = window as any;
const toolsName = '__REDUX_DEVTOOLS_EXTENSION__';
const devTools: any = myWindow[toolsName] ? myWindow[toolsName]() : (f: any) => f;


const reducers = combineReducers({core, contacts, locations, cellGroups, teams, events});
const middleware = applyMiddleware(createLogger(), thunkMiddleware);
const store: any = middleware(devTools(createStore))(reducers);

export default store
