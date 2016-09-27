var config = require('../config.js');

module.exports = {
    getUrl(route) {
        return `https://${config.host}${config.basePath}${route}`;
    },
};