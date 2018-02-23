const log = require('../libs/log')(module);
const fs = require('fs');

const getFileData = (fileName, time) => {
    return new Promise(res => {
        const fileStream = fs.createReadStream(fileName, {encoding: 'utf-8'});

        let deltaTime = time;
        let data = '';

        fileStream.on('open', () => {
            log.info(`${fileName} file have been opened`);
            deltaTime = Date.now();
        });

        fileStream.on('data', (chunk) => {
            data += chunk;
        });

        fileStream.on('close', () => {
            log.info(`${fileName} file have been closed`);
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
            res(data);
        });
    })
}

module.exports = getFileData;
