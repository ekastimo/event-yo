import * as yup from 'yup';
import {ITeamMember} from "./types";
import * as faker from 'faker';
import {reqString} from "../../data/validations";

export const defaultData = {
    person: {
        firstName: '',
        otherNames: '',
        dateOfBirth: undefined,
    },
    tags: []
}

export const teamMemberCategory = ['Member', 'Leader']
export const teamMemberStatus = ['Active', 'Blocked']



export const teamSchema = yup.object().shape(
    {
        name: reqString,
        description: reqString,
    }
)

export const teamMemberEditSchema = yup.object().shape(
    {
        role: reqString,
        status: reqString,
    }
)

export const teamMembersSchema = yup.object().shape(
    {
        role: reqString,
        contactIds: yup.array().required("Please add team members"),
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
