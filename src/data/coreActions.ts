export const coreActionsDefs = {
    LOGIN_LOGIN: 'LOGIN_LOGIN',
    LOGIN_LOGOUT: 'LOGIN_LOGOUT',
    PROFILE_FAILED: 'PROFILE_FAILED',
}

export const handleLogin = (data: any) => {
    return {
        type: coreActionsDefs.LOGIN_LOGIN,
        payload: {...data},
    }
}

export const doLogout = () => {
    return {
        type: coreActionsDefs.LOGIN_LOGOUT,
    }
}

export const handleFailedProfile = () => {
    return {
        type: coreActionsDefs.PROFILE_FAILED,
    }
}
