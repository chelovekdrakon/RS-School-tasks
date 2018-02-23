const handleFileData = require('./handleFileData');
const log = require('../libs/log')(module);
const fs = require('fs');
const readPrompt = require('../utils/readPrompt');
const createStreams = require('../utils/createStreams');
const getFileData = require('../utils/getFileData');

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
                    const arrURL = data.trim().split('\r\n').slice(1);
                    let daysToHandle = Math.ceil(arrURL.length / 25000);
                    log.info(`File contains ${arrURL.length} URL's, script evaluation will take ${daysToHandle} day(s)`)
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
