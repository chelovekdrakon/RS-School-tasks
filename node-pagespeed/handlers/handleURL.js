const log = require('../libs/log')(module);
const getInfo = require('../utils/getInfo');
const getReqUrl = require('../utils/getReqUrl');

const handleURL = async (URL, streams) => {
    const { successfulStream, errorStream } = streams;

    if (URL) {
        log.info(URL, ' - this is an URL will be fetched');
        const APIresponse = await getInfo(getReqUrl(URL));
        if (APIresponse.payload) {
            errorStream.write(`${JSON.stringify(APIresponse)}\n\n\n`);
            return {
                url: URL,
                payload: APIresponse.payload
            };
        } else {
            successfulStream.write(`${JSON.stringify(APIresponse)}\n\n\n`);
            return URL;
        }
    } else {
        log.error('no element');
    }
}

module.exports = handleURL;
