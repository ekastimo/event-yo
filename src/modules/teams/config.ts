import * as yup from 'yup';
import {ITeamMember} from "./types";
import * as faker from 'faker';

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

export const teamMemberCategory = ['Member', 'Leader']
export const identificationCategory = ['Nin', 'Passport', 'DrivingPermit', 'VillageCard', 'Nssf', 'Other']
export const gender = ['Male', 'Female']
export const salutation = ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof']
export const civilStatus = ['Other', 'Single', 'Married', 'Divorced', 'Other']
export const emailCategories = ['Personal', 'Work', 'Other']
export const phoneCategories = ['Mobile', 'Office', 'Home', 'Fax', 'Other']
export const addressCategories = ['Home', 'Work', 'Other']
export const invalidInputs = [null, 'null', 'undefined', undefined, '']
const reqMsg = 'Field is required'

const nullableString = yup.string().nullable(true)
const reqString = nullableString.required(reqMsg).notOneOf(invalidInputs, reqMsg)

export const teamSchema = yup.object().shape(
    {
        name: reqString,
        description: reqString,
    }
)

export const teamMembersSchema = yup.object().shape(
    {
        role: reqString,
        members: reqString,
    }
)

export const sampleMembers: ITeamMember[] = [
    {
        contactId: "20",
        contactName:`${faker.name.firstName(1)} ${faker.name.lastName(1)}`,
        contactAvatar:faker.internet.avatar(),
        teamId: "50",
        id: "40",
        status: "Active",
        role: "Leader",
    },
    {
        contactId: "21",
        contactName:`${faker.name.firstName(1)} ${faker.name.lastName(1)}`,
        contactAvatar:faker.internet.avatar(),
        teamId: "51",
        id: "41",
        status: "Active",
        role: "Leader",
    },
    {
        contactId: "212",
        contactName:`${faker.name.firstName(1)} ${faker.name.lastName(1)}`,
        contactAvatar:faker.internet.avatar(),
        teamId: "52",
        id: "42",
        status: "Active",
        role: "Leader",
    }
]
