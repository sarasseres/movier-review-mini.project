import * as constants from '../constants'

//untuk mendaftarkan user ke database dengan melalui komunikasi API
export const registerUser = (data, onSuccess, onError) => ({
    type: constants.API,
    payload : {
        method: 'POST',
        url: '/api/users/register',
        data,
        success: (response) => (setUserInfo(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

export const loginUser = (data, onSuccess, onError) => ({
    type: constants.API,
    payload : {
        method: 'POST',
        url: '/api/users/login',
        data,
        success: (response) => (setUserInfo(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

//untuk melihat info dari user
const setUserInfo = (data) => {
    const parsedToken = JSON.parse(atob(data.token.split('.')[1]));
    const userInfo = {
        userId: parsedToken.id,
        fullName: `${parsedToken.firstName} ${parsedToken.lastName}`,
        token: data.token,
        isLoggedIn: true
    };
    localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
    return { type: constants.SET_USER_INFO, payload: userInfo };
};