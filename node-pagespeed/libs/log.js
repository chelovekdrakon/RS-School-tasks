const winston = require('winston');
const ENV = process.env.NODE_ENV;
console.log(ENV, 'environment');

const getLogger = (module) => {
  const path = module.filename.split('/').slice(-2).join('/'); // will take folder_name/file_name.js

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: ENV === 'dev' ? 'debug' : 'error',
        label: path
      })
    ]
  });
};

module.exports = getLogger;
