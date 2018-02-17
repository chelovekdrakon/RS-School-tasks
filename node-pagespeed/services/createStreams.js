const fs = require('fs');
const path = require('path');
const NODE_PATH = process.env.NODE_PATH;

const createStreams = (time) => {
    const successfulOutput = path.join(NODE_PATH, 'output', new Date(time).toString(), 'successful.md');
    const successfulStream = fs.createWriteStream(successfulOutput, { encoding: 'utf8' });

    const errorOutput = path.join(NODE_PATH, 'output', new Date(time).toString(), 'errors.md');
    const errorStream = fs.createWriteStream(errorOutput, { encoding: 'utf8' });

    return {
        successfulStream,
        errorStream
    }
}

module.exports = createStreams;
