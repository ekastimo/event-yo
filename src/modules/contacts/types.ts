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
    value: string
    category: string
    isPrimary: boolean
}

export interface IPhone {
    id: string
    value: string
    category: string
    isPrimary: boolean
}

export interface IIdentification {
    id: string
    value: string
    category: string
    isPrimary: boolean
}

export interface IContactEvent {
    id: string
    value: string
    category: string
}

export interface IAddress {
    id: string
    category: string
    isPrimary: boolean
    country: string
    district: string
    county: string
    subCounty?: string
    village?: string
    parish?: string
    postalCode?: string
    street?: string

    freeForm?: string
    latLon?: string
    placeId?: string
}

export interface ICompany {
    name: string
}

export interface IMetaData {
    churchLocation: string
    cellGroup: string
}

export interface IContact {
    id: string
    category: string
    person: IPerson
    emails: IEmail[]
    phones: IPhone[]
    events: IContactEvent[]
    addresses: IAddress[]
    company?: ICompany
    tags?: string[]
    metaData: IMetaData
}

export interface IContactQuery {
    name?: string
    limit?: number
    skip?: number
}

export interface IContactReduxState {
    data: IContact
    isFetching: boolean
}

