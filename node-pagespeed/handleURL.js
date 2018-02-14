const log = require('./libs/log')(module);
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const getReqUrl = (URL) => `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=${URL}/speed/pagespeed/insights/&key=AIzaSyBY2Bnk-hSnrWfHdwsPauPolFHdlxQIX-s`;

const handleURL = (URL) => {
    const xhr = new XMLHttpRequest();

    xhr.onloadstart = () => {
        log.info(`Request have been started on URL - ${URL}`);
    };

    xhr.onabort = (reason = 'successfull sent') => {
        log.info(`Request have been aborted because - ${reason}`);
    };

    xhr.onerror = (err) => {
        log.error(`XMLHttpRequest error - ${err}`);
    };

    xhr.onload = () => {
        if (xhr.status != 200) {
          log.error( xhr.status + ': ' + xhr.statusText );
        } else {
          log.info('status ', xhr.status);
        }
    };

    xhr.timeout = 30000;
    xhr.ontimeout = function() {
        log.error('Request time have been overheaded - please check your Internet connection');
    }

    xhr.open('GET', getReqUrl(URL), false);
    xhr.send();
};


module.exports = handleURL;
