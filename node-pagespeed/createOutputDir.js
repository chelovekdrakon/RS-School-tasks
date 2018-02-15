const fs = require('fs');
const path = require('path');
const log = require('./libs/log')(module);

const createOutputDir = (dirName) => {
    dirName = dirName.toString();
    if (fs.existsSync(dirName)) {
        log.error('Directory already exist');
    } else {
        fs.mkdir(dirName, function (err) {
            if (err) {
                log.error(`Could not create ${dirName} directory because of: `);
                log.error(err);
            } else {
                log.info(`Directory ${dirName} have beeen created`);
            }
        })

    }

}

module.exports = createOutputDir;
