import {reqString} from "../../data/validations";
import * as yup from "yup";

export const cellGroupSchema = yup.object().shape(
    {
        name: reqString,
        description: reqString,
    }
)