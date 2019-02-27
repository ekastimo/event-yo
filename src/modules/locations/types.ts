
export interface ILocation {
    id: string
    name: string
    createdAt: Date
    description: string
    createdBy: string
}

export interface ILocationMember {
    contactId: string
    locationId: string
    name: string
    avatar: string
}