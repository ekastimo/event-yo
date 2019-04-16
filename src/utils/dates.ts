import {format, isValid} from "date-fns";
import moment from "moment";

export const printDateTime = (value: any): string => {
    if (isValid(value))
        return format(value, 'MM/dd/yyyy p')
    else
        return ''
}

export const printBirthday = (value: any): string => {
    if (isValid(value))
        return format(value, 'dd MMM')
    else
        return ''
}

export const printMonth= (value: any): string => {
    if (isValid(value))
        return format(value, 'MMM')
    else
        return ''
}

export const printDay= (value: any): string => {
    if (isValid(value))
        return format(value, 'dd')
    else
        return ''
}

export const printShortDate = (value: any): string => {
    if (isValid(value))
        return format(value, 'dd MMM')
    else
        return ''
}


export const printDate = (value: any): string => {
    if (isValid(value))
        return format(value, 'MM/dd/yyyy')
    else
        return ''
}

export const parseRange = (rec: any) => {
    const {startDate, endDate} = rec
    return `${moment(startDate).format('LT')} - ${moment(endDate).format('LT')}`
}


export function isValidDate(value: any) {
    if (value === null || typeof value !== 'object') {
        return false;
    }
    const dateWrapper = new Date(value);
    return !isNaN(dateWrapper.getDate());
}

export function isSQLDate(value: any) {
    if (typeof value === 'string') {
        return moment(value, 'YYYY-MM-DD', true).isValid();
    }
    return false;
}

export function isISODate(value: any) {
    if (typeof value === 'string') {
        return moment(value, "YYYY-MM-DDTHH:mm:ss.sssZ", true).isValid();
    }
    return false;
}


export function isDate(value: any) {
    return (isValidDate(value) || isSQLDate(value) || isISODate(value));
}
