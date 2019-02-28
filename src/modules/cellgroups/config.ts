import {reqMsg, reqString} from "../../data/validations";
import * as yup from "yup";

export const cellGroupSchema = yup.object().shape(
    {
        location: reqString,
        name: reqString,
        venue: reqString,
        meetingTimes: yup.array().of(yup.string()).required(reqMsg),
        details: reqString,
    }
)

export const cellGroupServiceCategories = ['9am', '11am', '10am']

export const cellGroupFormDataParser = (data: any) => {
    const {location} = data
    return {...data, location: location.value}
}