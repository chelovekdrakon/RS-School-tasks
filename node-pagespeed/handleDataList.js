const fetch = require('node-fetch');
const log = require('./libs/log')(module);
const series = require('async/series');
const path = require('path');
const fs = require('fs');

const getReqUrl = (URL) => `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=${URL}/&key=AIzaSyBY2Bnk-hSnrWfHdwsPauPolFHdlxQIX-s`;

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

const handleDataList = (data, time) => {
    const arrURL = data.trim().split('\r\n');

    const { successfulStream, errorStream } = createStreams(time);

    series(arrURL.map(URL => async cb => {
        if (URL) {
            log.info(URL, ' - this is an URL will be fetched');
            const APIresponse = await getInfo(getReqUrl(URL));
            if (APIresponse.payload) {
                errorStream.write(`${JSON.stringify(APIresponse)}\n\n\n`);
            } else {
                successfulStream.write(`${JSON.stringify(APIresponse)}\n\n\n`);
            }
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

function createStreams(time) {
    const successfulOutput = path.join(__dirname, new Date(time).toString(), 'successful.md');
    const successfulStream = fs.createWriteStream(successfulOutput, { encoding: 'utf8' });

    const errorOutput = path.join(__dirname, new Date(time).toString(), 'errors.md');
    const errorStream = fs.createWriteStream(errorOutput, { encoding: 'utf8' });

    return {
        successfulStream,
        errorStream
    }
}
