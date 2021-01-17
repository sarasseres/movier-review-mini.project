import axios from 'axios'

import * as constants from './constants'

export const apiMiddleware = ({dispatch, getState}) => next => action => {
    if (action.type !== constants.API) return next(action);

    // const BASE_URL = 'https://notes-api-uhzaa5gnya-ue.a.run.app/api';
    const BASE_URL = 'http://122.248.229.2:3100/login';
    const { url, method, success, data, postProcessSuccess, postProcessError } = action.payload

    axios({
        method,
        url: BASE_URL + url,
        data: data ? data : null
    }).then((response) => {
        if (success) dispatch(success(response.data));
        if (postProcessSuccess) postProcessSuccess(response.data);
    }).catch(err => {
        if (!err.response) console.warn(err);
        else {
            if (err.response.data.error.message) {
                if (postProcessError) postProcessError(err.response.data.error.message);
            }
        }
    })
}