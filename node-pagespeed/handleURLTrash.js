const log = require('./libs/log')(module);
const { URL } = require('url');
const https = require('https');

const getReqUrl = (URL) => `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=${URL}/speed/pagespeed/insights/&key=AIzaSyBY2Bnk-hSnrWfHdwsPauPolFHdlxQIX-s`;

const handleURL = async(URL) => await new Promise(resolve => {
    const options = getReqUrl(URL);

    const req = https.request(options, (res) => {
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            resolve(chunk);
        });

        res.on('end', () => {
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
    req.end();
})
.catch(e => log.error(e));


module.exports = handleURL;
