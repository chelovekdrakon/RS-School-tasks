const series = require('async/series');
const log = require('../libs/log')(module);
const handleResult = require('./handleResult');
const handleURL = require('./handleURL');

const handleFileData = (data, time, streams, daysToHandle) => {
    log.info(`${daysToHandle} days remain to finish...`);
    daysToHandle = daysToHandle > 0 ? daysToHandle - 1 : daysToHandle;
    if (data.length > 25000) {
        const remainingData = data.splice(24999);
        const day = 1000 * 60 * 60 * 24;
        setTimeout(() => {
            handleFileData(remainingData, time, streams, daysToHandle);
        }, day);
    }

    const { errorStream } = streams;
    errorStream.write(`\n\n\n erros from turn processed ${new Date().toString()}\n\n\n`);

    series(data.map(URL => async cb => {
        return await handleURL(URL, streams);
    }), (err, results) => {
        if (err) {
            log.error(`error in async.series - `, err);
        } else {
            const unhandledURLs = results.reduce((arr, currUrl) => {
                if (currUrl.payload) {
                    log.info(`Another one turn for ${currUrl} because - ${currUrl.payload}`);
                    return arr.concat(currUrl.url);
                } else {
                    return arr;
                }
            }, []);
            log.info(`have been processed ${results.length} URL's`);
            log.info(`${results.length - unhandledURLs.length} successfuly`);
            handleResult(unhandledURLs, daysToHandle);
        }
    });
}

module.exports = handleFileData;
