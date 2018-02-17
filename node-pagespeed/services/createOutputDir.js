const fs = require('fs');
const path = require('path');
const log = require('../libs/log')(module);
const NODE_PATH = process.env.NODE_PATH;

const createOutputDir = (dirName) => {
    dirName = dirName.toString();
    dirPath = path.join(NODE_PATH, 'output', dirName);

    if (fs.existsSync(dirPath)) {
        log.error('Directory already exist');
    } else {
        fs.mkdir(dirPath, function (err) {
            if (err) {
                log.error(`Could not create ${dirPath} directory because of: `);
                log.error(err);
            } else {
                log.info(`Directory ${dirPath} have beeen created`);
            }
        });
    }

}

module.exports = createOutputDir;
