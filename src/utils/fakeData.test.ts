import * as faker from 'faker';
const uuidv1 = require('uuid/v1');
export const fakeRecord = (index: number): any => {
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

export const createData = () => {
    return {
        "agent": {
            "agentCode": "521452",
            "branchName": "Kawempe Lugoba",
            "name": "Lillian Nassanga",
            "phone": "0700106164",
            "region": "Central Region"
        },
        "applicant": {
            "address": {
                "country": 800,
                "county": "MAKIE",
                "district": "KAMPA",
                "isPrimary": true,
                "parish": "SASASA",
                "postalCode": "01258",
                "street": "entebbe",
                "subCounty": "",
                "type": 0,
                "village": "SASA"
            },
            "cardNumber": "018364624",
            "category": 1,
            "dateOfBirth": faker.date.past(18),
            "email": "",
            "employmentStatus": "privco",
            firstName: faker.name.firstName(),
            otherNames: faker.name.lastName(),
            lastName: faker.name.lastName(),
            "gender": 2,
            "idField1": "RDoFnuqEDAW8bYP9BgNuQ7YGGICFfwYxWkMoBloOQ8oGZIKFqAaM0UaCBujORkAHAchD6QcL1IHYByq8hWEHXUxGxAeKvoZkB7NARQUHuFKEgQfSV4GCB/DLhUcICZBA9AgZxkarCCg0hXoIrJVDDgjQ5UTdCPgKRkUJVBeBsAlZX4DvCV5eRUIJaBBDKAl3Z0UzCaCGRggJ3RFDSwn2dEPKCft4QTEKCm1CgAoQckHyChpwQwkKGnSErwoah0N0Ci78Rk8KOAxEwwo9BkLmClJ+RQUKV4JBfQpcekIBCqN+hMgKwY6EUwrGg0VXCtsKQgsLHYSCigtagA\u003d\u003d[FNG]1",
            "idField2": "50",
            "idField3": "x5z5yZB7zqxSHS7jU/IYrxhX7LlBOu8OrqLKmt172dlA+J469NO55c3MLFY6M/kO/rkKqvFz7vaalcsnyn3Yoea2r+5KLbV/p1IdEshk7MG3gLGcDVPPsNnBDYRtTDK3JhTp0QW6HBnQWFKJB3rY4Agooz+fx8RX38Lo29WWwsnSlm7/wxUL14x4KRedvefj6SjJKfY8OhsojQ+1NCDACbgjGThJTA7Frq9VUrR7+xFkt6RdTTGmWBu7t2CgOsjePzJBpLyBRLljOULWfyc7QP8",
            "identificationNumber": uuidv1(),
            "identificationValidFrom": faker.date.past(1),
            "identificationValidTo": faker.date.future(10),
            "maritalStatus": "Married",
            "nationality": "UGA",
            "occupation": "busin",
            "phone": "0772120258",
            "requestAtmCard": true,
            "signedKfd": true,
            "type": 1
        },
        "applicationDate": new Date(),
        "applicationStartedAt": new Date(),
        "applicationSubmittedAt": new Date(),
        "caseId": uuidv1(),
        "device": {
            "androidVersion": "26",
            "appId": "c5epT_kWmzQ",
            "gpsCoordinates": "0.3190047 32.6181069",
            "imei": "357060093217498",
            "imsi": ""
        },
        "productCode": "DEMBE",
        "referenceNumber": 990244,
        "status": 1,
        "userId": "c13d1310-947b-412e-b6dd-b58fe71ce8a5"
    }
}


it('renders without crashing', () => {
console.log(JSON.stringify(createData(),null,2))
});

