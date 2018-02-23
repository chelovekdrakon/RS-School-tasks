const PS_INSIGHTS = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed';
const KEY = 'AIzaSyBY2Bnk-hSnrWfHdwsPauPolFHdlxQIX-s';

const getReqUrl = (URL) => `${PS_INSIGHTS}?url=${URL}/&key=${KEY}`;

module.exports = getReqUrl;
