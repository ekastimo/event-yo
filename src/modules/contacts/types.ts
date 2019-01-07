export interface IPerson {
    salutation: string,
    firstName: string
    lastName: string
    middleName: string
    about: string
    gender: string
    civilStatus: string
    avatar: string
    dateOfBirth: Date
}

export interface IEmail {
    id: string
    address: string
    category: string
    isPrimary: boolean
}

export interface IPhone {
    id: string
    number: string
    category: string
    isPrimary: boolean
}

export interface IAddress {
    id: string
    category: string
    isPrimary: boolean
    originalFreeform: string
    latLon: string
}

export interface ICompany {
    name: string
}

export interface IContact {
    id: string
    category: string
    person: IPerson
    emails: IEmail[]
    phones: IPhone[]
    addresses?: IAddress[]
    company?: ICompany
    tags: string[]
}

