const log = require('./libs/log')(module);

const handleResult = (results, daysToHandle) => {
    log.info(`have been processed ${results.length} URLs`);

    if (results.length > 0) {
        log.info(`another one turn for: `)
        results.forEach(url => {
            log.info(url);
        });
        handleDataList(results, time, streams);
    } else {
        if (daysToHandle === 0) {
            log.info(`All URL's have been processed, congratulations...`);
            log.info(`Shut down in 5 sec...`);
            gracefullShutDown(5);
        } else {
            log.info(`Finished for today, script now waiting for tomorrow to start evaluation of next 25000 url`);
            log.info(`Do not stop script evaluation`);
        }
    }
}

module.exports = handleResult;

function gracefullShutDown(secBeforeStutDown) {
    if (secBeforeStutDown === 0) {2
        process.kill(process.pid, 'SIGINT')
    } else {
        log.info(`${secBeforeStutDown}...`);
        setTimeout(gracefullShutDown, 1000, --secBeforeStutDown)
    }
}
