const CONF = {
    port: '9993',
    ROUTE_BASE_PATH: '/applet',

    cosAppId: '1251771687',
    cosRegion: 'cn-north',
    cosSecretId: 'AKIDEMKMI7nMJ86wkPdEMJ56DXkMNBpXdUoL',
    cosSecretKey: 'dat9EUaVGqIYouocIoHdputw1wrbAYbn',
    cosFileBucket: 'photos',
    cosUploadFolder: '/'
}

// 生成访问 COS 的域名
CONF.cosDomain = (() => `http://${CONF.cosFileBucket}-${CONF.cosAppId}.costj.myqcloud.com/`)()

module.exports = CONF
