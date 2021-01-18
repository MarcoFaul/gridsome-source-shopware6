const axios = require('axios');

export const createClient = (apiAccessToken, timeout) => {
    return axios.create({
        timeout,
        headers: {
            "sw-access-key": apiAccessToken
        }
    });
}
