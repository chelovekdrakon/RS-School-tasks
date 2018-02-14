const log = require('./libs/log')(module);
const handleURL = require('./handleURLTrash');

const getInfo = (listURL) => new Promise(async res => {
    log.debug(`readable: ${typeof listURL}`);
    const arrURL = listURL.trim().split('\r\n');

    const urlGenerator = iterateArr(arrURL);
    while (urlGenerator.next.done) {
        const URL = urlGenerator.next.value;
        if (URL) {
            log.info(URL, ' - this is an URL');
            const data = await new Promise(resolve => {
                handleURL(URL)
                .then(APIresponse => log.debug(APIresponse, 'data from request'))
                .then(resolve(APIresponse))
                .catch(err => log.error(err));
            }).then(omfg => res(omfg));
        } else {
            log.error('no element')
        }
    }
});
module.exports = getInfo;

function *iterateArr(arr) {
    index = 0;
    while (index <= arr.length) {
        yield arr[index];
        index++;
    }
}
