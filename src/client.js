const axios = require('axios');

export const createClient = apiAccessToken => {
    return axios.create({
        headers: {
            "sw-access-key": apiAccessToken
        }
    });
}

export const get = (client, url) => {
    const result = client.get(url);

    //@TODO: check status code etc
console.log(result);
    return result;
}
