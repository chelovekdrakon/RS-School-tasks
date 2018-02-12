const http = require('http');
const express = require('express');
const config = require('./config');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const log = require('./libs/log')(module);
const errorHandler = require('errorhandler');

const app = express();

app.get('env') === 'dev' ? app.use(logger('dev')) : app.use(logger('default'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((err, req, res, next) => {
  if (app.get('env') === 'dev') {
    errorHandler(err, req, res, next);
  } else {
    res.send(500);
  }
});

http.createServer(app).listen(config.get('port'), () => {
  log.info('Express app handler listen on port ' + config.get('port'));
});

const input = path.join(__dirname, process.argv.slice(-2)[0]);
const fileStream = fs.createReadStream(input);

fileStream.on('close', () => {
    fileStream.destroy();
});

fileStream.on('error', (e) => {
    console.log(e, 'this is error');
});

fileStream.on('readable', () => {
    const readable = fileStream.read();
    readable ? console.log(`readable: ${readable.length}`) : console.log('nothing here');
});
