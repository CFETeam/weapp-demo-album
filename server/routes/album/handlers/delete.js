const _ = require('lodash');
const RouterBase = require('../../../common/routerbase');
const config = require('../../../config');
const cos = require('../../../services/cos');

class DeleteImage extends RouterBase {
    handle() {
        let filePath = String(this.req.body.filepath || '');
        filePath = decodeURIComponent(filePath);

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