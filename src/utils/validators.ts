import * as validate from "validate.js";


export const hasValue = (text: string) => {
    const errors = validate.single(text, {presence: {allowEmpty: false}});
    return !errors;
}

export const isValidEmail = (text: string) => {
    const errors = validate.single(text, {presence: {allowEmpty: false}, email: true});
    return !errors;
}


export const isValidWebsite = (text: string) => {
    const errors = validate.single(text, {presence: {allowEmpty: false}, website: {url: true}});
    return !errors;
}
