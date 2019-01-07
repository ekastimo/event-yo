import {fakeData} from "../../utils/fakeData";
import {IAgendaItem, IEvent} from "./types";

const records = fakeData(20)


export const events: IEvent[] = records.map(it => {
    return {
        id: it.id + '',
        title: it.catchPhrase,
        subHeader: `Public, by ${it.firstName} ${it.firstName}`,
        image: it.image,
        description: it.paragraph,
        startDate: it.date,
        endDate: it.futureDate,
        venue: it.street,
        address: `${it.county}, ${it.city} ${it.country}`,
    }
})


export const agenda: IAgendaItem[] = records.map(it => {
    return {
        id: it.id + '',
        type: 'Activity',
        title: it.catchPhrase,
        avatar: it.avatar,
        image: it.image,
        description: it.paragraph,
        startDate: it.date,
        endDate: it.futureDate,
        venue: it.street,
        address: `${it.county}, ${it.city} ${it.country}`,
        assignee: `${it.firstName} ${it.firstName}`,
    }
})



