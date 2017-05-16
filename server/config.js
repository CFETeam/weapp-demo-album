const CONF = {
    port: '9993',
    ROUTE_BASE_PATH: '/applet',

    /**
     * COS 信息配置
     * 查看：https://console.qcloud.com/capi
     */

    // APPID
    cosAppId: '',
    /**
     * 区域
     * 华北：cn-north
     * 华东：cn-east
     * 华南：cn-south
     * 西南：cn-southwest
     */
    cosRegion: 'cn-north',
    // SecretId
    cosSecretId: '',
    // SecretKey
    cosSecretKey: '',
    // Bucket 名称
    cosFileBucket: '',
    // 文件夹
    cosUploadFolder: '/'
}

// 生成访问 COS 的域名，无需修改
CONF.cosDomain = (() => `http://${CONF.cosFileBucket}-${CONF.cosAppId}.costj.myqcloud.com/`)()

module.exports = CONF
