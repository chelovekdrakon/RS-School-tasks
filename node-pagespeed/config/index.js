const nconf = require('nconf');
const path = require('path');

nconf.argv()
     .env()
     .file({file: path.join(__dirname, 'config.json')});

module.exports = nconf;
console.log(process.argv.slice(-2), ' - input and output files');
