import * as yup from 'yup';
import {fakeRecord} from '../../utils/fakeData';
import {IContact, IPerson} from './types';
import {countryCodes} from "../../data/countries";
import {invalidInputs, nullableString, reqDate, reqMsg, reqString} from "../../data/validations";
import {IUser} from "../../data/types";

export const defaultData = {
    person: {
        firstName: '',
        otherNames: '',
        dateOfBirth: undefined,
    },
    emails: [
        {
            xId: '1',
            isPrimary: true,
            category: 'Personal',
            address: '',
        }
    ],
    phones: [
        {
            xId: '1',
            isPrimary: true,
            category: 'Mobile'
        }
    ],
    addresses: [
        {
            xId: '1',
            isPrimary: true,
            category: 'Home',
            number: '',
        }
    ],
    tags: []
}


export const contactTags = [
    {value: 'Lovely', label: 'Lovely'},
    {value: 'Friendly', label: 'Friendly'},
    {value: 'Customer', label: 'Customer'},
    {value: 'Leader', label: 'Leader'},
    {value: 'Visited', label: 'Visited'},
]

export const contactCategory = ['Person', 'Company']
export const identificationCategory = ['Nin', 'Passport', 'DrivingPermit', 'VillageCard', 'Nssf', 'Other']
export const gender = ['Male', 'Female']
export const salutation = ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof']
export const civilStatus = ['Single', 'Married', 'Divorced', 'Other']
export const emailCategories = ['Personal', 'Work', 'Other']
export const phoneCategories = ['Mobile', 'Office', 'Home', 'Fax', 'Other']
export const addressCategories = ['Home', 'Work', 'Other']


export const personSchema = yup.object().shape(
    {
        gender: reqString.oneOf(gender).notOneOf(invalidInputs),
        firstName: reqString,
        lastName: reqString,
        dateOfBirth: reqDate,
        salutation: nullableString.oneOf(salutation).notOneOf(invalidInputs),
        middleName: nullableString,
        civilStatus: nullableString.nullable(true).oneOf(civilStatus),
        about: nullableString,
        avatar: nullableString
    }
)

export const newPersonSchema = yup.object().shape(
    {
        gender: reqString.oneOf(gender),
        firstName: reqString,
        lastName: reqString,
        dateOfBirth: yup.date().required(reqMsg),
        salutation: nullableString.oneOf(salutation),
        middleName: nullableString,
        civilStatus: nullableString.oneOf(civilStatus),
        category: nullableString.oneOf(civilStatus),
        about: nullableString,
        avatar: nullableString,
        email: reqString.email('Invalid email'),
        phone: reqString,
        identificationCategory: nullableString.oneOf(identificationCategory),
        identificationNumber: nullableString,
        identificationValidFrom: yup.date(),
        identificationValidTo: yup.date(),
        tags: yup.array().of(
            reqString
        )
    }
)

export const emailSchema = yup.object().shape(
    {
        address: reqString.email('Invalid email'),
        category: reqString.required(reqMsg).oneOf(emailCategories),
        isPrimary: yup.boolean().default(false),
    }
)

export const phoneSchema = yup.object().shape(
    {
        number: nullableString.required(reqMsg),
        category: reqString.required(reqMsg).oneOf(phoneCategories),
        isPrimary: yup.boolean().default(false),
    }
)


export const addressSchema = yup.object().shape(
    {
        originalFreeform: nullableString.required(reqMsg),
        category: reqString.required(reqMsg).oneOf(addressCategories),
        country: reqString.required(reqMsg).oneOf(countryCodes),
        isPrimary: yup.boolean().default(false),
    }
)

export const validationSchema = yup.object().shape(
    {
        tags: yup.array().of(
            reqString
        ),
        person: personSchema,
        emails: yup.array().of(
            yup.object().shape(
                {
                    address: reqString.email('Invalid email'),
                    category: reqString,
                    isPrimary: yup.boolean().default(false),
                }
            )
        ).required(reqMsg)
    }
);


export const fakeContact = (): IContact => {
    const fake = fakeRecord(1);
    return {
        id: 'fakeid222S',
        category: 'Person',
        churchLocation:'',
        churchLocationName:'',
        cellGroup:'',
        cellGroupName:'',
        person: {
            firstName: fake.firstName,
            lastName: fake.lastName,
            middleName: fake.otherNames,
            dateOfBirth: fake.birthDate,
            about: fake.about,
            avatar: fake.avatar,
            civilStatus: fake.civilStatus,
            gender: fake.gender,
            salutation: fake.salutation
        },
        emails: [
            {
                id: '12',
                isPrimary: true,
                category: 'Personal',
                address: fake.email
            }
        ],
        phones: [
            {
                id: '12',
                isPrimary: true,
                category: 'Mobile',
                number: fake.phone
            }
        ],
        addresses: [
            {
                id: '12',
                isPrimary: true,
                category: 'Home',
                latLon: '',
                originalFreeform: fake.streetAddress
            }
        ],
        tags: ['Lovely', 'Friendly']
    }
}


export const renderName = (person: IPerson): string => {
    const name: string = `${person.salutation || ''} ${person.firstName || ''} ${person.middleName || ''} ${person.lastName || ''}`
    return name.trim().replace(/\s+/g, ' ')
}