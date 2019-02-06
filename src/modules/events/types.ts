
export interface IEventItem {
    id: string
    name: string,
    details: string,
    startDate: Date,
    endDate: Date,
    venue: string,
    assignees: string[]
    images: string[],
    tags: string[],
}

export interface IEvent {
    id: string
    name: string,
    details: string,
    startDate: Date,
    endDate: Date,
    venue: string,
    freeFormAddress: string,
    images: string[],
    tags: string[],
    items: IEventItem[],
}
