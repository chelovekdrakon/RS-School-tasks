const fetch = require('node-fetch');
const log = require('../libs/log')(module);

const getInfo = async url => {
    try {
        const response = await fetch(url);
        const json = await response.json();

        if (response.status !== 200) {
            return {
                url: url,
                statusText: response.statusText,
                json: json,
                payload: 'Response status is not 200'
            }
        } else {
            return json;
        }
    } catch (error) {
        log.error(`Error, when have tried to fetch ${url}`);
        log.error(error);
        return {
            url: url,
            payload: 'Error, when have tried to fetch'
        }
    }
};

module.exports = getInfo;
