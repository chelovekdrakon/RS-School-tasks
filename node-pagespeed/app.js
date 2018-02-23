const https = require('https');
const express = require('express');
const config = require('./config');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const log = require('./libs/log')(module);
const errorHandler = require('errorhandler');
const handleFile = require('./handlers/handleFile');
const createOutputDir = require('./utils/createOutputDir');

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

process.on('SIGINT', function() {
  log.info('\nGracefully shutting down from SIGINT (Ctrl-C)');
  process.exit(0);
});

https.createServer(app).listen(config.get('port'), () => {
    log.info('Express app handler listen on port ' + config.get('port'));
});


const time = Date.now();
const input = path.normalize(path.join(__dirname, process.argv.slice(-1).toString()));
createOutputDir(new Date(time));
handleFile(input, time);
