const handleFileData = require('./handleFileData');
const log = require('./libs/log')(module);
const fs = require('fs');
const readPrompt = require('./services/readPrompt');
const createStreams = require('./services/createStreams');
const getFileData = require('./services/getFileData');

const handleFile = (fileName, time) => {
    fs.stat(fileName, function (err, stats) {
        if (err) {
            if (err.code === 'ENOENT') {
                log.error('No such file or directory');
                readPrompt();
            } else {
                log.error(err);
            }
        } else {
            if (stats.isFile(fileName)) {
                getFileData(fileName).then(data => {
                    const streams = createStreams(time);
                    const arrURL = data.trim().split('\r\n');
                    let daysToHandle = Math.ceil(arrURL.length / 25000);
                    log.info(`File contains ${data.length} URL's, script evaluation will take ${daysToHandle}`)
                    handleFileData(arrURL, time, streams, daysToHandle);
                });
            } else {
                log.error(`${fileName} is not a file`);
                readPrompt();
            }
        }
    });
}

module.exports = handleFile;
