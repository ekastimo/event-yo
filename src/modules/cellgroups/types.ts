
export interface ICellGroup {
    id: string
    name: string
    createdAt: Date
    description: string
    createdBy: string
}


export interface ICellGroupMember {
    contactId: string
    locationId: string
    name: string
    avatar: string
}