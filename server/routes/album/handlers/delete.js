const _ = require('lodash');
const RouterBase = require('../../../common/routerbase');
const config = require('../../../config');
const cos = require('../../../services/cos');

class DeleteImage extends RouterBase {
    handle() {
        let filePath = String(this.req.body.filepath || '');

        try {
            filePath = decodeURIComponent(filePath);

            if (!filePath.startsWith(config.cosUploadFolder)) {
                throw new Error('operation forbidden');
            }

        } catch (err) {
            return this.res.json({
                code: -1,
                msg: 'failed',
                data: _.pick(err, ['name', 'message']),
            });
        }

        filePath = filePath.slice(1)

        const params = {
            Bucket: config.cosFileBucket,
            Region: config.cosRegion,
            Key: filePath
        }

        cos.deleteObject(params, (err, data) => {
            if (err) {
                this.res.json({
                    code: -1,
                    msg: 'failed',
                    data: _.pick(err, ['name', 'message']),
                })
            } else {
                this.res.json({
                    code: 0,
                    msg: 'ok',
                    data: {},
                })
            }
        })
    }
}

module.exports = DeleteImage.makeRouteHandler();