import {applyMiddleware, combineReducers, createStore} from "redux";
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import core from "./coreReducer";

const myWindow = window as any;
const toolsName = 'devToolsExtension';
const devTools: any = myWindow[toolsName] ? myWindow[toolsName]() : (f: any) => f;
const reducers = combineReducers({core});
const middleware = applyMiddleware(createLogger(), thunkMiddleware);
const store: any = middleware(devTools(createStore))(reducers);

export default store
