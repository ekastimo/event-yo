import * as yup from "yup";
export const invalidInputs = [null, 'null', 'undefined', undefined, '']
export const reqMsg = 'Field is required'
export const nullableString = yup.string().nullable(true)
export const reqString = nullableString.required(reqMsg).notOneOf(invalidInputs, reqMsg)
export const reqDate = yup.date().required(reqMsg).notOneOf(invalidInputs, reqMsg).nullable(true)