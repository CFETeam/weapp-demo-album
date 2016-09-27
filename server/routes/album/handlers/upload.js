const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const shortid = require('shortid');
const RouterBase = require('../../../common/routerbase');
const config = require('../../../config');
const cos = require('../../../services/cos');

class ImageUploader extends RouterBase {
    constructor() {
        super(...arguments);

        // 图片允许上传的最大文件大小，单位(M)
        this.MAX_FILE_SIZE = 5;
    }

    handle() {
        const result = { 'code': -1, 'msg': '', 'data': {} };

        this.parseForm()
            .then(({ files }) => {
                if (!('image' in files)) {
                    result.msg = '参数错误';
                    return;
                }

                const imageFile = files.image[0];

                const buffer = readChunk.sync(imageFile.path, 0, 262);
                const resultType = fileType(buffer);
                if (!resultType || !['image/jpeg', 'image/png'].includes(resultType.mime)) {
                    result.msg = '仅jpg/png格式';
                    return;
                }

                let srcpath = imageFile.path;
                let destpath = `/photos/${Date.now()}-${shortid.generate()}.${resultType.ext}`;

                return new Promise((resolve, reject) => {
                    cos.upload(srcpath, config.cosFileBucket, destpath, 0, (res) => {
                        if (res.code === 0) {
                            result.code = 0;
                            result.msg = 'ok';
                            result.data.imgUrl = res.data.access_url;

                            resolve();
                        } else {
                            reject();
                        }

                        // remove uploaded file
                        fs.unlink(srcpath);

                    });
                });

            })
            .catch(e => {
                if (e.statusCode === 413) {
                    result.msg = `单个不超过${this.MAX_FILE_SIZE}MB`;
                } else {
                    result.msg = '图片上传失败，请稍候再试';
                }
            })
            .then(() => {
                this.res.json(result);
            });
    }

    parseForm() {
        const form = new multiparty.Form({
            encoding: 'utf8',
            maxFilesSize: this.MAX_FILE_SIZE * 1024 * 1024,
            autoFiles: true,
            uploadDir: path.join(global.SERVER_ROOT, 'tmp'),
        });

        return new Promise((resolve, reject) => {
            form.parse(this.req, (err, fields = {}, files = {}) => {
                return err ? reject(err) : resolve({ fields, files });
            });
        });
    }
}

module.exports = ImageUploader.makeRouteHandler();