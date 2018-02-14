const https = require('https');
const express = require('express');
const config = require('./config');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const log = require('./libs/log')(module);
const errorHandler = require('errorhandler');
const fetch = require('node-fetch');
const getInfo = require('./getInfo');

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

app.get('/', (req, res) => {
    log.info(req, 'request');
    log.info(res, 'response');
});

https.createServer(app).listen(config.get('port'), () => {
  log.info('Express app handler listen on port ' + config.get('port'));
});

const input = path.normalize(path.join(__dirname, process.argv.slice(-2)[0]));
let time = Date.now();

fs.stat(input, function (err, stats) {
    if (err) {
        log.error(err);
    } else {
        if (stats.isFile(input)) {
            const fileStream = fs.createReadStream(input, {encoding: 'utf-8'});

            fileStream.on('close', () => {
                log.info(`${new Date(Date.now())} file have been closed`);
                log.info(`File reading took ${Date.now() - time} milliseconds`);
                fileStream.destroy();
            });

            fileStream.on('error', (err) => {
                if (err.code === 'ENOENT') {
                    log.error('no such file or directory');
                } else {
                    log.error(err);
                }
            });

            fileStream.on('open', () => {
                log.info(`${new Date(Date.now())} file have been opened`);
                time = Date.now();
            });

            fileStream.on('readable' ,async () => {
                const data = fileStream.read();

                if (data) {
                    getInfo(data);
                } else {
                    log.error('nothing here, why did stream read it ?!', typeof data);
                }
            });

            fileStream.on('end', () => log.debug('the end'));
        } else {
            log.error('no such file or directory');
        }
    }
});
