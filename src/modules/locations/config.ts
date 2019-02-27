import {reqMsg, reqString} from "../../data/validations";
import * as yup from "yup";

export const locationSchema = yup.object().shape(
    {
        name: reqString,
        venue: reqString,
        meetingTimes: yup.array().of(yup.string()).required(reqMsg),
        details: reqString,
    }
)

export const serviceCategories = ['9am', '11am', '10am']