export const authToken = '__demo__ecole__token'
export const authUser = '__demo__ecole__user'

export const redux = {
    doLogin: 'DO_LOGIN',
    doLogout: 'DO_LOGOUT',
    doSearch: 'DO_SEARCH',
};

export const localRoutes = {
    home: '/home',
    contacts: '/contacts',
    contactsDetails: '/contacts/:contactId',
    events: '/events',
    teams: '/teams',
    teamsDetails: '/teams/:teamId',
    eventsDetails: '/events/:eventId',
    users: '/users',
}

const debug = process.env.NODE_ENV !== 'production'
export const url = debug ? 'http://localhost:9001' : 'https://eventx12.azurewebsites.net'

export const remoteRoutes = {
    authServer: url,
    login: url + '/api/auth/login',
    profile: url + '/api/auth/profile',
    register: url + '/api/auth/register',
    resetPass: url + '/reset',

    contacts: url + '/api/crm/contact',
    contactSearch: url + '/api/crm/contact/search',
    contactById: url + '/api/crm/contact/byid',
    contactsPerson: url + '/api/crm/contact/person',
    contactsEmail: url + '/api/crm/email',
    contactsPhone: url + '/api/crm/phone',
    contactsAddress: url + '/api/crm/address',

    contactsCompany: url + '/api/crm/contact/company',
    contactsAvatar: url + '/api/crm/contact/avatar',

    uploadUrl: url + '/api/docs/upload',
    teams: url + '/api/teams',
    teamsMembers: url + '/api/teammembers',
    contactTeams: url + '/api/teams/contact',
}
