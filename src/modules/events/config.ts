
import * as yup from "yup";
import {invalidInputs, nullableString, reqDate, reqString} from "../../data/validations";

export const publicityOptions = ['Private','Public']
export const eventTags = ["Party", "food", "Money", "Kadanke", "Free", "Family", "educational"].map(it=>it.toLocaleLowerCase())

export const eventSchema = yup.object().shape(
    {
        publicity: reqString.oneOf(publicityOptions).notOneOf(invalidInputs),
        name: reqString,
        details: reqString,
        startDate: reqDate,
        endDate: reqDate,
        venue: reqString,
        freeFormAddress: nullableString,
        about: nullableString,
        avatar: nullableString
    }
)
