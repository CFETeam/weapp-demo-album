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

        cos.deleteFile(config.cosFileBucket, filePath, (res) => {
            let success = (res.code === 0);

            this.res.json({
                code: (success ? 0 : -1),
                msg: (success ? 'ok' : 'failed'),
                data: {},
            });
        });
    }
}

module.exports = DeleteImage.makeRouteHandler();