import * as superagent from 'superagent'
import Toast from './Toast'
import {authToken} from "../data/constants";
import * as validate from "validate.js";


export const getToken = (): string | undefined => {
    const token = localStorage.getItem(authToken);
    if (token && validate.isDefined(token)) {
        return token;
    }
    return
}

type CallbackFunction = (data?: any) => void;
type ErrorCallback = (err: any, res: superagent.Response) => void;
type EndCallback = (data?: any) => void;

export const handleError = (err: any = {}, res: superagent.Response) => {
    const defaultMessage = "Invalid request, please contact admin";
    if (res && res.forbidden || res && res.unauthorized) {
        Toast.error("Authentication Error")
    } else if (res && res.badRequest) {
        const message = res.body.message
        Toast.error(message || defaultMessage)
    } else if (res && res.clientError || res && res.notAcceptable || res && res.error) {
        Toast.error(defaultMessage)
    } else if (res && res.body && res.body.message) {
        Toast.error(res.body.message)
    } else {
        const message = err.message || 'Unknown error, contact admin'
        const finalMessage = message.indexOf("offline") !== -1
            ? "Can't reach server, Check connectivity"
            : message
        Toast.error(finalMessage)
    }
}

export const handleResponse = (callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => (err: any, res: superagent.Response) => {
    try {
        if (err || !res.ok) {
            if (errorCallBack) {
                errorCallBack(err, res)
            } else {
                handleError(err, res)
            }
        } else {
            callBack(res.body)
        }
    } catch (e) {
        console.error("Failed to process response", e)
    } finally {
        if (endCallBack) {
            endCallBack()
        }
    }
}

export const get = (url: string, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    superagent.get(url)
        .set('Authorization', `Bearer ${getToken()}`)
        .set('Accept', 'application/json')
        .end(handleResponse(callBack, errorCallBack, endCallBack))
}

export const search = (url: string, data: any, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    superagent.get(url)
        .set('Authorization', `Bearer ${getToken()}`)
        .set('Accept', 'application/json')
        .query(data)
        .end(handleResponse(callBack, errorCallBack, endCallBack))
}


export const post = (url: string, data: any, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    superagent.post(url)
        .set('Authorization', `Bearer ${getToken()}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(data)
        .end(handleResponse(callBack, errorCallBack, endCallBack))
}

export const postFile = (url: string, data: any, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    superagent.post(url)
        .set('Authorization', `Bearer ${getToken()}`)
        .set('Accept', 'application/json')
        .send(data)
        .end(handleResponse(callBack, errorCallBack, endCallBack))
}

export const put = (url: string, data: any, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    superagent.put(url)
        .set('Authorization', `Bearer ${getToken()}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(data)
        .end(handleResponse(callBack, errorCallBack, endCallBack))
}

export const del = (url: string, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    superagent.delete(url)
        .set('Authorization', `Bearer ${getToken()}`)
        .set('Accept', 'application/json')
        .end(handleResponse(callBack, errorCallBack, endCallBack))
}
