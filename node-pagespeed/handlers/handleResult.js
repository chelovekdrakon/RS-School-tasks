const log = require('../libs/log')(module);

const handleResult = (results, daysToHandle) => {
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
            log.info(`Finished for today, script will waiting for tomorrow to start evaluation for the next 25000 url`);
            log.info(`Do not stop script evaluation`);
        }
    }
}

module.exports = handleResult;

function gracefullShutDown(secBeforeStutDown) {
    if (secBeforeStutDown === 0) {2
        log.info(`Press 'Cntrl + C' to shutdown nodemon script runner`);
        process.kill(process.pid, 'SIGINT');
    } else {
        log.info(`${secBeforeStutDown}...`);
        setTimeout(gracefullShutDown, 1000, --secBeforeStutDown)
    }
}
