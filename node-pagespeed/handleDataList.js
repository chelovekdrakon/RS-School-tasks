const fetch = require('node-fetch');
const log = require('./libs/log')(module);
const series = require('async/series');

const getReqUrl = (URL) => `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=${URL}/&key=AIzaSyBY2Bnk-hSnrWfHdwsPauPolFHdlxQIX-s`;

const getInfo = async url => {
    try {
        const response = await fetch(url);
        // const json = await response.json();
        return response;
    } catch (error) {
        log.error(`Error, when have tried to fetch ${url}`);
        log.error(error);
    }
};

const handleDataList = (data, successfulStream) => {
    const arrURL = data.trim().split('\r\n');

    series(arrURL.map(URL => async cb => {
        if (URL) {
            log.info(URL, ' - this is an URL will be fetched');
            const APIresponse = await getInfo(getReqUrl(URL));
            successfulStream.write(`${APIresponse}\n`);
            return URL;
        } else {
            log.error('no element');
        }
    }), (err, results) => {
        if (err) {
            log.error(`error in async.series - `, err);
        } else {
            log.info(`have been processed ${results.length} URLs`);
        }
    });
}
module.exports = handleDataList;
