const COS = require('cos-nodejs-sdk-v5')
const _cosConfig = require('cos-nodejs-sdk-v5/sdk/config')
const config = require('../../config')

/**
 * init COS config
 * see: https://github.com/tencentyun/cos-nodejs-sdk-v5/blob/master/sdk/config.js#L24
 */
_cosConfig.setAppInfo(config.cosAppId, config.cosSecretId, config.cosSecretKey);

module.exports = COS
