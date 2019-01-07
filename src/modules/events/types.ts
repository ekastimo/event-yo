
export interface IAgendaItem {
    id: string
    type: string,
    title: string,
    avatar: string,
    image: string,
    description: string,
    startDate: Date,
    endDate: Date,
    venue: string,
    address: string
    assignee: string
}

export interface IEvent {
    id: string
    title: string,
    subHeader: string,
    image: string,
    description: string,
    startDate: Date,
    endDate: Date,
    venue: string,
    address: string,
}
