const _ = require('lodash');
const path = require('path');
const RouterBase = require('../../../common/routerbase');
const config = require('../../../config');
const cos = require('../../../services/cos');

class ListImages extends RouterBase {
    handle() {
        const cosParams = {
            Bucket : config.cosFileBucket,
            Region : config.cosRegion,
            MaxKeys : 100
        }

        cos.getBucket(cosParams, (err, res) => {

            if (err) {
                this.res.json({ code: -1, msg: 'failed', data: {} });
                return;
            }

            this.res.json({
                code: 0,
                msg: 'ok',
                data: _.map(res.Contents, 'Key').filter(item => {
                    let extname = String(path.extname(item)).toLowerCase();

                    // 只返回`jpg/png`后缀图片
                    return ['.jpg', '.png'].includes(extname)
                }).map(v => config.cosDomain + v),
            });
        });
    }
}

module.exports = ListImages.makeRouteHandler();