const fetch = require('node-fetch');
const log = require('./libs/log')(module);
const handleURL = require('./handleURL');

const getReqUrl = (URL) => `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=${URL}/speed/pagespeed/insights/&key=AIzaSyBY2Bnk-hSnrWfHdwsPauPolFHdlxQIX-s`;

const getInfo = (data) => {
    log.debug(`readable: ${typeof data}`);
    const arrURL = data.trim().split('\r\n');

    arrURL.forEach(async URL => {
        if (URL) {
            log.info(URL, ' - this is an URL');
            handleURL(URL);
        } else {
            log.error('no element')
        }
    })
}
module.exports = getInfo;
