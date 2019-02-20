export interface IOption {
    label: string
    value: string
}


export interface IUser {
    id: string
    avatar: string
    username: string
    email: string
    fullName: string
    roles: string[]
}

export interface IStore {
    core: any
    contacts: any
}
