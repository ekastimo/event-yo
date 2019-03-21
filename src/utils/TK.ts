import Toast from "./Toast";
import * as _ from 'lodash';
import {IOption} from "../data/types";
import {images} from "../assets/images";
import {isDate, printDate} from "./dates";

// <pre>{JSON.stringify(data, null, 2)}</pre>
export function isDefined(value: any) {
    return typeof value !== 'undefined';
}

export function printLn(value: any) {
    console.log(isDefined(value) ? JSON.stringify(value) : value)
}



export const getImage = (value: string): string => {
    if (value && value.length > 0) {
        return value
    }
    return images.everything
}

export function isNullOrEmpty(value: any) {
    return value === null || typeof  value === 'undefined' || value.length < 1
}

export function jsArray2CSV(objArray: any[]) {
    console.log("Creating Download");
    if (objArray.length < 1) {
        return false;
    }
    const keys = Object.keys(objArray[0]);
    let str = '';
    objArray.forEach(obj => {
        let line = '';
        keys.forEach(key => {
            if (line !== '') {
                line += ',';
            }
            const value = obj[key];
            line += isDate(value) ? printDate(value) : value;
        });
        str += line + '\r\n';
    });
    let title = '';
    keys.forEach(key => {
        if (title !== '') {
            title += ',';
        }
        title += key;
    });
    str = title + '\r\n' + str;
    const a = document.createElement('a');
    const blob = new Blob([str], {'type': 'application/octet-stream'});
    a.href = window.URL.createObjectURL(blob);
    a.download = 'export.csv';
    a.click();
    return true;
}

function getRandomInteger(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

export function getColors() {
    const r = getRandomInteger(1, 256)
    const g = getRandomInteger(1, 250)
    const b = getRandomInteger(46, 100)
    return {color: `rgba(${r}, ${g}, ${b}, 1)`, background: `rgba(${r}, ${g}, ${b}, 0.3)`}
}


const isMobile = {
    Android() {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera() {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows() {
        return navigator.userAgent.match(/IEMobile/i)
    },
    any() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
    }
}


export function getSelected(source: any, count = 1) {
    const selected = source.getSelected()
    if (selected.length <= 0) {
        Toast.warn('Please select a record(s)')
        return
    } else if (count === 1 && selected.length > 1) {
        // User selected more than one record
        Toast.warn('Please select one record')
        return
    } else if (count === 1 && selected.length === 1) {
        return selected[0];
    }
    return selected
}


export function getFormFields(fields: any[] = []) {
    return fields.filter(f => f.showOnForm)
}

export function getGridFields(fields: any[] = []) {
    return fields.filter(f => f.showOnGrid)
}

export function getDetailFields(fields: any[] = []) {
    return fields.filter(f => f.showOnDetail)
}


export function getParam(props: any, param: any, defaultValue: any) {
    const {match = {}} = props
    const {params = {}} = match;
    return params[param] || defaultValue
}


export const preRenderClean = (data: any[] = []): any[] => {
    return data.map((it) => {
        if (it.xKey) {
            return it
        } else {
            return {...it, xKey: guid()}
        }
    })
}

export const safeGet = (data: any, field: string): any | undefined => {
    try {
        return _.get(data, field);
    } catch (e) {
        console.error(e)
    }
}

/**
 * Generates a GUID string.
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
export function guid() {
    function _p8(s?: any) {
        const p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }

    return _p8() + _p8(true) + _p8(true) + _p8();
}


export const toOptions = (data: string[]): IOption[] => {
    return data.map(it => ({label: it, value: it}))
}

export const trimSentence = (data: string, number: number): string => {
    let result = ''
    const words = data.split(" ")
    for (const word of words) {
        const temp = `${result} ${word}`
        if (temp.length >= number) {
            return result.trim() + '...'
        }
        result = temp;
    }
    return result
}


export const parseAvatar = (value: string): string => {

    if (isNullOrEmpty(value)) {
        return ''
    }
    const parts = value.trim().split(" ");
    if (parts.length > 1) {
        const part1 = parts[0].trim();
        const part2 = parts[1].trim();
        return `${part1[0]}${part2[0]}`.toLocaleUpperCase()
    }
    return value.trim()[0].toLocaleUpperCase()
}
