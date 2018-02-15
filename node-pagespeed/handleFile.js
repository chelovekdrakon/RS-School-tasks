const handleDataList = require('./handleDataList');
const log = require('./libs/log')(module);
const fs = require('fs');
const path = require('path');
const readPrompt = require('./readPrompt');

const handleFile = (fileName, time) => {
    let deltaTime = time;
    let data = '';

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
                const fileStream = fs.createReadStream(fileName, {encoding: 'utf-8'});

                fileStream.on('open', () => {
                    log.info(`${fileName} file have been opened`);
                    deltaTime = Date.now();
                });

                fileStream.on('data', (chunk) => {
                    data += chunk;
                });

                fileStream.on('close', () => {
                    log.info(`${new Date(Date.now())} file have been closed`);
                    log.info(`File reading took ${Date.now() - deltaTime} milliseconds`);
                    fileStream.destroy();
                });

                fileStream.on('error', (err) => {
                    if (err.code === 'ENOENT') {
                        log.error('no such file or directory');
                    } else {
                        log.error(err);
                    }
                });

                fileStream.on('end', () => {
                    log.info(`File ${fileName} have been read and now will start processing...`);
                    handleDataList(data);
                });
            } else {
                log.error(`${fileName} is not a file`);
                readPrompt();
            }

        }
    });
}

module.exports = handleFile;
