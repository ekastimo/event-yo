import * as faker from 'faker';

export interface IFakeRecord {
    salutation: string;
    id: number,
    avatar: string,
    image: string

    email: string
    firstName: string
    otherNames: string
    lastName: string
    civilStatus: string

    city: string
    street: string
    streetAddress: string
    country: string
    county: string
    zipCode: string

    date: Date
    futureDate: Date
    birthDate: Date
    companyName: string
    bs: string
    catchPhrase: string
    words: string
    about: string
    sentence: string
    paragraph: string
    phone: string
    password: string,
    gender: string
    contactType: string
    maritalStatus: string
    tags: string[]
}

export const fakeRecord = (index: number): IFakeRecord => {
    return {
        id: index,
        avatar: faker.image.avatar(),
        image: faker.image.image(),

        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        otherNames: faker.name.lastName(),
        lastName: faker.name.lastName(),
        civilStatus: 'Single',
        salutation: "Mr",

        phone: faker.phone.phoneNumber(),


        city: faker.address.city(),
        street: faker.address.streetName(),
        streetAddress: faker.address.streetAddress(),
        country: faker.address.country(),
        county: faker.address.county(),
        zipCode: faker.address.zipCode(),


        date: faker.date.past(),
        futureDate: faker.date.past(),
        birthDate: faker.date.past(),
        companyName: faker.company.companyName(),
        bs: faker.company.bs(),
        catchPhrase: faker.company.catchPhrase(),
        words: faker.lorem.words(),
        about: faker.lorem.sentence(),
        sentence: faker.lorem.sentence(),
        paragraph: faker.lorem.paragraph(),

        password: "love",
        gender: "Male",
        contactType: "Company",
        maritalStatus: "Married",
        tags: faker.lorem.words().split(" ")
    };
};


export const fakeData = (count: number = 100) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(fakeRecord(i))
    }
    return data
};
