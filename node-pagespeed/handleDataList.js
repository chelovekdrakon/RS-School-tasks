const fetch = require('node-fetch');
const log = require('./libs/log')(module);
const series = require('async/series');

const getReqUrl = (URL) => `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=${URL}/&key=AIzaSyBY2Bnk-hSnrWfHdwsPauPolFHdlxQIX-s`;

const getInfo = async url => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        log.error(`Error, when have tried to fetch ${url}`);
        log.error(error);
    }
};

const handleDataList = (data) => {
    log.debug(`readable: ${typeof data}`);
    const arrURL = data.trim().split('\r\n');

    series(arrURL.map(URL => async cb => {
        if (URL) {
            log.info(URL, ' - this is an URL');
            const APIresponse = await getInfo(getReqUrl(URL));
            log.info('APIresponse');
            log.info(APIresponse, 'APIresponse');
            return APIresponse;
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
